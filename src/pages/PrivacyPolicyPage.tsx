import Footer from '../components/Home/footer';

export default function PrivacyPolicyPage() {
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
          PRIVACY POLICY
        </h1>

        <div className="text-white mb-8" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
          <p className="mb-2"><strong>Last Updated:</strong> 1st December 2025</p>
          <p>
            This Privacy Policy ("Policy"), read together with the Terms & Conditions, describes how NOVAMENTUM VENTURES PRIVATE LIMITED ("Company", "we", "our", "us", "Korzi") collects, uses, discloses, and protects information about users who access or use https://korzi.toys ("Platform").
          </p>
          <p className="mt-4">
            We value your privacy and are committed to safeguarding your personal information. By accessing or using the Platform, you consent to the practices described in this Policy.
          </p>
          <p className="mt-4">
            If you are under the age of eighteen (18), you represent that your parent or legal guardian has reviewed and accepted this Policy.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              1. CHANGES TO THIS PRIVACY POLICY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We may modify or update this Policy periodically. Updates will be posted on the Platform and will take effect immediately upon publication.</p>
              <p>Your continued use of the Platform after changes are posted constitutes acceptance of the updated Policy.</p>
              <p>If you believe a minor has provided us with personal information without appropriate consent, contact us at support@korzi.toys and we will take corrective action.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              2. INFORMATION WE COLLECT
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We collect the following categories of information:</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">A. Personal Information You Provide</h3>
              <p><strong>Account & Authentication Information</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>First Name, Last Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Login Credentials (encrypted)</li>
              </ul>

              <p className="mt-4"><strong>Profile & Communication Information</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Shipping and Billing Address</li>
                <li>Pincode</li>
                <li>Optional Company Name</li>
                <li>Any information you provide when contacting support or submitting forms</li>
              </ul>

              <p className="mt-4"><strong>Location Data</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>With your permission, we may collect precise location</li>
                <li>If declined, we may derive approximate location using your IP address</li>
              </ul>

              <p className="mt-4"><strong>Google Login</strong></p>
              <p>If you use "Login with Google", we may receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name</li>
                <li>Email</li>
                <li>Profile Picture</li>
              </ul>
              <p className="mt-2">Additional data may be collected based on your Google permission settings.</p>

              <p className="mt-4"><strong>Apple Login</strong></p>
              <p>With Apple Login, we may receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name</li>
                <li>Email (or private relay email if you choose "Hide My Email")</li>
              </ul>

              <p className="mt-4"><strong>Order Fulfilment Data (Shared with Logistics Partners)</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name</li>
                <li>Delivery Address</li>
                <li>Contact Number</li>
                <li>Email</li>
                <li>Pincode</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">B. Financial Information</h3>
              <p>We do not collect or store payment card information.</p>
              <p>All payments are processed via secure third-party gateways (e.g., Razorpay).</p>
              <p>We only receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Transaction Reference IDs</li>
                <li>Payment Status</li>
              </ul>
              <p className="mt-2">Your saved payment details (if any) are stored by the payment gateway, not by Korzi.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">C. Non-Personal Technical Data (Collected Automatically)</h3>
              <p>Includes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP Address</li>
                <li>Browser Type</li>
                <li>Device Type</li>
                <li>Operating System</li>
                <li>Session Duration</li>
                <li>Pages Viewed</li>
                <li>Clickstream Data</li>
                <li>Performance and diagnostic information</li>
              </ul>
              <p className="mt-2">This helps improve Platform experience, security, and performance.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">D. Marketing & Preference Data</h3>
              <p>Collected when you opt-in:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Newsletter subscriptions</li>
                <li>SMS/WhatsApp marketing preferences</li>
                <li>Email open & click analytics</li>
                <li>Product interest insights</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">E. Analytical & Derivative Data</h3>
              <p>Collected through tools like Google Analytics and Meta:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Aggregate user behavior</li>
                <li>Search queries</li>
                <li>Traffic sources</li>
                <li>Engagement metrics</li>
              </ul>
              <p className="mt-2">Data is anonymized wherever possible.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              3. HOW WE USE YOUR INFORMATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create and manage your user account</li>
                <li>Process, confirm, and deliver orders</li>
                <li>Communicate order updates and support responses</li>
                <li>Improve Platform layout, content, and usability</li>
                <li>Personalize product recommendations</li>
                <li>Send marketing communications (only if you opted in)</li>
                <li>Detect fraud, ensure security, and enforce policies</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              4. SHARING YOUR INFORMATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We do not sell or rent your personal information.</p>
              <p>We share information only with trusted partners under strict confidentiality:</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">A. Service Providers</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Delivery partners</li>
                <li>Customer support partners</li>
                <li>IT infrastructure providers</li>
                <li>Marketing team members</li>
                <li>Cloud hosting services (AWS)</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">B. Analytics & Ad Platforms</h3>
              <p>We may share limited hashed data (email/phone) with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Google Ads</li>
                <li>Facebook/Instagram</li>
                <li>Other advertising partners</li>
              </ul>
              <p className="mt-2">This is used to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create custom audiences</li>
                <li>Improve advertising relevance</li>
                <li>Measure marketing performance</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">C. Legal Requirements</h3>
              <p>We may disclose information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>To comply with law enforcement requests</li>
                <li>Under court orders</li>
                <li>To enforce our Terms or prevent fraud</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">D. Business Transfers</h3>
              <p>If Korzi or its assets are acquired, merged, or restructured, user information may be transferred. The new entity will be required to honor this Policy.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              5. NON-PERSONAL INFORMATION SHARING
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We may share aggregated, anonymized data with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Marketing partners</li>
                <li>Advertisers</li>
                <li>Business intelligence partners</li>
              </ul>
              <p className="mt-2">This data does not identify individual users.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              6. ACCESSING, UPDATING & DELETING YOUR INFORMATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You may:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>View your data</li>
                <li>Edit your profile</li>
                <li>Modify your address</li>
                <li>Request deletion of your account</li>
              </ul>
              <p className="mt-2">All through your Korzi account dashboard.</p>
              <p>We are not responsible for inaccuracies in data you provide.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              7. SECURITY MEASURES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We use advanced safeguards, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>HTTPS encryption</li>
                <li>Secure Socket Layer (SSL)</li>
                <li>AWS cloud security practices</li>
                <li>Limited access to internal systems</li>
                <li>Encrypted data during transit</li>
                <li>PCI-DSS compliant payment gateways</li>
              </ul>
              <p className="mt-4">Although we use industry-standard protections, no system is completely secure. Data transmission over the internet carries inherent risks.</p>
              <p className="mt-2">We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Third-party breaches</li>
                <li>User negligence</li>
                <li>Password sharing</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              8. THIRD-PARTY LINKS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>The Platform may contain links to external websites. We are not responsible for their privacy practices. You are encouraged to review their respective policies.</p>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              9. CHILDREN'S PRIVACY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Our Platform is intended for adults. Minors may use Korzi only under adult supervision.</p>
              <p>If a child has submitted personal data, notify us at support@korzi.toys.</p>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              10. SUSPICIOUS COMMUNICATION WARNING
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Korzi will never ask for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Passwords</li>
                <li>Bank details</li>
                <li>CVV</li>
                <li>OTP</li>
                <li>Payments via unofficial links</li>
              </ul>
              <p className="mt-4">If you receive suspicious calls/messages using our name:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Do not click links</li>
                <li>Do not share sensitive information</li>
                <li>Report immediately to support@korzi.toys</li>
              </ul>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              11. GRIEVANCE REDRESSAL
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>In compliance with the Information Technology Act, 2000:</p>
              <p className="mt-4"><strong>Grievance Officer:</strong> Chander Kant Sharma</p>
              <p>Phone: +91 9844228731</p>
              <p>Email: support@korzi.toys</p>
              <p className="mt-2"><strong>Address:</strong></p>
              <p>NOVAMENTUM VENTURES PRIVATE LIMITED<br />
              3rd Floor, 293, 15th Cross Rd,<br />
              5th Phase, Sarakki, J. P. Nagar,<br />
              Bengaluru, Karnataka 560078</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 1 – Submit a Complaint</h3>
              <p>Raise your complaint by email or written letter. A unique grievance reference ID will be assigned.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 2 – Processing & Investigation</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Review within 7 working days</li>
                <li>Additional documents may be requested</li>
                <li>Maintained confidentially</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 3 – Resolution</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Aim to resolve within 30 days</li>
                <li>Delay, if any, will be communicated</li>
                <li>Corrective actions taken as required</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 4 – Escalation</h3>
              <p>If dissatisfied, escalate internally or approach relevant authorities.</p>
            </div>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              12. COOKIE POLICY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <h3 className="text-lg font-semibold mt-6 mb-2">What Are Cookies?</h3>
              <p>Small text files stored on your device to enhance browsing experience.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Types We Use</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Essential Cookies (cart, login, checkout)</li>
                <li>Persistent Cookies (preferences, login history)</li>
                <li>Analytical Cookies (traffic & behavior analysis)</li>
              </ul>
              <p className="mt-2">We do not collect sensitive personal data through cookies.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Managing Cookies</h3>
              <p>You may disable cookies via browser settings. However, core website functionality may be affected.</p>
            </div>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              13. SERVER LOGS & IP ADDRESS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>We maintain logs that may include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address</li>
                <li>Browser information</li>
                <li>Device metadata</li>
              </ul>
              <p className="mt-2">Used for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Security</li>
                <li>Fraud detection</li>
                <li>Analytics</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              CONTACT US
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>For questions about this Policy:</p>
              <p className="mt-4"><strong>NOVAMENTUM VENTURES PRIVATE LIMITED</strong></p>
              <p>Email: support@korzi.toys</p>
              <p className="mt-2"><strong>Address:</strong><br />
              3rd Floor, 293, 15th Cross Rd, 5th Phase, Sarakki, J. P. Nagar, Bengaluru, Karnataka 560078</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
