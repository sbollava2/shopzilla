import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markDelivered = async (orderId) => {
    try {
      await API.put(`/admin/orders/${orderId}/deliver`);
      fetchOrders();
    } catch (err) {
      console.error('Error marking as delivered:', err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await API.delete(`/admin/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/order/${order._id}`)}
            >
              <TableCell>{order.user?.name || 'N/A'}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>₹{order.totalPrice}</TableCell>
              <TableCell>
                {order.isDelivered
                  ? new Date(order.deliveredAt).toLocaleDateString()
                  : 'No'}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                {!order.isDelivered && (
                  <Tooltip title="Mark as Delivered">
                    <IconButton color="success" onClick={() => markDelivered(order._id)}>
                      <LocalShippingIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Delete Order">
                  <IconButton color="error" onClick={() => deleteOrder(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
