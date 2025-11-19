import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

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
    <section className="bg-black py-16 px-8 relative overflow-x-clip">
      {/* Background gradient ellipse */}
      <div className="absolute -left-32 top-3/4 -translate-y-1/2 w-1/3 h-[140%] pointer-events-none z-10">
        <img src="/assets/homepage/Ellipse80.png" alt="" className="w-full h-full object-contain opacity-100" />
      </div>

      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20">
        
        {/* Left Side - Title and Dragonfly */}
        <div className="flex flex-col justify-between">
          <h2 
            className="uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-12"
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '64px',
              lineHeight: '72px',
              letterSpacing: '0.02em'
            }}
          >
            FREQUENTLY ASKED<br />QUESTIONS
          </h2>
          
          <div className="flex justify-start items-center flex-1 -ml-2">
            <img 
              src="/assets/homepage/dragonfly.png" 
              alt="Dragonfly" 
              className="w-96 h-auto"
            />
          </div>
        </div>

        {/* Right Side - FAQ Items */}
        <div>
          {faqData.map((faq) => (
            <div 
              key={faq.id} 
              className="border-b border-gray-700 bg-black"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span 
                  className="text-white pr-4"
                  style={{ fontFamily: 'DM Sans', fontSize: '16px' }}
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
                <div className="px-6 pb-6">
                  <p 
                    className="text-gray-300 whitespace-pre-line"
                    style={{ fontFamily: 'DM Sans', fontSize: '14px', lineHeight: '24px' }}
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
