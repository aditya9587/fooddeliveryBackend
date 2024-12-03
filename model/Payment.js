import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardNumber: {
    type:Number,
    required: true, 
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema)