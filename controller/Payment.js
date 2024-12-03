import { Payment } from "../model/Payment.js";

export const addPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
  const{ userId } = req;
  const newPayment = new Payment({ userId, cardNumber, expiryDate, cvv, nameOnCard });

  try { 
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPayment = async (req, res) => {
  const { userId } = req;
  try {
    const payment = await Payment.findOne({ userId });
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const updatePayment = async (req, res) => {
  const { userId } = req;
  const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
  try {
    const updatedPayment = await Payment.findOneAndUpdate({ userId }, { cardNumber, expiryDate, cvv, nameOnCard }, { new: true });
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}