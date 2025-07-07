import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Snackbar,
  Stack
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingCart.find((item) => item._id === product._id);

    const updatedCart = existingItem
      ? existingCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      : [...existingCart, { ...product, qty }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const isOutOfStock = product.countInStock === 0;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>

          {/* Description as bullet points if it's an array */}
          {Array.isArray(product.description) ? (
            product.description.map((line, idx) => (
              <Typography key={idx} sx={{ mt: 1 }}>
                • {line}
              </Typography>
            ))
          ) : (
            <Typography sx={{ mt: 2 }}>{product.description}</Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            ₹{product.price}
          </Typography>

          <Typography color={isOutOfStock ? 'error' : 'green'}>
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Qty"
              type="number"
              size="small"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              inputProps={{ min: 1, max: product.countInStock }}
              sx={{ width: 100 }}
              disabled={isOutOfStock}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
            >
              Buy Now
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Added to cart"
      />
    </Container>
  );
};

export default ProductDetails;
