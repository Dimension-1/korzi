import axios from 'axios';

class BigShipService {
  constructor() {
    this.email = process.env.BIGSHIP_EMAIL;
    this.password = process.env.BIGSHIP_PASSWORD;
    this.accessKey = process.env.BIGSHIP_ACCESS_KEY;
    this.apiUrl = process.env.BIGSHIP_API_URL; // https://api.bigship.in/
    this.pickupLocationId = process.env.BIGSHIP_WAREHOUSE_ID; // This is the pickup location ID
    this.token = null;
    this.tokenExpiry = null;
  }

  // Login and get token (expires in 12 hours)
  async login() {
    try {
      const response = await axios.post(
        `${this.apiUrl}api/login/user`,
        {
          user_name: this.email,
          password: this.password,
          access_key: this.accessKey
        }
      );

      if (response.data.success) {
        this.token = response.data.data.token;
        this.tokenExpiry = Date.now() + (11 * 60 * 60 * 1000); // 11 hours (safe margin)
        console.log('BigShip login successful');
        return this.token;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('BigShip login error:', error.response?.data || error.message);
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

  // Create single order
  async createOrder(orderData) {
    try {
      const headers = await this.getHeaders();
      
      // --- ADDRESS LOGIC ---
      // Your 'address2' seems to have the clean apartment/building info, which is
      // perfect for BigShip's 'address_line1' (10-50 chars).
      // Your 'address1' has the very long street address, better for 'address_line2'.
      // We will swap them to prevent cutting off critical delivery info.

      const consigneeAddress1 = (orderData.shippingAddress.address2 || orderData.shippingAddress.address1).substring(0, 50).padEnd(10, ' ');
      const consigneeAddress2 = (orderData.shippingAddress.address2 ? orderData.shippingAddress.address1 : '').substring(0, 50);


      const payload = {
        shipment_category: 'b2c',
        warehouse_detail: {
          // --- FIX ---
          // The API requires a 'long' (number), but env variables are always strings.
          // We must parse the ID to be an integer.
          pickup_location_id: parseInt(this.pickupLocationId, 10),
          return_location_id: parseInt(this.pickupLocationId, 10)
        },
        consignee_detail: {
          first_name: orderData.customer.firstName.padEnd(3, 'X'),
          last_name: orderData.customer.lastName.padEnd(3, 'X'),
          company_name: '',
          contact_number_primary: orderData.customer.phone.replace(/[^0-9]/g, '').slice(-10), // Clean phone, last 10 digits
          contact_number_secondary: '',
          email_id: orderData.customer.email || '',
          consignee_address: {
            // --- UPDATED ADDRESS LOGIC ---
            address_line1: consigneeAddress1,
            address_line2: consigneeAddress2,
            address_landmark: '',
            pincode: orderData.shippingAddress.zip
          }
        },
        order_detail: {
          invoice_date: new Date().toISOString(),
          invoice_id: orderData.orderNumber.replace(/[^a-zA-Z0-9\-\/]/g, ''), // Remove special chars except - and /
          payment_type: 'Prepaid',
          shipment_invoice_amount: orderData.totalAmount,
          total_collectable_amount: 0,
          box_details: [
            {
              // --- Hardcoded values as requested ---
              each_box_dead_weight: 0.5, // Hardcoded weight
              each_box_length: 10, // Hardcoded length
              each_box_width: 10, // Hardcoded width
              each_box_height: 10, // Hardcoded height
              // ------------------------------------
              each_box_invoice_amount: orderData.totalAmount,
              each_box_collectable_amount: 0,
              box_count: 1,
              product_details: orderData.items.map(item => ({
                product_category: 'Others', // Hardcoded product category
                // --- FIX ---
                // Set to empty string. 'Toys' may not be valid and is not required.
                product_sub_category: '', 
                product_name: item.title.replace(/[^a-zA-Z0-9\s\-\/]/g, '').substring(0, 50), // Clean product name
                product_quantity: item.quantity,
                each_product_invoice_amount: item.price,
                each_product_collectable_amount: 0,
                hsn: ''
              }))
            }
          ],
          document_detail: {
            invoice_document_file: '',
            ewaybill_document_file: ''
          }
        }
      };
      
      // --- DEBUG LOG: PAYLOAD ---
      // Log the exact payload we are sending to BigShip
      console.log('--- BigShip Create Order PAYLOAD ---');
      console.log(JSON.stringify(payload, null, 2));
      // ----------------------------
      

      const response = await axios.post(
        `${this.apiUrl}api/order/add/single`,
        payload,
        { headers }
      );

      // --- DEBUG LOG: RESPONSE ---
      console.log('--- BigShip Create Order RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));
      // -----------------------------

      return response.data;
    } catch (error) {
      // --- FIX: Corrected error log message ---
      console.error('=== BigShip createOrder ERROR ===');
      console.error('Status:', error.response?.status);
      console.error('Error Data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Validation Errors:', error.response?.data?.validationErrors);
      console.error('================================');
      throw error;
    }
  }

  // ---
  // --- BUG FIX: This function was completely incorrect ---
  // ---
  // Manifest single order
  async manifestOrder(systemOrderId) { 
    try {
      const headers = await this.getHeaders();
      
      const response = await axios.post(
        // 1. This was the wrong endpoint. Corrected to 'api/order/manifest/single'
        `${this.apiUrl}api/order/manifest/single`, 
        {
          // 2. This endpoint requires a JSON payload with the ID
          system_order_id: systemOrderId
          // We omit courier_id to let BigShip auto-assign
        },
        { headers }
      );

      // --- DEBUG LOG: RESPONSE ---
      console.log('--- BigShip Manifest Order RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));
      // -----------------------------

      return response.data;
    } catch (error) {
      console.error('BigShip manifestOrder error:', error.response?.data || error.message);
      throw error;
    }
  }
  // --- END BUG FIX ---


  // Get AWB, Label and Manifest
  async getShipmentData(systemOrderId, shipmentDataId = 1) { 
    try {
      const headers = await this.getHeaders();
      
      const response = await axios.post(
        // This endpoint is correct
        `${this.apiUrl}api/shipment/data?shipment_data_id=${shipmentDataId}&system_order_id=${systemOrderId}`,
        {},
        { headers }
      );

      // --- DEBUG LOG: RESPONSE ---
      console.log('--- BigShip Get Shipment Data RESPONSE ---');
      console.log(JSON.stringify(response.data, null, 2));
      // -----------------------------

      return response.data;
    } catch (error) {
      console.error('BigShip get shipment data error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Track shipment by LRN (system order ID)
  async trackByLrn(lrnNumber) {
    try {
      const headers = await this.getHeaders();
      
      const response = await axios.get(
        `${this.apiUrl}api/tracking?tracking_type=lrn&tracking_id=${lrnNumber}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('BigShip track by LRN error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Track shipment by AWB
  async trackByAwb(awbNumber) {
    try {
      const headers = await this.getHeaders();
      
      const response = await axios.get(
        `${this.apiUrl}api/tracking?tracking_type=awb&tracking_id=${awbNumber}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('BigShip track by AWB error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Complete flow: Create + Manifest + Get AWB
  async createCompleteShipment(orderData) {
    try {
      // Step 1: Create order
      console.log('Step 1: Creating order...');
      const createResult = await this.createOrder(orderData);
      
      let systemOrderId = null;

      // --- NEW ID PARSING LOGIC ---
      // The API returns the ID in a string: "data": "system_order_id is 1004351867"
      if (createResult.success && createResult.data && typeof createResult.data === 'string' && createResult.data.includes('system_order_id is ')) {
        // Extract the ID from the string
        systemOrderId = createResult.data.split('is ')[1];
        if (!systemOrderId) {
           throw new Error(`Failed to parse system_order_id from response string: ${createResult.data}`);
        }
      } 
      // Fallback check for the object format we originally expected
      else if (createResult.success && createResult.data && createResult.data.system_order_id) {
        systemOrderId = createResult.data.system_order_id;
      } 
      // --- END NEW LOGIC ---
      

      // --- MODIFIED ERROR CHECK ---
      // If we still don't have an ID, throw an error.
      if (!createResult.success || !systemOrderId) {
        console.error('Failed to create order or missing system_order_id in response.');
        
        const apiErrorMessage = createResult.message || 'No message';
        if (apiErrorMessage === 'Order Added Successfully !!!' && !systemOrderId) {
          throw new Error(`createOrder returned success:true but NO system_order_id could be parsed. This is a silent payload failure.`);
        } else {
          throw new Error(apiErrorMessage || 'Failed to create order, or createOrder response data was invalid.');
        }
      }
      // --- END MODIFIED CHECK ---

      console.log('Order created with system_order_id:', systemOrderId);

      // Step 2: Manifest order
      console.log('Step 2: Manifesting order...');
      // This call now points to the correct manifestOrder function
      const manifestResult = await this.manifestOrder(systemOrderId);
      
      if (!manifestResult.success) {
        throw new Error(manifestResult.message || 'Failed to manifest order');
      }

      console.log('Order manifested successfully');

      // Step 3: Get AWB number
      console.log('Step 3: Getting AWB number...');
      const shipmentData = await this.getShipmentData(systemOrderId, 1);
      
      if (!shipmentData.success) {
        throw new Error(shipmentData.message || 'Failed to get AWB');
      }

      const awbNumber = shipmentData.data.master_awb;
      const courierName = shipmentData.data.courier_name;

      console.log('AWB Number:', awbNumber);
      console.log('Courier:', courierName);

      return {
        success: true,
        systemOrderId: systemOrderId,
        awbNumber: awbNumber,
        courierName: courierName,
        lrnNumber: systemOrderId.toString()
      };
    } catch (error)
 {
      console.error('Complete shipment creation error:', error);
      throw error;
    }
  }
}

export default new BigShipService();