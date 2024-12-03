import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  desc:{
    type: String,
    required: true
  }
});

// cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
