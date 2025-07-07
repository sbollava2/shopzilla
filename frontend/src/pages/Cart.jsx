import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Button,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateQty = (id, qty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty: Number(qty) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography>🛒 Cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography>Price: ₹{item.price}</Typography>
                    <TextField
                      label="Qty"
                      type="number"
                      size="small"
                      value={item.qty}
                      onChange={(e) => updateQty(item._id, e.target.value)}
                      inputProps={{ min: 1 }}
                      sx={{ mt: 1, width: 100 }}
                    />
                    <IconButton onClick={() => removeFromCart(item._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 3 }}>
            Total: ₹{total}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
