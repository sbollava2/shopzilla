import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
});

router.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
});
router.put('/orders/:id/deliver', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isDelivered = true;
  order.deliveredAt = new Date();
  const updated = await order.save();
  res.json(updated);
});

router.delete('/orders/:id', async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted' });
});


router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.put('/users/:id/admin', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isAdmin = req.body.isAdmin;
  await user.save();

  res.json({ message: `User ${user.isAdmin ? 'granted' : 'revoked'} admin access.` });
});

router.delete('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.deleteOne();
  res.json({ message: 'User deleted successfully.' });
});

export default router;
