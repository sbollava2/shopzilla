import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider
} from '@mui/material';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/details/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <Typography>Loading order...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Order Details</Typography>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6">Order #{order._id}</Typography>
          <Typography>Total: ₹{order.totalAmount}</Typography>
          <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>

          <Divider sx={{ my: 2 }} />

          <List>
            {order.items.map((item, idx) => (
              <ListItem key={idx} divider>
                {item.name} × {item.qty} — ₹{item.qty * item.price}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderDetails;
