const razorpayInstance = require('../config/razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { amount, products } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 100000)}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Some error occured' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      products,
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    console.log('Razorpay Secret Loaded:', !!process.env.RAZORPAY_KEY_SECRET);
    console.log('Order ID:', razorpay_order_id);
    console.log('Payment ID:', razorpay_payment_id);
    console.log('Received Signature:', razorpay_signature);
    console.log('Expected Signature:', expectedSign);

    if (razorpay_signature === expectedSign) {
      // Payment is successful

      // 1. Create an Order in DB
      const newOrder = await Order.create({
        userId: req.user._id,
        products,
        totalAmount: amount,
        paymentStatus: 'Successful',
      });

      // 2. Create Payment Record in DB
      await Payment.create({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount,
        status: 'Successful',
        userId: req.user._id,
      });

      // 3. Clear User Cart
      await Cart.findOneAndUpdate({ userId: req.user._id }, { products: [] });

      return res.status(200).json({ message: 'Payment verified successfully', order: newOrder });
    } else {
      // Invalid signature
      return res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
