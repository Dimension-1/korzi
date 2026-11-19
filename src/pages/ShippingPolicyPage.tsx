import Footer from '../components/Home/footer';

export default function ShippingPolicyPage() {
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
          SHIPPING &amp; DELIVERY POLICY
        </h1>

        <div className="text-white mb-8" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
          <p className="mb-2"><strong>Last Updated:</strong> 1st December 2025</p>
          <p>
            At Korzi (NOVAMENTUM VENTURES PRIVATE LIMITED), we aim to deliver your products quickly, safely, and reliably. This Shipping &amp; Delivery Policy explains how and when your orders will be processed, shipped, and delivered.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              1. ORDER PROCESSING TIME
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <ul className="list-disc pl-6 space-y-1">
                <li>Orders are typically processed and packed within 1–2 business days.</li>
                <li>If an item is under production or temporarily unavailable, processing may take longer.</li>
                <li>You will be notified via email if there is any delay in dispatch.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              2. DELIVERY TIMELINES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Once your order is dispatched from our warehouse, delivery generally takes:</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Within India:</h3>
              <p>2–5 days from the date of dispatch</p>
              
              <p className="mt-4">Delivery timelines may vary based on:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Customer's location</li>
                <li>Courier service efficiency</li>
                <li>Weather conditions</li>
                <li>Festivals or public holidays</li>
                <li>Operational delays beyond our control</li>
              </ul>
              
              <p className="mt-4">We will always aim to deliver your order at the earliest possible time.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              3. SHIPPING PARTNERS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Korzi ships through trusted third-party delivery partners. Delivery is handled by these partners and not directly by Korzi.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              4. DELIVERY ADDRESS REQUIREMENTS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <ul className="list-disc pl-6 space-y-1">
                <li>Orders are delivered to the shipping address provided at checkout.</li>
                <li>Korzi and its delivery partners are not responsible for:</li>
              </ul>
              
              <ul className="list-disc pl-12 space-y-1 mt-2">
                <li>Incorrect or incomplete delivery addresses</li>
                <li>Failed deliveries due to customer unavailability</li>
                <li>Lost packages caused by inaccurate address details</li>
              </ul>
              
              <p className="mt-4">If the package is returned due to an incorrect address, it may be marked as closed with no refund.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              5. DELIVERY ATTEMPTS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Our courier partners will attempt delivery up to 3 times. If the order is undeliverable after three attempts, it will be returned to us and considered closed.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              6. UNDELIVERABLE PACKAGES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Your package may be deemed undeliverable if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The address is incorrect / outdated</li>
                <li>The address contains a P.O. Box (not supported)</li>
                <li>The courier partner cannot reach you</li>
                <li>You refuse the package</li>
              </ul>
              
              <p className="mt-4">Undeliverable packages returned to us will not be eligible for a refund unless it was our shipping error.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              7. DAMAGED, TAMPERED OR PARTIAL DELIVERIES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>If you receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A tampered package</li>
                <li>Damaged box</li>
                <li>Missing items</li>
                <li>Wrong product</li>
                <li>Partial order</li>
              </ul>
              
              <p className="mt-4">You must contact us within 24–48 hours of delivery.</p>
              <p className="mt-2">Please share:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pictures of the outer package</li>
                <li>Pictures/videos of the product received</li>
                <li>Short description of the issue</li>
                <li>Order ID</li>
              </ul>
              
              <p className="mt-4">The investigation typically takes 1–3 business days. Refund/exchange will be processed only after verification.</p>
              
              <p className="mt-4">Your claim may be rejected if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Required information is incomplete</li>
                <li>Photos/videos are not shared</li>
                <li>Complaint is raised outside the 24–48 hour window</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              8. SHIPPING FEES, DUTIES &amp; TAXES (Domestic)
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Most orders do not incur extra taxes; however:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>State entry taxes / octroi may occasionally apply</li>
                <li>These charges vary by state government</li>
                <li>Korzi cannot predict or control these fees</li>
                <li>Customer must pay these charges directly to the courier if applicable</li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              9. INTERNATIONAL SHIPPING (Optional – Disabled by Default)
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>If you plan to ship internationally, tell me and I will customise this section.</p>
              <p>For now, Korzi ships only within India unless explicitly approved.</p>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              10. ORDER TRACKING
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>After your order is shipped, you will receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A shipment confirmation email</li>
                <li>Tracking link / tracking number</li>
              </ul>
              
              <p className="mt-4">You can track your order directly with our delivery partner.</p>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              11. PAYMENT &amp; BILLING INFORMATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <h3 className="text-lg font-semibold mt-6 mb-2">Accepted Payment Methods</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>UPI</li>
                <li>Mastercard / VISA / Amex</li>
                <li>Net Banking</li>
                <li>Wallets</li>
                <li>Cash on Delivery (COD) — availability depends on pincode</li>
              </ul>
              
              <p className="mt-4"><strong>Important:</strong> Cash on Delivery may not accept ₹2000 denomination notes due to RBI guidelines.</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Currency</h3>
              <p>All domestic orders are billed in INR only.</p>
            </div>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              12. CUSTOMER SUPPORT
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>If you have questions about your shipment, contact:</p>
              <p className="mt-4">Email: support@korzi.toys</p>
              <p className="mt-2"><strong>Address:</strong><br />
              NOVAMENTUM VENTURES PRIVATE LIMITED<br />
              3rd Floor, 293, 15th Cross Rd,<br />
              5th Phase, Sarakki, J. P. Nagar,<br />
              Bengaluru, Karnataka 560078</p>
            </div>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              13. POLICY CHANGES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Korzi reserves the right to modify this Shipping &amp; Delivery Policy at any time and without prior notice.</p>
              <p>The updated version will always be available on our website.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
