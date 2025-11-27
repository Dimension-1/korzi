import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Home/footer";
import JournalHeroSection from "../components/Journal/JournalHeroSection";
import { getBlogs } from "../services/hygraph";

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleJournalCount, setVisibleJournalCount] = useState(3);
  
  

  const [blogs, setBlogs] = useState<any[]>([]);
  const [plays, setPlays] = useState<any[]>([]);
  const [builds, setBuilds] = useState<any[]>([]);
  const [learns, setLearns] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { blogs, plays, builds, learns, guides } = await getBlogs();
        console.log('Fetched blogs:', blogs);
        setBlogs(blogs);
        setPlays(plays);
        setBuilds(builds);
        setLearns(learns);
        setGuides(guides);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Handle error state - could show error message to user
        setBlogs([]);
        setPlays([]);
        setBuilds([]);
        setLearns([]);
        setGuides([]);
      }
      setLoading(false);
    })();
  }, []);


  // Get the featured article based on selected category
  const getFeaturedArticle = () => {
    if (selectedCategory === "") {
      return blogs[0];
    }
    
    switch (selectedCategory) {
      case "play":
        return plays[0];
      case "build":
        return builds[0];
      case "learn":
        return learns[0];
      case "guides":
        return guides[0];
      default:
        return blogs[0];
    }
  };

  const featuredArticle = getFeaturedArticle();

  // Get journal list articles (remaining articles after first 3)
  const getJournalArticles = () => {
    if (selectedCategory === "") {
      // Show remaining articles from all articles (skip first 3)
      return blogs.slice(3);
    }
    
    // Show remaining articles from selected category (skip first 3)
    switch (selectedCategory) {
      case "play": return plays.slice(3);
      case "build": return builds.slice(3);
      case "learn": return learns.slice(3);
      case "guides": return guides.slice(3);
      default: return blogs.slice(3);
    }
  };

  const allJournalArticles = getJournalArticles();
  
  // Filter journal articles based on search query
  const filteredJournalArticles = searchQuery.trim() 
    ? allJournalArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allJournalArticles;

  // Get only the visible journal articles based on pagination
  const journalArticles = filteredJournalArticles.slice(0, visibleJournalCount);


  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleJournalCount(3);
  }, [selectedCategory, searchQuery]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Fallback image URL
  const fallbackImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop";

  if (loading) {
    return (
        <div className="min-h-screen bg-[var(--background)] overflow-x-hidden flex items-center justify-center">
          <div className="text-white text-2xl font-body">Loading journals...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
         <JournalHeroSection 
           onSearch={(query) => setSearchQuery(query)}
           onCategoryChange={(category) => setSelectedCategory(category.toLowerCase())}
         />
        {/* Featured Article */}
        {featuredArticle && (
          <section className="px-4 md:px-8 lg:px-24 pb-8 md:pb-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Image */}
              <div className="text-center lg:text-left">
                <img
                  src={featuredArticle?.img?.url || fallbackImage}
                  alt={featuredArticle.title}
                  className="w-full h-[300px] md:h-[500px] object-cover mx-auto"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col justify-center space-y-3 md:space-y-4 text-center lg:text-left">
                <h2 
                  className="text-2xl md:text-4xl lg:text-5xl uppercase"
                  style={{
                    fontFamily: 'Bebas Neue',
                    color: '#02FF00'
                  }}
                >
                  {featuredArticle.title}
                </h2>
                <p 
                  className="text-gray-400 text-sm md:text-base"
                  style={{
                    fontFamily: 'DM Sans',
                    lineHeight: '1.8'
                  }}
                >
                  {featuredArticle.shortdes}
                </p>
                <p 
                  className="text-gray-500 text-xs md:text-sm"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {formatDate(featuredArticle.createdAt)}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1512px] mx-auto">

            {/* Journal List */}
            <div className="mt-8 lg:mt-16">
              <div className="space-y-6 lg:space-y-8">
                  {journalArticles.map((article, index) => (
                    <Link
                      key={`journal-${article.id}-${index}`}
                      to={`/logs/${article.id}`}
                      state={{ journal: article }}
                      onClick={() => window.scrollTo(0, 0)}
                      className="border-b border-[var(--border)] pb-4 lg:pb-6 block hover:opacity-80 transition-opacity"
                    >
                      <div className="flex gap-4 lg:gap-6 items-start">
                        {/* Cover image with fixed height */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden bg-gray-300 flex-shrink-0">
                          <img
                            src={article?.img?.url || fallbackImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content on the right */}
                        <div className="flex-1 space-y-1 lg:space-y-2 lg:mx-8">
                          <p className="text-[9px] lg:text-base text-[var(--text-secondary)] font-body">
                            {formatDate(article.createdAt)}
                          </p>
                          <h3 className="text-xs lg:text-xl font-heading text-[var(--foreground)] leading-tight lg:leading-[30px] pt-3 lg:pt-8">
                            {article.title}
                          </h3>
                          <p className="text-[8px] lg:text-sm text-[var(--foreground)] leading-relaxed pt-1 lg:pt-2 line-clamp-2 font-body">
                            {article.shortdes}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}

              </div>
            </div>

            {/* Blog Grid Section - Full Width */}
            <div className="mt-8 md:mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                {blogs.map((blog) => (
                  <Link 
                    key={blog.id} 
                    to={`/logs/${blog.id}`}
                    state={{ journal: blog }}
                    onClick={() => window.scrollTo(0, 0)}
                    className="border border-gray-700 bg-black overflow-hidden hover:border-[#02FF00] transition-colors group z-30"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={blog.img?.url || '/placeholder.jpg'} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 
                        className="text-[#02FF00] uppercase line-clamp-2"
                        style={{ fontFamily: 'Bebas Neue', fontSize: '20px', lineHeight: '24px' }}
                      >
                        {blog.title}
                      </h3>
                      <p 
                        className="text-gray-400 line-clamp-2"
                        style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '20px' }}
                      >
                        {blog.shortdes}
                      </p>
                      <p 
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: 'DM Sans' }}
                      >
                        {formatDate(blog.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
  );
}