import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SuperYouSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[var(--background)] mb-4 border border-[var(--border)] rounded-lg shadow-lg overflow-hidden">
      {/* Header Button */}
      <div className="px-8 py-4">
        <button
          onClick={toggleExpanded}
          className="flex items-center text-center justify-between w-full text-[var(--foreground)] font-bold uppercase tracking-wide hover:opacity-80 transition-opacity duration-200"
        >
          <span className=" flex items-center justify-center text-center w-full">KNOW MORE ABOUT SUPERYOU
            <ChevronDown 
            className={`w-4 ml-4 h-4 text-[var(--primary)] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          /></span>
          
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-8 pb-8 border-t border-[var(--border)]">
          <div className="space-y-6 pt-6">
            {/* Section 1 */}
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[var(--primary)] font-bold uppercase text-sm mb-2">
                  HEALTHY SNACKS WITH A BETTER-FOR-YOU PROMISE
                </h3>
                <p className="text-[var(--foreground)] text-sm leading-relaxed">
                  SuperYou focuses on clean, protein-rich snacks that provide energy without guilt. 
                  Their products are made without palm oil, no added sugar, and with added fiber, 
                  aiming to combine taste and nutrition.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[var(--primary)] font-bold uppercase text-sm mb-2">
                  REDEFINING SNACKING IN INDIA WITH PROTEIN
                </h3>
                <p className="text-[var(--foreground)] text-sm leading-relaxed">
                  India deserves better snacks. SuperYou's mission is to replace empty-calorie munching 
                  with protein-rich, functional options that fit into daily life. They aim to make 
                  "better" the new normal for Indian snacking with their wafers, chips, and protein powder.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[var(--primary)] font-bold uppercase text-sm mb-2">
                  CATEGORIES OF SUPERYOU PROTEIN SNACKS
                </h3>
                <p className="text-[var(--foreground)] text-sm leading-relaxed">
                  Three innovative protein formats offered by SuperYou: Protein Wafers, Multigrain 
                  Baked Chips, and SuperYou Pro. Each is designed to deliver high-quality nutrition 
                  seamlessly into everyday life, ranging from sweet indulgence to savory crunch to pure protein power.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-[var(--primary)] font-bold uppercase text-sm mb-2">
                  INDIA'S FIRST PROTEIN WAFER
                </h3>
                <p className="text-[var(--foreground)] text-sm leading-relaxed">
                  Their protein wafer is light, crunchy, and loaded with 10g protein. It's available in 
                  indulgent flavors such as Chocolate, Peanut Butter, Cheese, Coffee, and Strawberry Crème, 
                  proving that protein snacks can be fun, delicious, and functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperYouSection;
