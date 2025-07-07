// models/Product.js
import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  type: String, // e.g. "Size"
  options: [String], // e.g. ["S", "M", "L"]
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: [String], default: [] },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percent
  shippingCost: { type: Number, default: 0 },
  image: { type: [String], default: [] },
  variants: { type: [variantSchema], default: [] },
  categories: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);
