import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GraphQLClient } from 'graphql-request';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load .env.local from current directory
dotenv.config({ path: path.resolve(__dirname, '.env.local') });


// THEN import bigship (so it can read env vars)
const { default: bigshipService } = await import('./bigship.js');




// Debug: Check if BigShip variables are loaded
// console.log('=== Environment Variables Check ===');
// console.log('BIGSHIP_API_URL:', process.env.BIGSHIP_API_URL);
// console.log('BIGSHIP_EMAIL:', process.env.BIGSHIP_EMAIL ? 'Loaded' : 'Missing');
// console.log('BIGSHIP_PASSWORD:', process.env.BIGSHIP_PASSWORD ? 'Loaded' : 'Missing');
// console.log('BIGSHIP_ACCESS_KEY:', process.env.BIGSHIP_ACCESS_KEY ? 'Loaded' : 'Missing');
// console.log('===================================');

const app = express();
app.use(cors({
    origin: ['https://korzi.toys', 'https://www.korzi.toys'],
    credentials: true
  }));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_SECRET,
});

// Shopify Admin GraphQL Client
const shopifyAdminClient = new GraphQLClient(
    process.env.VITE_SHOPIFY_STOREFRONT_URL.replace('/api/', '/admin/api/'),
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

// Verify Payment
app.post('/api/razorpay/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.VITE_RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, verified: true });
    } else {
      res.status(400).json({ success: false, verified: false });
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

    const result = await shopifyAdminClient.request(CREATE_DRAFT_ORDER, {
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
    });

    const draftOrder = result.draftOrderCreate.draftOrder;
    const userErrors = result.draftOrderCreate.userErrors;

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
    res.status(500).json({ success: false, error: error.message });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
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
app.get('/api/shopify/orders/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      const FETCH_ORDERS = `
        query getOrders($email: String!) {
        draftOrders(first: 50, query: $email) {
            edges {
            node {
                id
                name
                createdAt
                totalPrice
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
                    originalUnitPrice
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

  
      const result = await shopifyAdminClient.request(FETCH_ORDERS, { email });
      
      const orders = result.draftOrders.edges.map(edge => {
        const tags = edge.node.tags || [];
        
        // Parse tracking info from tags
        const awbTag = tags.find(t => t.startsWith('awb:'));
        const courierTag = tags.find(t => t.startsWith('courier:'));
        const lrnTag = tags.find(t => t.startsWith('lrn:'));
        const paymentTag = tags.find(t => t.startsWith('payment:'));

        
        return {
          id: edge.node.id,
          orderNumber: edge.node.name,
          status: 'confirmed',
          totalAmount: parseFloat(edge.node.totalPrice),
          createdAt: edge.node.createdAt,
          paymentId: paymentTag ? paymentTag.replace('payment:', '') : undefined,
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
            price: parseFloat(item.node.originalUnitPrice),
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



// Update Shopify order with shipment tracking
app.post('/api/shopify/update-order-tracking', async (req, res) => {
    try {
      const { orderId, awbNumber, courierName, lrnNumber, paymentId } = req.body;
  
      const UPDATE_ORDER = `
        mutation draftOrderUpdate($id: ID!, $input: DraftOrderInput!) {
          draftOrderUpdate(id: $id, input: $input) {
            draftOrder {
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
        id: orderId,
        input: {
          tags: [
            `payment:${paymentId}`,
            `awb:${awbNumber}`,
            `courier:${courierName}`,
            `lrn:${lrnNumber}`
          ]
        }
      });
  
      const userErrors = result.draftOrderUpdate.userErrors;
      if (userErrors && userErrors.length > 0) {
        return res.status(400).json({ 
          success: false, 
          errors: userErrors.map(e => e.message) 
        });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating order tracking:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  