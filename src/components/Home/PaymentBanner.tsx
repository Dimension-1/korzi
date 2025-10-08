import React from 'react';

export default function PaymentBanner() {
  return (
    <div className="w-full bg-[var(--background)] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 border-b border-[var(--border)]">
      <div className="max-w-none mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          
          {/* Left Section - Payment Text */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--foreground)] font-medium text-center sm:text-left" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            Securely pay using:
          </div>
          
          {/* Middle Section - Payment Logos */}
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {/* Mastercard */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-red-500 rounded-sm flex items-center justify-center">
              <div className="w-6 h-4 sm:w-8 sm:h-5 md:w-9 md:h-6 bg-orange-400 rounded-sm"></div>
            </div>
            
            {/* Visa */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm md:text-base font-bold">VISA</span>
            </div>
            
            {/* Paytm */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-blue-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm md:text-base font-bold">Paytm</span>
            </div>
            
            {/* UPI */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-[var(--text-secondary)] rounded-sm flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm md:text-base font-bold">UPI</span>
            </div>
            
            {/* Google Pay */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-[var(--background)] border border-[var(--border)] rounded-sm flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 md:w-2 md:h-5 bg-blue-500"></div>
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 md:w-2 md:h-5 bg-red-500"></div>
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 md:w-2 md:h-5 bg-yellow-500"></div>
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 md:w-2 md:h-5 bg-[var(--primary)]"></div>
              </div>
            </div>
            
            {/* PhonePe */}
            <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 bg-purple-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm md:text-base font-bold">P</span>
            </div>
          </div>
          
          {/* Right Section - Cash on Delivery */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--primary)] font-medium text-center sm:text-right" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            Oh! and Cash On Delivery too :)
          </div>
        </div>
      </div>
    </div>
  );
}