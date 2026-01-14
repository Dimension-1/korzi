import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GraphQLClient } from 'graphql-request';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });
console.log(`Loaded environment from: ${envFile}`);


// THEN import bigship (so it can read env vars)
const { default: bigshipService } = await import('./bigship.js');
const { default: newsletterService } = await import('./newsletter.js');




// Debug: Check if BigShip variables are loaded
// console.log('=== Environment Variables Check ===');
// console.log('BIGSHIP_API_URL:', process.env.BIGSHIP_API_URL);
// console.log('BIGSHIP_EMAIL:', process.env.BIGSHIP_EMAIL ? 'Loaded' : 'Missing');
// console.log('BIGSHIP_PASSWORD:', process.env.BIGSHIP_PASSWORD ? 'Loaded' : 'Missing');
// console.log('BIGSHIP_ACCESS_KEY:', process.env.BIGSHIP_ACCESS_KEY ? 'Loaded' : 'Missing');
// console.log('===================================');

const app = express();
const allowedOrigins = [
  'https://korzi.toys',
  'https://www.korzi.toys',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_SECRET,
});

// Google OAuth Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Shopify Admin GraphQL Client
// Use the same API version as Storefront API
const shopifyAdminUrl = process.env.VITE_SHOPIFY_STOREFRONT_URL.replace('/api/', '/admin/api/');
console.log('=== Shopify Configuration ===');
console.log('Storefront URL:', process.env.VITE_SHOPIFY_STOREFRONT_URL);
console.log('Admin URL:', shopifyAdminUrl);
console.log('Admin Token:', process.env.VITE_SHOPIFY_ADMIN_TOKEN ? `${process.env.VITE_SHOPIFY_ADMIN_TOKEN.substring(0, 15)}...` : 'Missing');
console.log('============================');

const shopifyAdminClient = new GraphQLClient(
    shopifyAdminUrl,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_TOKEN,
      },
    }
  );

// Create Razorpay Order
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
    });

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Payment with Razorpay API
app.post('/api/razorpay/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 1. Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.VITE_RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, verified: false, error: 'Invalid signature' });
    }

    // 2. Verify payment status via Razorpay API
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      
      if (payment.status !== 'captured' && payment.status !== 'authorized') {
        return res.status(400).json({ 
          success: false, 
          verified: false, 
          error: `Payment not successful. Status: ${payment.status}` 
        });
      }

      // 3. Verify order_id matches
      if (payment.order_id !== razorpay_order_id) {
        return res.status(400).json({ 
          success: false, 
          verified: false, 
          error: 'Order ID mismatch' 
        });
      }

      res.json({ 
        success: true, 
        verified: true,
        payment: {
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          method: payment.method
        }
      });
    } catch (apiError) {
      console.error('Razorpay API error:', apiError);
      return res.status(500).json({ 
        success: false, 
        verified: false, 
        error: 'Failed to verify payment with Razorpay' 
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create Shopify Order
app.post('/api/shopify/create-order', async (req, res) => {
  try {
    const { orderData, paymentId } = req.body;

    const CREATE_DRAFT_ORDER = `
      mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
            name
            order {
              id
              name
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const lineItems = orderData.items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    // Use fetch instead of graphql-request to handle errors better
    const response = await fetch(shopifyAdminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({
        query: CREATE_DRAFT_ORDER,
        variables: {
          input: {
            email: orderData.customer.email,
            phone: orderData.customer.phone,
            lineItems: lineItems,
            shippingAddress: {
              firstName: orderData.customer.firstName,
              lastName: orderData.customer.lastName,
              address1: orderData.shippingAddress.address1,
              address2: orderData.shippingAddress.address2,
              city: orderData.shippingAddress.city,
              province: orderData.shippingAddress.province,
              country: orderData.shippingAddress.country,
              zip: orderData.shippingAddress.zip,
              phone: orderData.customer.phone
            },
            note: `Razorpay Payment ID: ${paymentId}`,
            tags: [`payment:${paymentId}`]
          }
        }
      })
    });

    const result = await response.json();
    console.log('Shopify response:', JSON.stringify(result, null, 2));

    if (result.errors) {
      console.error('Shopify GraphQL errors:', result.errors);
      const errorMsg = Array.isArray(result.errors) 
        ? result.errors.map(e => e.message).join(', ')
        : JSON.stringify(result.errors);
      return res.status(400).json({ 
        success: false, 
        error: errorMsg
      });
    }

    const draftOrder = result.data.draftOrderCreate.draftOrder;
    const userErrors = result.data.draftOrderCreate.userErrors;

    if (userErrors && userErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        errors: userErrors.map(e => e.message) 
      });
    }

    res.json({
      success: true,
      orderId: draftOrder.order?.id || draftOrder.id,
      orderNumber: draftOrder.order?.name || draftOrder.name
    });
  } catch (error) {
    console.error('Error creating Shopify order:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

// Webhook handler
app.post('/api/razorpay/webhook', (req, res) => {
  const webhookSignature = req.headers['x-razorpay-signature'];
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (webhookSecret) {
    const generated_signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (generated_signature !== webhookSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
  }

  const event = req.body.event;
  console.log('Webhook event:', event, req.body.payload);
  
  res.json({ success: true });
});

// ============= GOOGLE AUTH ENDPOINT =============

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Invalid token' });
    }

    const { email, given_name, family_name, sub: googleId, picture } = payload;

    // Return customer data directly without Shopify integration
    // Customer will be created in Shopify when they place an order
    const customer = {
      id: `google_${googleId}`,
      email: email,
      firstName: given_name || '',
      lastName: family_name || '',
      displayName: `${given_name || ''} ${family_name || ''}`.trim() || email.split('@')[0],
      acceptsMarketing: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      picture: picture || null
    };
    
    res.json({
      success: true,
      customer: customer
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= NEWSLETTER ENDPOINT =============
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, logName, name } = req.body;
    const sourceLog = logName || name || 'website';

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    const result = await newsletterService.subscribe(email, sourceLog);
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to subscribe. Please try again later.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Allowed CORS origins:', allowedOrigins);
});
// ============= SHOPIFY DISCOUNT VALIDATION =============

// Validate discount code
app.post('/api/shopify/validate-discount', async (req, res) => {
  try {
    const { code, cartTotal, cartItems } = req.body;

    console.log('Validating discount code:', code);
    console.log('Cart items:', cartItems);

    let discount = null;
    
    // Search through price rules to find the discount
    try {
      console.log('Fetching price rules...');
      const priceRulesResponse = await fetch(
        `https://ujivar-cd.myshopify.com/admin/api/2023-10/price_rules.json`,
        {
          headers: {
            'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const priceRulesData = await priceRulesResponse.json();
      console.log('Price rules response status:', priceRulesResponse.status);
      console.log('Price rules data:', JSON.stringify(priceRulesData, null, 2));
      
      if (priceRulesData.price_rules) {
        console.log('Found', priceRulesData.price_rules.length, 'price rules');
        
        for (const priceRule of priceRulesData.price_rules) {
          console.log('Checking price rule:', priceRule.id, priceRule.title);
          
          const codesResponse = await fetch(
            `https://ujivar-cd.myshopify.com/admin/api/2023-10/price_rules/${priceRule.id}/discount_codes.json`,
            {
              headers: {
                'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_TOKEN,
                'Content-Type': 'application/json'
              }
            }
          );
          
          const codesData = await codesResponse.json();
          console.log('Codes for rule', priceRule.id, ':', codesData);
          
          if (codesData.discount_codes) {
            const foundCode = codesData.discount_codes.find(d => 
              d.code.toUpperCase() === code.toUpperCase()
            );
            
            if (foundCode) {
              console.log('Found matching code:', foundCode);
              discount = { ...foundCode, price_rule: priceRule };
              break;
            }
          }
        }
      } else {
        console.log('No price_rules in response');
      }
    } catch (error) {
      console.log('Failed to get price rules:', error.message);
      console.log('Error details:', error);
    }
    
    if (!discount) {
      return res.json({ valid: false, message: 'Coupon code not found' });
    }

    const rule = discount.price_rule;
    
    // Check if discount is enabled
    if (rule.enabled === false) {
      return res.json({ valid: false, message: 'Coupon is not active' });
    }

    // Check usage limit
    if (rule.usage_limit && rule.usage_count >= rule.usage_limit) {
      return res.json({ valid: false, message: 'Coupon usage limit exceeded' });
    }

    // Check date validity
    const now = new Date();
    if (rule.starts_at && new Date(rule.starts_at) > now) {
      return res.json({ valid: false, message: 'Coupon is not yet active' });
    }
    if (rule.ends_at && new Date(rule.ends_at) < now) {
      return res.json({ valid: false, message: 'Coupon has expired' });
    }

    // Check product eligibility - proper implementation
    let finalCartTotal = cartTotal; // Default to full cart total
    
    if (rule.entitled_product_ids && rule.entitled_product_ids.length > 0) {
      console.log('Product-specific discount - validating cart items');
      console.log('Rule entitled_product_ids:', rule.entitled_product_ids);
      console.log('Cart items:', cartItems);
      
      // Get actual product IDs from variant IDs
      let hasEligibleProducts = false;
      let eligibleCartTotal = 0;
      
      for (const item of cartItems || []) {
        try {
          // Fetch variant details to get product ID
          const variantResponse = await fetch(
            `https://ujivar-cd.myshopify.com/admin/api/2023-10/variants/${item.variantId}.json`,
            {
              headers: {
                'X-Shopify-Access-Token': process.env.VITE_SHOPIFY_ADMIN_TOKEN,
                'Content-Type': 'application/json'
              }
            }
          );
          
          if (variantResponse.ok) {
            const variantData = await variantResponse.json();
            const productId = variantData.variant.product_id;
            
            console.log(`Variant ${item.variantId} belongs to product ${productId}`);
            
            // Check if this product is eligible for the discount
            if (rule.entitled_product_ids.includes(productId)) {
              hasEligibleProducts = true;
              eligibleCartTotal += item.price * item.quantity;
              console.log(`Product ${productId} is eligible for discount`);
            } else {
              console.log(`Product ${productId} is NOT eligible for discount`);
            }
          }
        } catch (error) {
          console.log('Error fetching variant details:', error.message);
        }
      }
      
      if (!hasEligibleProducts) {
        return res.json({ 
          valid: false, 
          message: 'This coupon is not valid for the products in your cart' 
        });
      }
      
      // Use only eligible products total for discount calculation
      finalCartTotal = eligibleCartTotal;
      console.log('Eligible cart total:', eligibleCartTotal);
    }
    
    console.log('Applying discount to cart total:', finalCartTotal);

    // Check minimum requirement
    if (rule.prerequisite_subtotal_range?.greater_than_or_equal_to) {
      const minAmount = parseFloat(rule.prerequisite_subtotal_range.greater_than_or_equal_to);
      if (finalCartTotal < minAmount) {
        return res.json({ 
          valid: false, 
          message: `Minimum order amount ₹${minAmount} required` 
        });
      }
    }

    // Calculate discount amount
    let discountAmount = 0;
    let discountType = 'fixed';

    if (rule.value_type === 'percentage') {
      discountType = 'percentage';
      discountAmount = (finalCartTotal * Math.abs(parseFloat(rule.value))) / 100;
    } else if (rule.value_type === 'fixed_amount') {
      discountAmount = Math.abs(parseFloat(rule.value));
    }

    res.json({
      valid: true,
      discount: Math.min(discountAmount, finalCartTotal),
      type: discountType,
      message: 'Coupon applied successfully'
    });

  } catch (error) {
    console.error('Error validating discount:', error);
    res.json({ valid: false, message: 'Failed to validate coupon' });
  }
});

// ============= BIGSHIP ENDPOINTS =============


// Create complete shipment (create + manifest + get AWB)
app.post('/api/bigship/create-shipment', async (req, res) => {
    try {
      const { orderData } = req.body;
      
      console.log('Creating BigShip shipment for order:', orderData.orderNumber);
      
      const result = await bigshipService.createCompleteShipment(orderData);
      
      console.log('BigShip shipment created successfully:', result);
      
      res.json({ 
        success: true, 
        data: result,
        shipmentId: result.systemOrderId,
        awbNumber: result.awbNumber,
        courierName: result.courierName,
        lrnNumber: result.lrnNumber
      });
    } catch (error) {
      console.error('Error creating BigShip shipment:', error);
      console.error('BigShip error details:', error.response?.data);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        details: error.response?.data
      });
    }
  });
  
  // Track by LRN (system order ID)
  app.get('/api/bigship/track-lrn/:lrn', async (req, res) => {
    try {
      const { lrn } = req.params;
      
      console.log('Tracking BigShip by LRN:', lrn);
      
      const tracking = await bigshipService.trackByLrn(lrn);
      
      res.json({ success: true, tracking: tracking.data });
    } catch (error) {
      console.error('Error tracking by LRN:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
  
  // Track by AWB
  app.get('/api/bigship/track-awb/:awb', async (req, res) => {
    try {
      const { awb } = req.params;
      
      console.log('Tracking BigShip by AWB:', awb);
      
      const tracking = await bigshipService.trackByAwb(awb);
      
      res.json({ success: true, tracking: tracking.data });
    } catch (error) {
      console.error('Error tracking by AWB:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

// Get warehouse list (add after other imports)
// Get warehouse list
// Get warehouse list
app.get('/api/bigship/warehouses', async (req, res) => {
    try {
      const token = await bigshipService.getToken();
      const response = await axios.get(
        `${process.env.BIGSHIP_API_URL}api/warehouse/get/list?page_index=1&page_size=10`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

  
    
  

// Fetch customer orders from Shopify
app.get('/api/shopify/orders/:emailOrOrderNumber', async (req, res) => {
    try {
      const { emailOrOrderNumber } = req.params;
      
      // Check if it's an order number (starts with #)
      const isOrderNumber = emailOrOrderNumber.startsWith('#') || emailOrOrderNumber.startsWith('D');
      const searchQuery = isOrderNumber ? `name:${emailOrOrderNumber}` : emailOrOrderNumber;
  
      const FETCH_ORDERS = `
        query getOrders($query: String!) {
        orders(first: 50, query: $query) {
            edges {
            node {
                id
                name
                createdAt
                totalPriceSet {
                  shopMoney {
                    amount
                  }
                }
                tags
                email
                phone
                shippingAddress {
                  firstName
                  lastName
                  address1
                  address2
                  city
                  province
                  zip
                  country
                  phone
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      originalUnitPriceSet {
                        shopMoney {
                          amount
                        }
                      }
                      image {
                        url
                      }
                    }
                  }
                }
            }
            }
        }
        }
        `;

  
      const result = await shopifyAdminClient.request(FETCH_ORDERS, { query: searchQuery });
      
      const orders = result.orders.edges.map(edge => {
        const tags = edge.node.tags || [];
        
        // Parse tracking info from tags
        const awbTag = tags.find(t => t.startsWith('awb:'));
        const courierTag = tags.find(t => t.startsWith('courier:'));
        const lrnTag = tags.find(t => t.startsWith('lrn:'));
        const paymentTag = tags.find(t => t.startsWith('payment:'));
        const razorpayTag = tags.find(t => t.startsWith('razorpay:'));

        
        return {
          id: edge.node.id,
          orderNumber: edge.node.name,
          status: 'confirmed',
          totalAmount: parseFloat(edge.node.totalPriceSet.shopMoney.amount),
          createdAt: edge.node.createdAt,
          paymentId: paymentTag ? paymentTag.replace('payment:', '') : (razorpayTag ? razorpayTag.replace('razorpay:', '') : undefined),
          bigshipShipmentId: lrnTag ? lrnTag.replace('lrn:', '') : undefined,
          awbNumber: awbTag ? awbTag.replace('awb:', '') : undefined,
          courierName: courierTag ? courierTag.replace('courier:', '') : undefined,
          customer: {
            firstName: edge.node.shippingAddress?.firstName || '',
            lastName: edge.node.shippingAddress?.lastName || '',
            email: edge.node.email || '',
            phone: edge.node.phone || edge.node.shippingAddress?.phone || ''
          },
          shippingAddress: edge.node.shippingAddress || {},
          items: edge.node.lineItems.edges.map(item => ({
            id: item.node.id,
            title: item.node.title,
            quantity: item.node.quantity,
            price: parseFloat(item.node.originalUnitPriceSet.shopMoney.amount),
            image: item.node.image?.url
          }))
        };
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      res.json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });



// Complete draft order and send invoice
app.post('/api/shopify/complete-order', async (req, res) => {
  try {
    const { draftOrderId, paymentId } = req.body;

    console.log('Completing draft order:', draftOrderId);

    // Complete the draft order
    const COMPLETE_DRAFT_ORDER = `
      mutation draftOrderComplete($id: ID!) {
        draftOrderComplete(id: $id) {
          draftOrder {
            id
            order {
              id
              name
              email
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const result = await shopifyAdminClient.request(COMPLETE_DRAFT_ORDER, {
      id: draftOrderId
    });

    const userErrors = result.draftOrderComplete.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error('Error completing draft order:', userErrors);
      return res.status(400).json({ 
        success: false, 
        errors: userErrors.map(e => e.message) 
      });
    }

    const order = result.draftOrderComplete.draftOrder.order;
    console.log('Draft order completed successfully:', order);

    // Mark order as paid
    const orderId = order.id;
    await markOrderAsPaid(orderId, paymentId);

    res.json({ 
      success: true, 
      orderId: order.id,
      orderNumber: order.name,
      message: 'Order completed and invoice sent to customer'
    });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to mark order as paid
async function markOrderAsPaid(orderId, paymentId) {
  const MARK_AS_PAID = `
    mutation orderUpdate($input: OrderInput!) {
      orderUpdate(input: $input) {
        order {
          id
          displayFinancialStatus
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const result = await shopifyAdminClient.request(MARK_AS_PAID, {
      input: {
        id: orderId,
        note: `Paid via Razorpay. Payment ID: ${paymentId}`,
        tags: [`razorpay:${paymentId}`, 'paid']
      }
    });

    const userErrors = result.orderUpdate.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error('Error updating order:', userErrors);
      throw new Error(userErrors.map(e => e.message).join(', '));
    }

    console.log('Order updated with payment info:', result.orderUpdate.order);
    return result.orderUpdate.order;
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
}

// Update Shopify order with shipment tracking
app.post('/api/shopify/update-order-tracking', async (req, res) => {
    try {
      const { orderId, awbNumber, courierName, lrnNumber, paymentId } = req.body;
  
      const UPDATE_ORDER = `
        mutation orderUpdate($input: OrderInput!) {
          orderUpdate(input: $input) {
            order {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;
  
      const result = await shopifyAdminClient.request(UPDATE_ORDER, {
        input: {
          id: orderId,
          tags: [
            `payment:${paymentId}`,
            `awb:${awbNumber}`,
            `courier:${courierName}`,
            `lrn:${lrnNumber}`
          ]
        }
      });
  
      const userErrors = result.orderUpdate.userErrors;
      if (userErrors && userErrors.length > 0) {
        return res.status(400).json({ 
          success: false, 
          errors: userErrors.map(e => e.message) 
        });
      }
  
      console.log('Order tracking updated successfully');
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating order tracking:', error);
      // Don't fail the whole process if tracking update fails
      res.json({ success: true, warning: 'Order completed but tracking update failed' });
    }
  });
  