import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Button, TextField, Box,
  MenuItem, Select, InputLabel, FormControl, Grid, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: 0,
    countInStock: 0,
    description: '',
    category: '',
    shippingFee: 0,
    color: '',
    size: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get('/admin/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      image: '',
      price: 0,
      countInStock: 0,
      description: '',
      category: '',
      shippingFee: 0,
      color: '',
      size: ''
    });
    setEditId(null);
  };

  const addOrUpdateProduct = async () => {
    if (!newProduct.image.trim()) {
      alert('Image URL is required');
      return;
    }

    const payload = {
      ...newProduct,
      image: [newProduct.image.trim()],
      description: newProduct.description.split(',').map(d => d.trim()),
      price: Number(newProduct.price),
      countInStock: Number(newProduct.countInStock),
      shippingCost: Number(newProduct.shippingFee),
    };

    try {
      if (editId) {
        await API.put(`/admin/products/${editId}`, payload);
      } else {
        await API.post('/admin/products', payload);
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      alert('Failed to save product');
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    await API.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setNewProduct({
      ...product,
      image: Array.isArray(product.image) ? product.image[0] || '' : product.image,
      description: Array.isArray(product.description)
        ? product.description.join(', ')
        : product.description,
      shippingFee: product.shippingCost || 0,
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Product Management</Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6">{editId ? 'Edit Product' : 'Add New Product'}</Typography>
        <Grid container spacing={2}>
          {[['name', 'Name'], ['image', 'Image URL'], ['price', 'Price'], ['countInStock', 'Stock'], ['description', 'Description (comma-separated)'], ['shippingFee', 'Shipping Fee'], ['color', 'Color'], ['size', 'Size']].map(([key, label]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                fullWidth
                label={label}
                name={key}
                value={newProduct[key]}
                onChange={handleInputChange}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category}
                label="Category"
                onChange={handleInputChange}
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="home">Home</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {newProduct.image && (
            <Grid item xs={12}>
              <img
                src={newProduct.image}
                alt="Preview"
                style={{ maxHeight: 150, marginTop: 10, borderRadius: 4 }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" onClick={addOrUpdateProduct}>
              {editId ? 'Update Product' : 'Add Product'}
            </Button>
            {editId && (
              <Button variant="outlined" sx={{ ml: 2 }} onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>All Products</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>{product.countInStock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => editProduct(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminProductManager;
