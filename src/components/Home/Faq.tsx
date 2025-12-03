import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { getCloudinaryUrl, getCloudinaryVideoUrl } from '../../utils/cloudinary';


export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(2);

  const faqData = [
    {
      id: 1,
      question: "What makes a Korzi machines different from a regular RC toy?",
      answer: "Most RC toys look fast but aren't built to handle real play.\n\nA Korzi machine is designed like a mini vehicle → stronger shell, smoother control, better balance, and a rechargeable system that doesn't quit after two runs.\n\nIt's not fragile fun; it's real motion made accessible."
    },
    {
      id: 2,
      question: "Is the Apex Drive K-01 good for beginners and kids?",
      answer: "Yes. That's the whole point.\n\nThe K-01 gives beginners the thrill of real control without needing hobby-grade skills.\n\nIt's fast enough for grown-ups, stable enough for kids, and tough enough to survive actual chaos.\n\nIt's a perfect \"first machine\" — one that helps you learn, drift, and race without worrying about breakage."
    },
    {
      id: 3,
      question: "How long does the battery last and how fast can I get back to racing?",
      answer: "You get 20 –24 minutes of solid run time depending on your driving style.\n\nRecharge, plug in, and you're back in action within roughly an hour.\n\nNo AA batteries, no hidden costs, no downtime — just charge, race, repeat.\n\nYou can swap extra battery too for longer play duration."
    },
    {
      id: 4,
      question: "How durable is it? Can it handle crashes, jumps, or rough surfaces?",
      answer: "The Apex Drive K-01 is built to take hits.\n\nCrash-tested, drop-tested, and stress-tested on real Indian surfaces — tiles, cement, mud, gravel, brick, everything.\n\nIf something does go wrong, we back you with local support and replaceable parts — because machines should be fixable, not disposable."
    },
    {
      id: 5,
      question: "Is it safe for kids? Is Korzi BIS certified?",
      answer: "Absolutely.\n\nEvery Korzi machine is BIS certified and built with child-safe materials.\n\nStrong outside, safe inside — no toxics, no sharp edges, no surprise hazards.\n\nIt's a machine kids can enjoy and parents can trust. Must read operation manual !"
    },
    {
      id: 6,
      question: "Why should I choose an RC machine over screen time for kids?",
      answer: "Because RC machines build real skills → focus, coordination, spatial control, and confidence.\n\nKids learn to drive, react, adjust, and stay present.\n\nIt's hands-on, fast, and far more engaging than another hour on a phone.\n\nYou're not buying a toy; you're giving them motion, skill, and real-world play."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-black py-8 md:py-16 px-4 md:px-8 md:pb-48 relative overflow-x-clip">
      {/* Background gradient ellipse - Desktop */}
      <div className="absolute -left-32 top-3/4 -translate-y-1/2 w-1/3 h-[200%] pointer-events-none z-[5] hidden md:block">
        <img src={getCloudinaryUrl('/assets/homepage/Ellipse80.png')} alt="" className="w-full h-full object-contain opacity-100" />
      </div>

      {/* Background gradient ellipse - Mobile */}
      <div className="absolute -right-10 bottom-40 w-5/6 h-full pointer-events-none z-10 md:hidden">
        <img src="/assets/homepage/Ellipse 81.png" alt="" className="w-full h-full object-contain opacity-100" />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 relative z-[25]">
        
        {/* Left Side - Title and Dragonfly */}
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <h2 
              className="uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-6 md:mb-12 text-2xl md:text-[64px] leading-tight md:leading-[72px] mt-8 md:mt-0"
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
          <div className="hidden lg:flex justify-start items-center flex-1 -ml-2 mt-20 relative z-[5]">
            <img 
              src={getCloudinaryUrl('/assets/homepage/dragonfly.png')} 
              alt="Dragonfly" 
              className="w-96 h-auto"
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
