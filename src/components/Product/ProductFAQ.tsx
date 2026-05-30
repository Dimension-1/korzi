import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { getCloudinaryUrl } from '../../utils/cloudinary';


export default function ProductFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(2);

  const faqData = [
    {
      id: 1,
      question: "Is it great for beginners?",
      answer: "Yes. Smooth throttle, stable build, and controlled speed make it ideal for first-time drivers."
    },
    {
      id: 2,
      question: "How long does the battery last?",
      answer: "~25 minutes depending on your style. Charges in about 180 min [ Slow charging to ensure safety ]"
    },
    {
      id: 3,
      question: "Can it handle rough surfaces?",
      answer: "Yes tested on cement, tiles, grass, dirt, and uneven terrain."
    },
    {
      id: 4,
      question: "Is it safe for kids?",
      answer: "100%. BIS certified and child-safe materials."
    },
    {
      id: 5,
      question: "How durable is it?",
      answer: "Crash-tested, stress-tested, and built to handle chaos."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-black py-8 md:py-16 px-4 md:px-8 relative overflow-x-clip min-h-[500px] md:min-h-[600px]">
      {/* Background ellipse - Desktop */}
      <div className="absolute -left-40 top-0 w-1/2 h-[180%] pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
        <img src={getCloudinaryUrl('/assets/homepage/Ellipse80.webp')} alt="" className="w-full h-full object-contain opacity-100" />
      </div>

      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 relative z-20">
        
        {/* Left Side - Title and Dragonfly */}
        <div className="relative lg:h-[500px]">
          <div className="flex items-start justify-between gap-4">
            <h2 
              className="uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2 md:mb-2 text-2xl md:text-5xl lg:text-6xl mt-8 md:mt-0"
              style={{
                fontFamily: 'Bebas Neue',
                letterSpacing: '0.02em'
              }}
            >
              FREQUENTLY ASKED<br />QUESTIONS
            </h2>
            
            {/* Dragonfly - Mobile only, right side of heading */}
            <img 
              src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
              alt="Dragonfly" 
              className="lg:hidden w-40 h-35 flex mt-2"
            />
          </div>
          
          {/* Dragonfly - Desktop only, bottom */}
          <div className="hidden lg:block absolute bottom-18 left-8 z-[5]">
            <img 
              src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
              alt="Dragonfly" 
              className="w-64 lg:w-80 xl:w-96 h-auto"
            />
          </div>
        </div>

        {/* Right Side - FAQ Items */}
        <div className="bg-[#0F0F0F] border border-zinc-800">
          {faqData.map((faq) => (
            <div 
              key={faq.id} 
              className="border-b border-gray-700 last:border-b-0"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left group"
              >
                <span 
                  className="text-white pr-4 text-sm md:text-base"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openFaq === faq.id ? (
                    <div className="bg-[#02FF00] square-full p-1">
                    <ArrowDown className="w-5 h-5 text-black" />
                  </div>
                  ) : (
                    <ArrowRight className="w-6 h-6 text-[#02FF00]" />
                  )}
                </div>
              </button>
              
              {openFaq === faq.id && faq.answer && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p 
                    className="text-gray-300 whitespace-pre-line text-xs md:text-sm"
                    style={{ fontFamily: 'DM Sans', lineHeight: '24px' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
