import Footer from '../components/Home/footer';

export default function ReturnExchangePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        {/* Title */}
        <h1 
          className="text-center text-3xl md:text-5xl lg:text-7xl mb-8 md:mb-16 uppercase"
          style={{
            fontFamily: 'Bebas Neue',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          RETURN &amp; EXCHANGE POLICY
        </h1>

        <div className="text-white mb-8" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
          <p className="mb-2"><strong>Last Updated:</strong> 1st December 2025</p>
          <p>
            At Korzi (NOVAMENTUM VENTURES PRIVATE LIMITED), we stand behind the quality of every product we create. If you are not satisfied with your purchase, we offer a 10-day exchange and return window under the conditions outlined below.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              1. ELIGIBILITY FOR RETURN OR EXCHANGE
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>This policy applies to toys purchased:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Directly from https://korzi.toys, or</li>
                <li>Through authorized Korzi retail partners</li>
              </ul>
              
              <p className="mt-4">To be eligible:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The product must be unused</li>
                <li>Must be in original, sealed, unopened packaging</li>
                <li>Must include all accessories, manuals, inserts, and tags</li>
              </ul>
              
              <p className="mt-4">Products that are opened or used cannot be returned or exchanged, unless the item has a verified manufacturing defect.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              2. RETURN / EXCHANGE TIMEFRAME
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You have 10 calendar days from the date of delivery to initiate a return or exchange request.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              3. HOW TO INITIATE A RETURN OR EXCHANGE
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You can request a return/exchange through:</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Email Support</h3>
              <p>Email us at support@korzi.toys with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Order ID</li>
                <li>Reason for return</li>
                <li>Photos/video (if damaged or defective)</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              4. EXCHANGES (Manufacturing Defects / Transit Damage)
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We will provide a free exchange if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The product arrives damaged, or</li>
                <li>Has a manufacturing defect, or</li>
                <li>The product delivered is incorrect</li>
              </ul>
              
              <p className="mt-4">If the same product is unavailable, we will offer:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A replacement model of similar value, OR</li>
                <li>A full refund</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              5. RETURNS &amp; REFUNDS (Non-Defective Products)
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>If you wish to return a product for personal reasons (example: change of mind):</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Refund will be processed for the product value only</li>
                <li>Shipping, COD, or handling fees are non-refundable</li>
                <li>A restocking fee may apply</li>
                <li>You will be responsible for return shipping costs unless there was an error on our side</li>
              </ul>
              
              <p className="mt-4">Refunds will be credited to your original payment method after the return is approved.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              6. INSPECTION &amp; APPROVAL PROCESS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>All returned products go through a quality inspection upon arrival.</p>
              <p className="mt-2">Please allow up to 2 business days for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Inspection</li>
                <li>Validation of eligibility</li>
                <li>Processing of your refund/exchange</li>
              </ul>
              
              <p className="mt-4">If the product fails inspection (opened, used, damaged, missing parts), the return may be rejected and returned back to you.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              7. NON-RETURNABLE / NON-EXCHANGEABLE PRODUCTS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>The following cannot be returned unless defective:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Customized or personalized products</li>
                <li>Limited-edition or special-release items</li>
                <li>Products marked "Non-returnable" on the product page</li>
                <li>Items purchased under final clearance sales</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              8. WARRANTY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>This Return &amp; Exchange Policy is separate from your product warranty.</p>
              <p>If your product develops a defect after the 10-day return window, please refer to the warranty terms included with your purchase or contact our support team for assistance.</p>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              9. CONTACT US
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>For any questions or help with your return/exchange request:</p>
              <p className="mt-4">Email: support@korzi.toys</p>
              <p>WhatsApp: +91 9844228731</p>
              <p className="mt-2"><strong>Address:</strong><br />
              NOVAMENTUM VENTURES PRIVATE LIMITED<br />
              3rd Floor, 293, 15th Cross Rd,<br />
              5th Phase, Sarakki, J. P. Nagar,<br />
              Bengaluru, Karnataka 560078</p>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              10. POLICY CHANGES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Korzi reserves the right to update or modify this Return &amp; Exchange Policy at any time without prior notice.</p>
              <p>The latest version will always be available on our website.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
