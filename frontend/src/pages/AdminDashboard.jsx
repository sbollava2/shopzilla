// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Button, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', price: 0, countInStock: 0 });

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async () => {
    const p = await API.get('/admin/products', headers);
    const o = await API.get('/admin/orders', headers);
    setProducts(p.data);
    setOrders(o.data);
  };

  useEffect(() => {
    if (!user?.isAdmin) return window.location.href = '/';
    fetchData();
  }, []);

  const addProduct = async () => {
    await API.post('/admin/products', newProduct, headers);
    setNewProduct({ name: '', image: '', price: 0, countInStock: 0 });
    fetchData();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/admin/products/${id}`, headers);
    fetchData();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {/* Product Management */}
      <Typography variant="h5" sx={{ mt: 3 }}>Manage Products</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell><TableCell>Price</TableCell><TableCell>Stock</TableCell><TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.countInStock}</TableCell>
              <TableCell>
                <IconButton><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => deleteProduct(p._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Product Form */}
      <Typography variant="h6" sx={{ mt: 3 }}>Add New Product</Typography>
      <TextField label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} sx={{ m: 1 }} />
      <TextField label="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} sx={{ m: 1 }} />
      <TextField label="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} sx={{ m: 1 }} />
      <TextField label="Stock" type="number" value={newProduct.countInStock} onChange={(e) => setNewProduct({ ...newProduct, countInStock: Number(e.target.value) })} sx={{ m: 1 }} />
      <Button variant="contained" onClick={addProduct} sx={{ m: 1 }}>Add Product</Button>

      {/* Order Management */}
      <Typography variant="h5" sx={{ mt: 5 }}>Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell><TableCell>Total</TableCell><TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o._id}>
              <TableCell>{o.user?.name || 'Deleted User'}</TableCell>
              <TableCell>₹{o.totalAmount}</TableCell>
              <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
