import React from 'react';
import { useLocation } from 'react-router-dom';
import { Blog } from '../services/hygraph';
import JournalDetailHero from '../components/Journal/JournalDetailHero';
import Footer from '../components/Home/footer';

const JournalDetailPage: React.FC = () => {
  const location = useLocation();
  
  // Get journal data from navigation state
  const journal = location.state?.journal as Blog | undefined;

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
      <div className="bg-black px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">
          {/* Left Sidebar */}
          <div className="space-y-12">
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
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-700 px-4 py-3 text-white mb-4"
                style={{ fontFamily: 'DM Sans', fontSize: '14px' }}
              />
              <button 
                className="w-full bg-white text-black py-3 hover:bg-gray-200 transition-colors"
                style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600 }}
              >
                Subscribe
              </button>
              <p className="text-gray-500 text-xs mt-3" style={{ fontFamily: 'DM Sans' }}>
                By subscribing you agree to with our Privacy Policy.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8" />

            {/* Share */}
            <div>
              <h3 
                className="text-xl mb-6"
                style={{ fontFamily: 'DM Sans', color: '#02FF00' }}
              >
                Share
              </h3>
              <div className="flex gap-3">
                {['FB', 'TW', 'IN', 'LI'].map((social) => (
                  <button 
                    key={social}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                    style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 600 }}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JournalDetailPage;