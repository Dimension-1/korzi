import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { Blog } from '../services/hygraph';
import JournalDetailHero from '../components/Journal/JournalDetailHero';
import Footer from '../components/Home/footer';

const JournalDetailPage: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [subscribeError, setSubscribeError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Get journal data from navigation state
  const journal = location.state?.journal as Blog | undefined;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription started:', { email, journal: journal?.title });
    
    setIsSubscribing(true);
    setSubscribeMessage('');
    setSubscribeError('');

    try {
      const payload = { 
        email, 
        logName: journal?.title || 'Unknown Log' 
      };
      console.log('Sending newsletter request:', payload);
      
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://korzi.toys';
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('Newsletter response status:', response.status);
      const data = await response.json();
      console.log('Newsletter response data:', data);

      if (data.success) {
        setSubscribeMessage(data.message);
        setEmail('');
        console.log('Newsletter subscription successful');
      } else {
        setSubscribeError(data.error || 'Failed to subscribe');
        console.error('Newsletter subscription failed:', data);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle case when journal is not provided
  if (!journal) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[var(--foreground)] mb-4 font-heading">Journal Not Found</h1>
          <p className="text-[var(--text-secondary)] font-body">The requested journal could not be found.</p>
        </div>
      </div>
    );
  }

  // Format date as "Month, Year"
  const formattedDate = journal.createdAt 
    ? new Date(journal.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown Date";


  return (
    <div className="min-h-screen bg-[var(--background)]">
      <JournalDetailHero 
        title={journal.title}
        category={journal.category}
        readTime="5 min read"
        publishedDate={formattedDate}
        coverImage={journal.img?.url || '/placeholder.jpg'}
      />
      {/* Content Section */}
      <div className="bg-black px-8 md:px-16 lg:px-24 py-16 min-h-[800px] md:min-h-[1000px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">
          {/* Left Sidebar - Desktop only, moved to bottom on mobile */}
          <div className="hidden lg:block space-y-12">
            {/* Contributors - Would come from Hygraph */}
            <div>
              <h3 
                className="text-xl mb-6"
                style={{ fontFamily: 'DM Sans', color: '#02FF00' }}
              >
                Contributors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <div>
                    <p className="text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px' }}>Korzi Team</p>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'DM Sans', fontSize: '12px' }}>Content Creator</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8" />

            {/* Newsletter */}
            <div>
              <h3 
                className="text-xl mb-6"
                style={{ fontFamily: 'DM Sans', color: '#02FF00' }}
              >
                Subscribe to newsletter
              </h3>
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-gray-700 px-4 py-3 text-white mb-4"
                  style={{ fontFamily: 'DM Sans', fontSize: '14px' }}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-white text-black py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600 }}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscribeMessage && (
                <p className="text-green-400 text-sm mt-2" style={{ fontFamily: 'DM Sans' }}>
                  {subscribeMessage}
                </p>
              )}
              {subscribeError && (
                <p className="text-red-400 text-sm mt-2" style={{ fontFamily: 'DM Sans' }}>
                  {subscribeError}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-3" style={{ fontFamily: 'DM Sans' }}>
                By subscribing you agree to with our Privacy Policy.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8" />

            {/* Share */}
            <div>
              <button 
                onClick={handleCopyLink}
                className="px-6 py-4 flex items-center gap-4 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer text-sm"
                style={{
                  fontFamily: 'DM Sans',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-20 group-hover:text-black transition-colors duration-300">
                  {copied ? 'COPIED!' : 'SHARE'}
                </span>
                <Copy className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 lg:order-none">
            {/* Main Content with proper typography */}
            <div 
              className="prose prose-invert max-w-none"
              style={{ fontFamily: 'DM Sans' }}
            >
              {/* Content 1 */}
              <div 
                className="text-white text-lg leading-relaxed mb-8"
                style={{ fontSize: '18px', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: journal.content1?.html || '' }}
              />

              {/* Image with Caption */}
              {journal.img?.url && (
                <div className="my-12">
                  <img
                    src={journal.img.url}
                    alt={journal.title}
                    className="w-full h-[500px] object-cover mb-2"
                  />
                  <p className="text-gray-500 text-sm italic" style={{ fontFamily: 'DM Sans' }}>
                    Image caption goes here
                  </p>
                </div>
              )}

              {/* Content 2 */}
              <div 
                className="text-white text-lg leading-relaxed mb-8"
                style={{ fontSize: '18px', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: journal.content2?.html || '' }}
              />

              {/* Conclusion Section */}
              {journal.shortdes && (
                <div className="mt-12">
                  <h2 
                    className="text-4xl md:text-5xl mb-6"
                    style={{ fontFamily: 'Bebas Neue', color: 'white' }}
                  >
                    Conclusion
                  </h2>
                  <p 
                    className="text-white text-lg leading-relaxed"
                    style={{ fontSize: '18px', lineHeight: '1.8' }}
                  >
                    {journal.shortdes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Left Sidebar - Mobile only, appears after content */}
          <div className="lg:hidden space-y-12 mt-12">
            {/* Contributors - Would come from Hygraph */}
            <div>
              <h3 
                className="text-xl mb-6"
                style={{ fontFamily: 'DM Sans', color: '#02FF00' }}
              >
                Contributors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">👤</span>
                  </div>
                  <div>
                    <p className="text-white" style={{ fontFamily: 'DM Sans', fontSize: '14px' }}>Korzi Team</p>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'DM Sans', fontSize: '12px' }}>Content Creator</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8" />

            {/* Newsletter */}
            <div>
              <h3 
                className="text-xl mb-6"
                style={{ fontFamily: 'DM Sans', color: '#02FF00' }}
              >
                Subscribe to newsletter
              </h3>
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-gray-700 px-4 py-3 text-white mb-4"
                  style={{ fontFamily: 'DM Sans', fontSize: '14px' }}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-white text-black py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600 }}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscribeMessage && (
                <p className="text-green-400 text-sm mt-2" style={{ fontFamily: 'DM Sans' }}>
                  {subscribeMessage}
                </p>
              )}
              {subscribeError && (
                <p className="text-red-400 text-sm mt-2" style={{ fontFamily: 'DM Sans' }}>
                  {subscribeError}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-3" style={{ fontFamily: 'DM Sans' }}>
                By subscribing you agree to with our Privacy Policy.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8" />

            {/* Share */}
            <div>
              <button 
                onClick={handleCopyLink}
                className="px-6 py-4 flex items-center gap-4 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer text-sm"
                style={{
                  fontFamily: 'DM Sans',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-20 group-hover:text-black transition-colors duration-300">
                  {copied ? 'COPIED!' : 'SHARE'}
                </span>
                <Copy className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JournalDetailPage;