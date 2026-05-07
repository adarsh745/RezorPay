const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String, // Razorpay Order ID
      required: true,
    },
    paymentId: {
      type: String, // Razorpay Payment ID
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Created', // Created, Successful, Failed
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
