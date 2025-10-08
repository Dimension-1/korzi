import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Footer from "../components/Home/footer";
import { getBlogs } from "../services/hygraph";

export default function JournalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [journal, setJournal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        setLoading(true);
        const { blogs } = await getBlogs();
        
        // Find the journal by id (slug)
        const foundJournal = blogs.find((blog: any) => blog.id === slug);
        
        if (!foundJournal) {
          setError('Journal not found');
          return;
        }
        
        setJournal(foundJournal);
        setError(null);
      } catch (err) {
        console.error('Error fetching journal:', err);
        setError('Failed to load journal');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchJournal();
    }
  }, [slug]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[var(--background)] overflow-x-hidden flex items-center justify-center">
          <div className="text-white text-2xl">Loading journal...</div>
        </div>
      </AppLayout>
    );
  }

  if (error || !journal) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[var(--background)] overflow-x-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">
              {error || 'Journal not found'}
            </div>
            <Link 
              to="/logs" 
              className="bg-[var(--primary)] text-black px-6 py-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              Back to Journals
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { title, shortdes, content1, content2, content3, img, createdAt } = journal;

  // Format date as "Month, Year"
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }) : "";

  return (
    <AppLayout>
      <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
        <div className="mx-auto px-6 md:px-24 py-16 md:py-24">
          {/* Header Image */}
          <div className="w-full h-[406px] md:h-[530px] mb-6 rounded-none bg-[#C8C8D0] flex items-center justify-center">
            {img?.url && (
              <img
                src={img.url}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Date in right corner */}
          <div className="flex justify-end mb-2">
            <p className="text-base text-[var(--text-secondary)]">
              {formattedDate.replace(" ", ", ")}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-[40px] font-heading leading-tight mb-8 text-[var(--foreground)] max-w-4xl">
            {title}
          </h1>

          {/* Content Layout: Left 1 = content1, Right 1 = content2, Right 2 = content3, Left 2 = shortdes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Left Column 1 - content1 */}
            <div className="max-w-[350px] md:max-w-[620px]">
              <div 
                className="text-sm md:text-lg text-[var(--foreground)] leading-loose"
                dangerouslySetInnerHTML={{ __html: content1?.html || content1 || "" }}
              />
              <div className="hidden md:block border-b border-[var(--border)] pt-20 max-w-xl"></div>
            </div>
            
            {/* Right Column 1 - content2 */}
            <div className="max-w-[350px] md:max-w-[620px]">
              <div 
                className="text-sm md:text-lg text-[var(--foreground)] leading-loose"
                dangerouslySetInnerHTML={{ __html: content2?.html || content2 || "" }}
              />
              <div className="md:hidden border-b border-[var(--border)] pt-10 max-w-xl"></div>
            </div>
          </div>

          {/* Second Row: Right 2 = content3, Left 2 = shortdes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Left Column 2 - shortdes */}
            <div className="max-w-[360px] md:max-w-xl">
              <h2 className="text-2xl md:text-[32px] font-heading text-[var(--accent)] md:leading-[43px] md:tracking-[-1px]">
                {shortdes}
              </h2>
            </div>

            {/* Right Column 2 - content3 */}
            <div className="space-y-6 max-w-[340px] md:max-w-[550px]">
              <div>
                <div 
                  className="text-sm md:text-base text-[var(--foreground)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content3?.html || content3 || "" }}
                />
              </div>
            </div>
          </div>

          {/* Back to Journals Link */}
          <div className="mt-16 text-center">
            <Link 
              to="/logs" 
              className="inline-flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] px-6 py-3 rounded-lg hover:bg-[var(--text-secondary)]/10 transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Journals
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </AppLayout>
  );
}