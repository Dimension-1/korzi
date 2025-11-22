import { Search } from 'lucide-react';
import { useState } from 'react';

interface JournalHeroSectionProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
}

export default function JournalHeroSection({ onSearch, onCategoryChange }: JournalHeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'PLAY', 'BUILD', 'LEARN', 'GUIDES'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <section className="bg-black text-white pt-24 pb-16 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl mb-8 uppercase"
          style={{
            fontFamily: 'Bebas Neue',
            fontWeight: 400,
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          KORZI LOGS
        </h1>

        {/* Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Description */}
          <div style={{ fontFamily: 'DM Sans', fontSize: '18px', lineHeight: '1.6' }}>
            <p>Logs are where curiosity meets creation.</p>
            <p>Cars, drones, robots → whatever we build, break, and rebuild.</p>
          </div>

          {/* Right Description */}
          <div style={{ fontFamily: 'DM Sans', fontSize: '18px', lineHeight: '1.6' }}>
            <p>We document it here.</p>
            <p>Expect experiments, insights, and the occasional aha-moment.</p>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center border border-white/30 bg-black">
              <div className="pl-4 pr-2">
                <Search className="w-6 h-6 text-[#02FF00]" />
              </div>
              <input
                type="text"
                placeholder="Search articles, topics etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent py-4 pr-4 text-white placeholder-gray-500 outline-none"
                style={{ fontFamily: 'DM Sans', fontSize: '16px' }}
              />
            </div>
          </form>

          {/* Category Buttons */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`relative px-8 py-3 uppercase overflow-hidden group ${
                  activeCategory === category
                    ? 'bg-[#02FF00] text-black'
                    : 'bg-[#333333] text-white'
                }`}
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '18px',
                  letterSpacing: '0.05em'
                }}
              >
                {activeCategory !== category && (
                  <span className="absolute inset-0 bg-[#02FF00] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
