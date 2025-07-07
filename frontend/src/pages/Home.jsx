import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    const updatedCart = exists
      ? cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      : [...cart, { ...product, qty: 1 }];

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Container sx={{ mt: 4 }}>
      {user && (
        <Typography variant="h5" gutterBottom>
          Welcome, {user.name}!
        </Typography>
      )}
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>₹{product.price}</Typography>

                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    View Details
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
