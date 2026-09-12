import Footer from '../components/Home/footer';

export default function TermsConditionsPage() {
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
          TERMS &amp; CONDITIONS
        </h1>

        <div className="text-white mb-8" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
          <p className="mb-2"><strong>Last Updated:</strong> 1st December 2025</p>
          <p>
            These Terms and Conditions ("Terms"), read together with the Privacy Policy, form a legally binding agreement between NOVAMENTUM VENTURES PRIVATE LIMITED ("Company", "Korzi", "we", "our", "us") and any person ("User", "you", "your") who accesses, browses, or uses the website https://korzi.toys ("Platform") or purchases products ("Products") from us.
          </p>
          <p className="mt-4">
            By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, do not access or use the Platform.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              1. ABOUT THESE TERMS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>1.1 These Terms govern your use of the Platform, including browsing, purchasing Korzi products, or accessing any services provided by the Company ("Services").</p>
              <p>1.2 These Terms constitute a binding contract between you and NOVAMENTUM VENTURES PRIVATE LIMITED.</p>
              <p>1.3 Your continued use of the Platform constitutes acceptance of these Terms, including updates that may be made from time to time.</p>
              <p>1.4 If you are under 18 years of age, you confirm that your parent/legal guardian has reviewed and agreed to these Terms.</p>
              <p>1.5 Korzi reserves the right to update, modify, or change these Terms at any time without prior notice.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              2. ELIGIBILITY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>2.1 You must be 18 years or older to use the Platform. If you are under 18, you may use the Platform only under the supervision of a parent or legal guardian.</p>
              <p>2.2 If Korzi becomes aware that a minor is accessing the Platform unsupervised, Korzi reserves the right to deactivate the account immediately.</p>
              <p>2.3 These Terms are governed by applicable Indian law including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The Indian Contract Act, 1872</li>
                <li>The Information Technology Act, 2000</li>
                <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011</li>
                <li>The Information Technology (Intermediaries Guidelines) Rules, 2011</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              3. USE OF THE PLATFORM &amp; SERVICES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>3.1 All content on the Platform—including text, graphics, images, product descriptions, logos, designs, and software—is owned by Korzi or its licensors and protected under intellectual property laws.</p>
              <p>3.2 You are granted a limited, revocable, non-transferable, non-exclusive license to access the Platform solely for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Browsing Products</li>
                <li>Purchasing Products</li>
                <li>Initiating returns or exchanges</li>
              </ul>
              <p className="mt-4">3.3 You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Copy, download, or reproduce Platform content</li>
                <li>Reverse-engineer or attempt to extract Platform source code</li>
                <li>Use bots, crawlers, scrapers, or similar tools</li>
                <li>Misuse the Platform or upload harmful content</li>
                <li>Resell Korzi Products without authorization</li>
              </ul>
              <p className="mt-4">3.4 All product listings on the Platform constitute an invitation to offer. Your order constitutes an offer. Korzi accepts your offer only after dispatch confirmation.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              4. ACCOUNT CREATION &amp; RESPONSIBILITIES
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>4.1 You may be required to create an account to access certain features.</p>
              <p>4.2 You are responsible for maintaining the confidentiality of your login details.</p>
              <p>4.3 If someone uses your account unlawfully due to your failure to secure your credentials, you are fully responsible for the consequences.</p>
              <p>4.4 Korzi is not liable for unauthorized access to your account.</p>
              <p>4.5 Your account may be deleted if it remains inactive for 180 days.</p>
              <p>4.6 Korzi may send:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Order confirmations</li>
                <li>Shipping updates</li>
                <li>Transactional messages</li>
                <li>Promotional communication (if opted in)</li>
              </ul>
              <p className="mt-2">A dispatch confirmation email/SMS constitutes final acceptance of your order.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              5. USER OBLIGATIONS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You agree that:</p>
              <p>5.1 All information you provide (name, address, payment details) is accurate and genuine.</p>
              <p>5.2 Before placing an order, you will review the product description and accept the conditions of sale.</p>
              <p>5.3 You will not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Tamper with the Platform</li>
                <li>Provide false information</li>
                <li>Attempt to breach security features</li>
                <li>Refuse delivery except in cases of visible damage at the time of delivery</li>
              </ul>
              <p className="mt-4">5.4 If delivery fails due to incorrect address or your unavailability, re-delivery charges may apply.</p>
              <p>5.5 Korzi may transfer your data to affiliates or service providers for purposes of fulfilling your order, processing payments, or improving Services—only in accordance with the Privacy Policy.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              6. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>All IP—including trademarks, copyrights, product designs, packaging, logos, illustrations, and digital assets—belongs to Korzi or its licensors.</p>
              <p>You may not reproduce, distribute, republish, or commercially exploit any Korzi content without express written permission.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              7. UNLAWFUL OR PROHIBITED USE
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You agree not to use the Platform:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>For fraudulent activities</li>
                <li>To submit harmful content</li>
                <li>To copy designs or intellectual property</li>
                <li>In violation of applicable laws</li>
              </ul>
              <p className="mt-4">Korzi may immediately suspend or terminate Services for violations.</p>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              8. LIABILITY DISCLAIMER
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>8.1 You acknowledge that use of the Platform is at your own risk.</p>
              <p>8.2 Korzi does not guarantee:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Error-free operation</li>
                <li>Uninterrupted access</li>
                <li>Availability at all times</li>
                <li>Accuracy of product descriptions (though we make best efforts)</li>
              </ul>
              <p className="mt-4">8.3 To the fullest extent permitted by law: Korzi's maximum liability is limited to the value of the product purchased.</p>
              <p>8.4 Korzi is not responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Any third-party failures</li>
                <li>Delays by courier partners</li>
                <li>User negligence</li>
                <li>Unauthorized access to your account</li>
              </ul>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              9. INDEMNITY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>You agree to indemnify and hold harmless NOVAMENTUM VENTURES PRIVATE LIMITED, its directors, employees, and officers from any claims, damages, liabilities, or expenses arising from:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your misuse of the Platform</li>
                <li>Breach of these Terms</li>
                <li>Violation of applicable laws</li>
              </ul>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              10. SEVERABILITY
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>If any provision of these Terms is found invalid, the remaining provisions will continue to remain in full force and effect.</p>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              11. GRIEVANCE OFFICER
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>In compliance with IT Act, 2000:</p>
              <p className="mt-4"><strong>Grievance Officer:</strong> Chander Kant Sharma</p>
              <p>Email: support@korzi.toys</p>
              <p>Phone: +91 9844228731</p>
              <p className="mt-2"><strong>Address:</strong><br />
              NOVAMENTUM VENTURES PRIVATE LIMITED<br />
              3rd Floor, 293, 15th Cross Rd,<br />
              5th Phase, Sarakki, J. P. Nagar,<br />
              Bengaluru, Karnataka 560078</p>
            </div>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              12. TERMINATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>12.1 Korzi may terminate or suspend your access without notice if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You violate these Terms</li>
                <li>You submit false information</li>
                <li>Your activities are unlawful</li>
              </ul>
              <p className="mt-4">12.2 You may stop using the Platform at any time by deleting your account.</p>
              <p>12.3 Termination does NOT affect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your obligation to pay for orders already placed</li>
                <li>Any rights that accrued prior to termination</li>
              </ul>
            </div>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              13. DISPUTE RESOLUTION &amp; GOVERNING LAW
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>13.1 These Terms are governed by the laws of India.</p>
              <p>13.2 All disputes are subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
              <p>13.3 Disputes will be resolved by arbitration under the Arbitration and Conciliation Act, 1996.</p>
              <p>13.4 Arbitration will be held in Bengaluru, in English, before a single arbitrator appointed mutually.</p>
            </div>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              14. WAIVER
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p>Failure to enforce any part of these Terms does not constitute a waiver of Korzi's rights.</p>
            </div>
          </div>

          {/* Section 15 */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              15. INTERPRETATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <ul className="list-disc pl-6 space-y-1">
                <li>Headings are for convenience only.</li>
                <li>Singular includes plural and vice versa.</li>
                <li>"Including" means "including without limitation."</li>
                <li>Terms will be interpreted fairly, not strictly for or against any party.</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ fontFamily: 'DM Sans', color: '#02FF00', fontWeight: 400 }}>
              CONTACT INFORMATION
            </h2>
            <div className="space-y-4 text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '1.8' }}>
              <p><strong>Address:</strong><br />
              NOVAMENTUM VENTURES PRIVATE LIMITED<br />
              3rd Floor, 293, 15th Cross Rd,<br />
              5th Phase, Sarakki, J. P. Nagar,<br />
              Bengaluru, Karnataka 560078</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
