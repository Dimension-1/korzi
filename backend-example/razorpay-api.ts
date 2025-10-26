// Backend API for Razorpay Integration (Node.js/Express)
// This file should be created in your backend server

import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount: amount, // amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        // Add any custom notes here
      },
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
    });
  }
});

// Verify payment signature
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Generate signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Compare signatures
    if (generated_signature === razorpay_signature) {
      // Payment is authentic
      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      // Payment signature doesn't match
      res.status(400).json({
        success: false,
        error: 'Invalid payment signature',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
    });
  }
});

// Get payment details
router.get('/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await razorpay.payments.fetch(paymentId);

    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        created_at: payment.created_at,
      },
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment details',
    });
  }
});

// Razorpay webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Verify webhook signature
    const generated_signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (generated_signature !== webhookSignature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    // Handle webhook event
    const event = req.body.event;
    const payload = req.body.payload;

    switch (event) {
      case 'payment.authorized':
        console.log('Payment authorized:', payload.payment.entity);
        // Handle payment authorization
        break;

      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity);
        // Handle payment capture
        // Update order status in your database
        break;

      case 'payment.failed':
        console.log('Payment failed:', payload.payment.entity);
        // Handle payment failure
        // Update order status, notify user
        break;

      case 'refund.created':
        console.log('Refund created:', payload.refund.entity);
        // Handle refund creation
        break;

      default:
        console.log('Unhandled event:', event);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

// ====================================
// USAGE IN YOUR EXPRESS APP:
// ====================================
//
// import razorpayRoutes from './routes/razorpay';
// app.use('/api/razorpay', razorpayRoutes);
//
// ====================================
// ENVIRONMENT VARIABLES REQUIRED:
// ====================================
//
// RAZORPAY_KEY_ID=rzp_live_RWwKKZ09RkhDre
// RAZORPAY_SECRET=5Tw6q8WbmHBsBGc8nmKaNiU3
// RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
//
// ====================================
// FRONTEND API CALLS:
// ====================================
//
// 1. Create order:
//    POST http://your-backend.com/api/razorpay/create-order
//    Body: { amount: 100000, currency: "INR" }
//
// 2. Verify payment:
//    POST http://your-backend.com/api/razorpay/verify-payment
//    Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
//
// 3. Get payment details:
//    GET http://your-backend.com/api/razorpay/payment/:paymentId
