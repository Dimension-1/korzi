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
          <h1 className="text-xl font-bold text-[var(--foreground)] mb-4">Journal Not Found</h1>
          <p className="text-[var(--text-secondary)]">The requested journal could not be found.</p>
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

  // Convert rich text blocks into plain text
  const getText = (blocks: any) => {
    if (!blocks) return "";
    
    // Handle array of blocks
    if (Array.isArray(blocks)) {
      return blocks
        .map((block) => {
          if (block?.children && Array.isArray(block.children)) {
            return block.children.map((child: any) => child.text || "").join("");
          }
          return block?.text || "";
        })
        .join("\n\n");
    }
    
    // Handle single block or string
    if (typeof blocks === "string") {
      return blocks;
    }
    
    // Handle object with text property
    if (blocks?.text) {
      return blocks.text;
    }
    
    return "";
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto px-6 md:px-24 py-16 md:py-24">
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
        <div className="flex justify-between items-start mb-8 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-heading leading-tight text-[var(--foreground)] max-w-4xl flex-1 pr-4 truncate">
            {journal.title}
          </h1>
          <p className="text-xs md:text-base text-[var(--text-secondary)] flex-shrink-0">
            {formattedDate.replace(" ", ", ")}
          </p>
        </div>

        {/* Subtitle - Mobile First */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-xl md:text-[32px] font-heading text-[var(--accent)] md:leading-[43px] md:tracking-[-1px]">
            {journal.shortdes}
          </h2>
        </div>

        {/* Content1 - Mobile First */}
        <div className="max-w-6xl mx-auto mb-8">
          <p className="text-sm md:text-lg text-[var(--foreground)] leading-loose">
            {getText(journal.content1)}
          </p>
        </div>

        {/* Content2 - Mobile First */}
        <div className="max-w-6xl mx-auto mb-8">
          <p className="text-sm md:text-lg text-[var(--foreground)] leading-loose">
            {getText(journal.content2)}
          </p>
        </div>

        {/* Content3 - Mobile First */}
        {journal.content3 && (
          <div className="max-w-6xl mx-auto mb-8">
            <p className="text-sm md:text-base text-[var(--foreground)] leading-relaxed">
              {getText(journal.content3)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalDetailPage;