import { useState } from 'react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: "WHY DID YOU USE MAIDA IN YOUR WAFERS?",
      answer: "We use maida in our wafers to create the perfect texture and consistency that our customers love. It's carefully selected for quality and taste."
    },
    {
      id: 2,
      question: "IS FERMENTED YEAST PROTEIN ACTUALLY GOOD?",
      answer: "Yes! Fermented yeast protein is an excellent source of complete protein with all essential amino acids. It's highly digestible and bioavailable."
    },
    {
      id: 3,
      question: "HOW DO YOU GET THE SWEETNESS WITHOUT ADDED SUGAR?",
      answer: "We use natural sweeteners and carefully selected ingredients to achieve the perfect sweetness without adding refined sugar."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="w-full bg-[var(--background)] py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Section - FAQ */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[var(--background)] to-[var(--background)] p-6 lg:p-12 flex flex-col justify-between">
          {/* FAQ Title */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--primary)] leading-tight">
              FREQUENTLY<br />
              <span className="ml-4 lg:ml-8">ASKED QUESTIONS</span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
            {faqData.map((faq) => (
              <div key={faq.id} className="bg-[var(--background)] rounded-lg p-4 lg:p-6 shadow-sm border border-[var(--border)] transition-all duration-300 ease-in-out hover:shadow-md">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-bold text-[var(--foreground)] text-sm sm:text-base lg:text-lg pr-2 lg:pr-4 group-hover:text-[var(--primary)] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out group-hover:scale-110 ${
                    openFaq === faq.id ? 'rotate-180' : 'rotate-0'
                  }`}>
                    <span className="text-black text-lg lg:text-xl font-bold transition-transform duration-300 ease-in-out">
                      {openFaq === faq.id ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {/* Answer with smooth animation */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-[var(--border)]">
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base transform transition-all duration-300 ease-in-out">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All FAQs Button */}
          <div className="mb-6 lg:mb-8">
            <button className="w-full sm:w-auto bg-[var(--primary)] hover:bg-[var(--secondary)] text-black font-bold py-3 lg:py-4 px-6 lg:px-8 rounded-lg shadow-lg transition-colors duration-300 uppercase tracking-wide text-sm lg:text-base">
              EXPLORE ALL FAQS
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-1/2 bg-[var(--primary)] relative overflow-hidden min-h-[400px] lg:min-h-[600px]">
          {/* Main Image Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Main Image */}
              <div className="relative z-10 w-full h-full">
                <img
                  src="/image.png"
                  alt="Korzi Product"
                  className="object-cover shadow-2xl w-full h-full"
                />
              </div>

              {/* Social Media Comments Overlay - Contained within image */}
              <div className="absolute inset-0 z-20 hidden lg:block">
                {/* Comment 1 */}
                <div className="absolute top-20 left-8 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">korzi_fan</span>
                  </div>
                  <p className="text-sm text-gray-700">Loveee! Need to get me a supply!!! 🔥</p>
                </div>

                {/* Comment 2 */}
                <div className="absolute top-32 right-12 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">rc_enthusiast</span>
                  </div>
                  <p className="text-sm text-gray-700">The Real Mr. BEAST Of India! 🚀</p>
                </div>

                {/* Comment 3 */}
                <div className="absolute top-48 left-16 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">tech_lover</span>
                  </div>
                  <p className="text-sm text-gray-700">Woahhhh!!!! 🤯</p>
                </div>

                {/* Comment 4 */}
                <div className="absolute bottom-32 right-8 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">drone_pilot</span>
                  </div>
                  <p className="text-sm text-gray-700">Dude the racing one SLAPS!! 🏎️</p>
                </div>

                {/* Comment 5 */}
                <div className="absolute bottom-20 left-12 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">robotics_kid</span>
                  </div>
                  <p className="text-sm text-gray-700">Explosive energy! 💥</p>
                </div>
              </div>

              {/* Earn Money Element - Contained within image */}
              <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-[var(--secondary)] text-black px-3 py-2 lg:px-4 lg:py-3 rounded-lg shadow-lg z-30">
                <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 lg:w-6 lg:h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-xs lg:text-sm font-bold">Earn ₹200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}