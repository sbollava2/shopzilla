// frontend/src/pages/Checkout.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

const placeOrder = async () => {
  try {
    await API.post('/orders', {
      items: cart,
      totalAmount: total,
      userId: user._id,
    });

    localStorage.removeItem('cart');
    navigate('/orders');
  } catch (err) {
    console.error("Order error:", err?.response?.data || err.message || err);
    alert(err?.response?.data?.message || 'Failed to place order');
  }
};


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Confirm Your Order</Typography>
      
      <List>
        {cart.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={`${item.name} × ${item.qty}`}
              secondary={`₹${item.price} each`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Total: ₹{total}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={placeOrder}
        sx={{ mt: 2 }}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
