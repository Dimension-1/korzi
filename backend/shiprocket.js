import axios from 'axios';

class ShiprocketService {
  constructor() {
    this.email = process.env.SHIPROCKET_EMAIL;
    this.password = process.env.SHIPROCKET_PASSWORD;
    this.apiUrl = process.env.SHIPROCKET_API_URL; // https://apiv2.shiprocket.in/v1/external/
    this.pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION; // "Home"
    this.token = null;
    this.tokenExpiry = null;
  }

  // Login and get token (valid for 10 days)
  async login() {
    try {
      const response = await axios.post(
        `${this.apiUrl}auth/login`,
        {
          email: this.email,
          password: this.password
        }
      );

      if (response.data.token) {
        this.token = response.data.token;
        this.tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000); // 9 days (safe margin)
        console.log('Shiprocket login successful');
        return this.token;
      } else {
        throw new Error('Login failed - no token returned');
      }
    } catch (error) {
      console.error('Shiprocket login error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get valid token (refresh if expired)
  async getToken() {
    if (!this.token || Date.now() >= this.tokenExpiry) {
      await this.login();
    }
    return this.token;
  }

  // Get headers with token
  async getHeaders() {
    const token = await this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Create order (adhoc - without channel)
  async createOrder(orderData) {
    try {
      const headers = await this.getHeaders();

      const payload = {
        order_id: orderData.orderNumber || `KORZI-${Date.now()}`,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: this.pickupLocation,
        billing_customer_name: orderData.customer.firstName || 'Customer',
        billing_last_name: orderData.customer.lastName || '',
        billing_address: orderData.shippingAddress.address1 || '',
        billing_address_2: orderData.shippingAddress.address2 || '',
        billing_city: orderData.shippingAddress.city || '',
        billing_pincode: orderData.shippingAddress.zip || '',
        billing_state: orderData.shippingAddress.province || '',
        billing_country: orderData.shippingAddress.country || 'India',
        billing_email: orderData.customer.email || '',
        billing_phone: (() => {
          const cleaned = (orderData.customer.phone || '').replace(/[^0-9]/g, '').slice(-10);
          return cleaned.length === 10 ? cleaned : '9999999999';
        })(),
        shipping_is_billing: true,
        order_items: orderData.items.map(item => ({
          name: item.title || 'Korzi Product',
          sku: item.variantId || `SKU-${Date.now()}`,
          units: item.quantity || 1,
          selling_price: item.price || 0,
          discount: 0,
          tax: 0,
          hsn: ''
        })),
        payment_method: 'Prepaid',
        sub_total: orderData.totalAmount || 0,
        length: 35,
        breadth: 24,
        height: 14,
        weight: 1.5
      };

      console.log('--- Shiprocket Create Order PAYLOAD ---');
      console.log(JSON.stringify(payload, null, 2));

      const response = await axios.post(
        `${this.apiUrl}orders/create/adhoc`,
        payload,
        { headers }
      );

      console.log('--- Shiprocket Create Order RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.error('=== Shiprocket createOrder ERROR ===');
      console.error('Status:', error.response?.status);
      console.error('Error Data:', JSON.stringify(error.response?.data, null, 2));
      throw error;
    }
  }

  // Assign AWB (courier) to shipment
  async assignAWB(shipmentId, courierId = null) {
    try {
      const headers = await this.getHeaders();

      const payload = { shipment_id: shipmentId };
      if (courierId) {
        payload.courier_id = courierId;
      }

      const response = await axios.post(
        `${this.apiUrl}courier/assign/awb`,
        payload,
        { headers }
      );

      console.log('--- Shiprocket Assign AWB RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.error('Shiprocket assignAWB error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Schedule pickup
  async schedulePickup(shipmentId) {
    try {
      const headers = await this.getHeaders();

      const response = await axios.post(
        `${this.apiUrl}courier/generate/pickup`,
        { shipment_id: [shipmentId] },
        { headers }
      );

      console.log('--- Shiprocket Schedule Pickup RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.error('Shiprocket schedulePickup error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Track shipment by shipment ID
  async trackByShipmentId(shipmentId) {
    try {
      const headers = await this.getHeaders();

      const response = await axios.get(
        `${this.apiUrl}courier/track/shipment/${shipmentId}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Shiprocket track by shipment ID error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Track shipment by AWB
  async trackByAwb(awbNumber) {
    try {
      const headers = await this.getHeaders();

      const response = await axios.get(
        `${this.apiUrl}courier/track/awb/${awbNumber}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Shiprocket track by AWB error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Track by order ID
  async trackByOrderId(orderId) {
    try {
      const headers = await this.getHeaders();

      const response = await axios.get(
        `${this.apiUrl}courier/track?order_id=${orderId}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Shiprocket track by order ID error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Check courier serviceability for a pincode
  async checkServiceability(pickupPincode, deliveryPincode, weight = 1.5) {
    try {
      const headers = await this.getHeaders();

      const response = await axios.get(
        `${this.apiUrl}courier/serviceability/?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&weight=${weight}&cod=0`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Shiprocket serviceability error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Complete flow: Create Order → Assign AWB → Schedule Pickup
  async createCompleteShipment(orderData) {
    try {
      // Step 1: Create order
      console.log('Step 1: Creating Shiprocket order...');
      const createResult = await this.createOrder(orderData);

      if (!createResult.order_id || !createResult.shipment_id) {
        throw new Error(`Failed to create order: ${JSON.stringify(createResult)}`);
      }

      const orderId = createResult.order_id;
      const shipmentId = createResult.shipment_id;
      console.log('Order created - order_id:', orderId, 'shipment_id:', shipmentId);

      // Step 2: Assign AWB (auto-select cheapest courier)
      console.log('Step 2: Assigning AWB...');
      const awbResult = await this.assignAWB(shipmentId);

      const awbNumber = awbResult.response?.data?.awb_code || null;
      const courierName = awbResult.response?.data?.courier_name || null;
      const courierId = awbResult.response?.data?.courier_company_id || null;

      console.log('AWB assigned:', awbNumber, 'Courier:', courierName);

      // Step 3: Schedule pickup
      console.log('Step 3: Scheduling pickup...');
      try {
        await this.schedulePickup(shipmentId);
        console.log('Pickup scheduled successfully');
      } catch (pickupError) {
        // Pickup scheduling can fail if courier doesn't support it yet — not critical
        console.warn('Pickup scheduling failed (non-critical):', pickupError.message);
      }

      return {
        success: true,
        orderId: orderId.toString(),
        shipmentId: shipmentId.toString(),
        awbNumber: awbNumber,
        courierName: courierName,
        courierId: courierId
      };
    } catch (error) {
      console.error('Complete shipment creation error:', error);
      throw error;
    }
  }
}

export default new ShiprocketService();
