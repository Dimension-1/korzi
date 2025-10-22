import React from 'react';

const DebugCheckout: React.FC = () => {
  const checkEnvironment = () => {
    const storefrontUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL;
    const storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
    const adminToken = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;
    
    console.log('Environment Variables Check:');
    console.log('Storefront URL:', storefrontUrl ? '✅ Set' : '❌ Missing');
    console.log('Storefront Token:', storefrontToken ? '✅ Set' : '❌ Missing');
    console.log('Admin Token:', adminToken ? '✅ Set' : '❌ Missing');
    
    return {
      storefrontUrl: !!storefrontUrl,
      storefrontToken: !!storefrontToken,
      adminToken: !!adminToken
    };
  };

  const envStatus = checkEnvironment();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout Debug Information</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Environment Variables:</h3>
          <ul className="space-y-1 text-sm">
            <li className={envStatus.storefrontUrl ? 'text-green-600' : 'text-red-600'}>
              Storefront URL: {envStatus.storefrontUrl ? '✅ Set' : '❌ Missing'}
            </li>
            <li className={envStatus.storefrontToken ? 'text-green-600' : 'text-red-600'}>
              Storefront Token: {envStatus.storefrontToken ? '✅ Set' : '❌ Missing'}
            </li>
            <li className={envStatus.adminToken ? 'text-green-600' : 'text-red-600'}>
              Admin Token: {envStatus.adminToken ? '✅ Set' : '❌ Missing'}
            </li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Common Issues:</h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• If Admin Token is missing, orders won't be created in Shopify</li>
            <li>• Check browser console for detailed error messages</li>
            <li>• Make sure all required form fields are filled</li>
            <li>• Verify cart has items before going to checkout</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-2 text-blue-900">Next Steps:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Add VITE_SHOPIFY_ADMIN_TOKEN to your .env.local file</li>
            <li>2. Get Admin API token from Shopify Admin → Apps → Create App</li>
            <li>3. Configure scopes: write_orders, read_orders, write_customers, read_customers</li>
            <li>4. Test order creation at /test-order route</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DebugCheckout;
