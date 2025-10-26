import React, { useState } from 'react';
import { placeOrder } from '../services/orders';

const TestOrderCreation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testOrderCreation = async () => {
    setIsLoading(true);
    setResult('');

    try {
      // Test order data
      const testOrderData = {
        items: [
          {
            id: 'test-item-1',
            title: 'Test Product',
            price: 100,
            quantity: 2,
            variantId: 'gid://shopify/ProductVariant/test-variant-1',
            image: '/test-image.jpg'
          }
        ],
        customer: {
          firstName: 'Test',
          lastName: 'Customer',
          email: 'test@example.com',
          phone: '+1234567890'
        },
        shippingAddress: {
          address1: '123 Test Street',
          address2: 'Apt 1',
          city: 'Test City',
          province: 'Test State',
          country: 'India',
          zip: '12345'
        },
        totalAmount: 200,
        currency: 'INR'
      };

      const orderResult = await placeOrder(testOrderData);
      
      if (orderResult.success) {
        setResult(`✅ Order created successfully!
Order ID: ${orderResult.orderId}
Order Number: ${orderResult.orderNumber}

Check your Shopify Admin → Orders to see the created order.`);
      } else {
        setResult(`❌ Order creation failed:
${orderResult.errors?.join('\n') || 'Unknown error'}`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Shopify Order Creation</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          This will test the Shopify Admin API integration by creating a test order.
          Make sure you have set up the required environment variables:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
          <li><code>VITE_SHOPIFY_ADMIN_TOKEN</code> - Your Shopify Admin API token</li>
          <li><code>VITE_SHOPIFY_STOREFRONT_URL</code> - Your Shopify store URL</li>
        </ul>
      </div>

      <button
        onClick={testOrderCreation}
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Order...' : 'Test Order Creation'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestOrderCreation;





