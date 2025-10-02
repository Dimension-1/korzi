"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getBlogs } from "@/services/Api/hypgraph";

export default function JournalsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleJournalCount, setVisibleJournalCount] = useState(3);

  const categories = [
    {
      id: "play",
      name: "/play",
      description: "From backyard races to simple science experiments — this is where fun meets discovery. Every test, trick, and challenge turns playtime into an adventure."
    },
    {
      id: "build", 
      name: "/build",
      description: "Step-by-step hacks, creative mods, and custom upgrades. Whether it's LEDs, spoilers, or new tricks with everyday materials — here's where you bring your RC to life."
    },
    {
      id: "learn",
      name: "/learn", 
      description: "Motors, gears, batteries, and balance — explained simply. Clear insights that make kids curious, parents confident, and hobbyists smarter."
    },
    {
      id: "guides",
      name: "/guides",
      description: "Smart choices and easy fixes. From buying tips to safety checks and troubleshooting, this is your trusted corner for RC care."
    }
  ];

  const [blogs, setBlogs] = useState<any[]>([]);
  const [plays, setPlays] = useState<any[]>([]);
  const [builds, setBuilds] = useState<any[]>([]);
  const [learns, setLearns] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { blogs, plays, builds, learns, guides } = await getBlogs();
        console.log(blogs)
        setBlogs(blogs);
        setPlays(plays);
        setBuilds(builds);
        setLearns(learns);
        setGuides(guides);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Set empty arrays as fallback
        setBlogs([]);
        setPlays([]);
        setBuilds([]);
        setLearns([]);
        setGuides([]);
      }
    })();
  }, []);

  const articlesPerPage = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselArticles.length / articlesPerPage));
  };

  const prevSlide = () => {
    const totalSlides = Math.ceil(carouselArticles.length / articlesPerPage);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category.id);
    setIsDropdownOpen(false);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

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

  // Get carousel articles based on selection (first 3 only)
  const getCarouselArticles = () => {
    if (selectedCategory === "") {
      // Show first 3 from all articles (blogs contains all articles)
      return blogs.slice(0, 3);
    }
    
    // Show first 3 from selected category
    switch (selectedCategory) {
      case "play": return plays.slice(0, 3);
      case "build": return builds.slice(0, 3);
      case "learn": return learns.slice(0, 3);
      case "guides": return guides.slice(0, 3);
      default: return blogs.slice(0, 3);
    }
  };

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

  const carouselArticles = getCarouselArticles();
  const allJournalArticles = getJournalArticles();
  
  // Filter journal articles based on search query
  const filteredJournalArticles = searchQuery.trim() 
    ? allJournalArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allJournalArticles;

  // Get only the visible journal articles based on pagination
  const journalArticles = filteredJournalArticles.slice(0, visibleJournalCount);
  
  // Check if there are more articles to load
  const hasMoreArticles = filteredJournalArticles.length > visibleJournalCount;

  // Function to load more articles
  const loadMoreArticles = () => {
    setVisibleJournalCount(prev => prev + 3);
  };

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleJournalCount(3);
  }, [selectedCategory, searchQuery]);
  
  const totalSlides = Math.ceil(carouselArticles.length / articlesPerPage);

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

  return (
    <>
      <Navbar />
      <div className="lg:pt-16 min-h-screen bg-[var(--background)] overflow-x-hidden">
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="max-w-[1512px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              <div className="lg:w-[35%] space-y-8">
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-regular leading-[109px] tracking-[-1px] text-[var(--foreground)] ">
                      /logs
                    </h2>
                    <p className="text-[var(--foreground)] text-base lg:text-[18px] leading-relaxed">
                      Logs are where curiosity meets creation.{" "}
                      <span className="hidden md:block"></span>
                      Cars, drones, robots — whatever we build, break, and
                      rebuild. <span className="hidden md:block"></span>
                      We document it here.{" "}
                      <span className="hidden md:block"></span>
                      Expect experiments, insights, and the occasional{" "}
                      <span className="hidden md:block"></span>
                      aha-moment.
                    </p>
                  </div>

                  <div className="mt-16">
                    <h3 className="text-2xl lg:text-[32px] font-regular text-[var(--foreground)]">
                      /garage
                    </h3>
                  </div>

                  <div className="mt-8 space-y-6">
                    {/* Custom Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-[#1a1a1a] border border-[var(--border)] rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors duration-200"
                      >
                        <span className="text-[var(--foreground)] text-lg">
                          {selectedCategoryData ? selectedCategoryData.name : "/all"}
                        </span>
                        <svg
                          className={`ml-2 transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </button>

                      {/* Dropdown Options */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[var(--border)] rounded-lg shadow-lg z-10">
                          {/* Clear Selection Option */}
                          <button
                            onClick={() => {
                              setSelectedCategory("");
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[#2a2a2a] transition-colors duration-200 rounded-t-lg"
                          >
                            <span className="text-[var(--text-secondary)] text-lg">
                              /all
                            </span>
                          </button>
                          
                          {/* Category Options */}
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => handleCategorySelect(category)}
                              className="w-full px-4 py-3 text-left hover:bg-[#2a2a2a] transition-colors duration-200 last:rounded-b-lg"
                            >
                              <span className="text-[var(--foreground)] text-lg">
                                {category.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Selected Category Description */}
                    {selectedCategoryData && (
                      <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg">
                        <p className="text-[var(--foreground)] text-base leading-relaxed">
                          {selectedCategoryData.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-[65%]">
                {featuredArticle && (
                  <div className="max-w-[700px] space-y-6">
                    {/* Cover Image above title */}
                    <Image
                      src={featuredArticle?.img?.url || fallbackImage}
                      alt={featuredArticle.title}
                      width={700}
                      height={500}
                      className="rounded-lg h-[500px] mb-4 object-fit w-full"
                    />
                    <h1 className="text-2xl lg:text-3xl font-heading text-[var(--foreground)] leading-[45px] tracking-[-1px]">
                      {featuredArticle.title}
                    </h1>
                    <p className="text-[var(--foreground)] text-sm lg:text-base leading-relaxed line-clamp-3">
                      {featuredArticle.shortdes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="mt-4 border-t border-b border-[var(--border)]">
              <div className="flex items-center py-4">
                <div className="hidden lg:block flex-1 text-center text-sm lg:text-base text-[var(--foreground)] tracking-widest">
                  FIELD NOTES
                </div>
                <div className="hidden lg:block w-px h-12 bg-[var(--border)]"></div>
                <div className="flex-1 text-center text-sm lg:text-[32px] text-[var(--foreground)] font-light lg:mx-32">
                  BEHIND THE BUILDS
                </div>
                <div className="hidden lg:block w-px h-12 bg-[var(--border)]"></div>
                <div className="hidden lg:block flex-1 text-center text-sm lg:text-base text-[var(--foreground)] tracking-widest">
                  FIELD NOTES
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="mt-8 lg:mt-16 relative">
              {/* Articles */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {carouselArticles
                          .slice(
                            slideIndex * articlesPerPage,
                            (slideIndex + 1) * articlesPerPage
                          )
                          .map((article, index) => (
                            <Link
                              key={`${article.id}-${slideIndex}-${index}`}
                              href={`/${article.id}`}
                              className="space-y-4 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              {/* Cover Image with fixed height */}
                              <div className="h-[250px] rounded-[8px] overflow-hidden">
                                <Image
                                  src={article?.img?.url || fallbackImage}
                                  alt={article.title}
                                  width={400}
                                  height={250}
                                  className="w-full h-full object-fit"
                                />
                              </div>
                              <div className="space-y-4 lg:space-y-2 max-w-2xl mb-4 lg:mb-0">
                                <p className="text-[13px] lg:text-base text-amber-400">
                                  {formatDate(article.createdAt)}
                                </p>
                                <h3 className="text-base lg:text-xl font-heading text-amber-500 leading-tight">
                                  {article.title}
                                </h3>
                                <p className="text-xs lg:text-sm text-amber-600 leading-relaxed mt-4 line-clamp-2">
                                  {article.shortdes}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentSlide
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--text-secondary)]"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-16 border-[var(--border)] border-b"></div>
            </div>


            {/* Search Bar */}
            <div className="mt-8 lg:mt-16 mb-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg 
                      className="w-5 h-5 text-[var(--text-secondary)]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="m21 21-6-6m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input 
                    type="search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 text-sm bg-[#1a1a1a] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors duration-200" 
                    placeholder="Search articles, topics, categories..." 
                  />
                </div>
              </div>
            </div>


            {/* Journal List */}
            <div className="mt-8 lg:mt-16">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                {/* Left Img */}
                <div className="hidden lg:block border-[var(--border)] border-r"></div>

                {/* Right Articles */}
                <div className="lg:w-[65%] space-y-6 lg:space-y-8">
                  {journalArticles.map((article, index) => (
                    <Link
                      key={`journal-${article.id}-${index}`}
                      href={`/${article.id}`}
                      className="border-b border-[var(--border)] pb-4 lg:pb-6 block hover:opacity-80 transition-opacity"
                    >
                      <div className="flex gap-4 lg:gap-6 items-start">
                        {/* Cover image with fixed height */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden bg-gray-300 flex-shrink-0">
                          <Image
                            src={article?.img?.url || fallbackImage}
                            alt={article.title}
                            width={128}
                            height={128}
                            className="w-full h-full object-fit"
                          />
                        </div>

                        {/* Content on the right */}
                        <div className="flex-1 space-y-1 lg:space-y-2 lg:mx-8">
                          <p className="text-[9px] lg:text-base text-[var(--text-secondary)]">
                            {formatDate(article.createdAt)}
                          </p>
                          <h3 className="text-xs lg:text-xl font-heading text-[var(--foreground)] leading-tight lg:leading-[30px] pt-3 lg:pt-8">
                            {article.title}
                          </h3>
                          <p className="text-[8px] lg:text-sm text-[var(--foreground)] leading-relaxed pt-1 lg:pt-2 line-clamp-2">
                            {article.shortdes}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* Read More Button */}
                  {hasMoreArticles && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={loadMoreArticles}
                        className="px-8 py-3 bg-[#1a1a1a] border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[#2a2a2a] transition-all duration-200 font-medium"
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}