import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface JournalDetailHeroProps {
  title: string;
  category?: string;
  readTime?: string;
  publishedDate: string;
  coverImage: string;
}

export default function JournalDetailHero({ 
  title, 
  category, 
  readTime, 
  publishedDate, 
  coverImage 
}: JournalDetailHeroProps) {
  return (
    <section className="bg-black text-white pt-24 pb-16 px-8 md:px-16 lg:px-24 min-h-[600px] md:min-h-[700px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Back Button */}
            <Link 
              to="/logs" 
              className="inline-flex items-center gap-2 text-white hover:text-[#02FF00] transition-colors"
              style={{ fontFamily: 'DM Sans', fontSize: '16px' }}
            >
              <ChevronLeft className="w-5 h-5" />
              All Logs
            </Link>

            {/* Category and Read Time */}
            <div className="flex items-center gap-4">
              {category && (
                <span 
                  className="px-4 py-1 bg-[#333333] uppercase text-sm"
                  style={{ fontFamily: 'Bebas Neue' }}
                >
                  {category}
                </span>
              )}
              {readTime && (
                <span 
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {readTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
              style={{
                fontFamily: 'Bebas Neue',
                color: '#02FF00'
              }}
            >
              {title}
            </h1>

            {/* Published Date */}
            <p 
              className="text-gray-400"
              style={{ fontFamily: 'DM Sans', fontSize: '16px' }}
            >
              Published on {publishedDate}
            </p>
          </div>

          {/* Right Image */}
          <div>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
