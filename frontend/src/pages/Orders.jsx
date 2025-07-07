import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      API.get(`/orders/${user._id}`).then((res) => setOrders(res.data));
    }
  }, [user?._id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">Order #{order._id.slice(-6)}</Typography>
              <Typography>Total: ₹{order.totalAmount}</Typography>
              <Typography variant="caption">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/order/${order._id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Orders;
