import React from 'react';
import { useLocation } from 'react-router-dom';
import { Blog } from '../services/hygraph';

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
      <div className="mx-auto px-6 md:px-24 py-16 md:py-24 max-w-7xl">
        {/* Header Image */}
        <div className="w-full h-[406px] md:h-[495px] mb-8 rounded-none flex items-center justify-center">
          {journal.img?.url && (
            <img
              src={journal.img.url}
              alt={journal.title}
              className="w-full  max-w-6xl h-full object-fill"
            />
          )}
        </div>

        {/* Title and Date - Same Line */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl md:text-5xl font-heading leading-tight text-[var(--foreground)] flex-1 pr-4 break-words">
            {journal.title}
          </h1>
          <p className="text-xs md:text-base text-[var(--text-secondary)] flex-shrink-0 font-body">
            {formattedDate.replace(" ", ", ")}
          </p>
        </div>

        {/* Desktop Layout (>600px): Two columns */}
        <div className="hidden sm:block">
          {/* First Row: Content1 and Content2 */}
          <div className="flex gap-8 mb-8">
            <div className="w-1/2">
              <p className="text-sm md:text-lg text-[var(--foreground)] leading-loose break-words font-body">
                {journal.content1}
              </p>
            </div>
            <div className="w-1/2">
              <p className="text-lg text-[var(--foreground)] leading-loose break-words font-body">
                {journal.content2}
              </p>
            </div>
          </div>

          {/* Second Row: Subtitle and Content3 */}
          <div className="flex gap-8 mb-8">
            <div className="w-1/2">
              <h2 className="text-xl md:text-[32px] font-heading text-[var(--accent)] md:leading-[43px] md:tracking-[-1px] break-words">
                {journal.shortdes}
              </h2>
            </div>
            {journal.content3 && (
              <div className="w-1/2">
                <p className="text-base text-[var(--foreground)] leading-relaxed break-words font-body">
                  {journal.content3}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout (≤600px): Single column */}
        <div className="sm:hidden">
          {/* Subtitle */}
          <div className="mb-8">
            <h2 className="text-xl font-heading text-[var(--accent)] break-words">
              {journal.shortdes}
            </h2>
          </div>

          {/* Content1 */}
          <div className="mb-8">
            <p className="text-sm text-[var(--foreground)] leading-loose break-words font-body">
              {journal.content1}
            </p>
          </div>

          {/* Content2 */}
          <div className="mb-8">
            <p className="text-sm text-[var(--foreground)] leading-loose break-words font-body">
              {journal.content2}
            </p>
          </div>

          {/* Content3 */}
          {journal.content3 && (
            <div className="mb-8">
              <p className="text-sm text-[var(--foreground)] leading-relaxed break-words font-body">
                {journal.content3}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalDetailPage;