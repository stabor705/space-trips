

import mongoose from 'mongoose';
import { CartItemSchema} from "../cart/cart.mongo.js";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [CartItemSchema],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

export const Order = mongoose.model('Order', OrderSchema);
