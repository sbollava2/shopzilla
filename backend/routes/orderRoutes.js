import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, userId } = req.body;

    console.log('📦 Incoming Order:', { items, totalAmount, userId });

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    const formattedItems = items.map((item) => ({
      _id: item._id,
      name: item.name,
      image: Array.isArray(item.image) ? item.image[0] : item.image, // ✅ fix here
      price: item.price,
      qty: item.qty,
    }));

    const order = new Order({
      user: new mongoose.Types.ObjectId(userId),
      items: formattedItems,
      totalAmount,
    });

    const created = await order.save();
    console.log('✅ Order saved:', created._id);
    return res.status(201).json(created);
  } catch (error) {
    console.error('🔥 Full Order Error Stack:\n', error);
    return res.status(500).json({
      message: error.message || 'Server error while placing order',
    });
  }
});

router.get('/details/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order details' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

export default router;
