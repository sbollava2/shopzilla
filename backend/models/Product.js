import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  type: String,
  options: [String],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: [String], default: [] },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  image: { type: [String], default: [] },
  variants: { type: [variantSchema], default: [] },
  categories: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);
