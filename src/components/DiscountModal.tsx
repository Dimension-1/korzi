import { useState, useEffect } from 'react';
import { gaEvent } from '../utils/gtm';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
}

export default function DiscountModal({ isOpen, onClose, onSubmit }: DiscountModalProps) {
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setPhone('');
      setCopied(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCopyCode = () => {
    const code = 'KORZI650';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    } else {
      const t = document.createElement('textarea');
      t.value = code;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.focus();
      t.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const handleSubmit = async () => {
    if (phone.length < 10 || !/^[6-9]/.test(phone)) return;

    // Save phone to Google Sheet via API
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://korzi.toys';
    try {
      await fetch(`${backendUrl}/api/newsletter/phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, source: 'discount_modal', url: window.location.href }),
      });
    } catch (err) {
      console.error('Phone save error:', err);
    }

    // Fire Meta Lead standard event
    gaEvent('lead', { content_name: 'discount_modal', value: 0, currency: 'INR' });

    onSubmit(phone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[840px] max-h-[90vh] overflow-y-auto rounded-[22px] overflow-x-hidden border border-[#222] shadow-[0_0_80px_rgba(2,255,0,0.07)]"
        style={{ background: '#101010' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-[30px] h-[30px] rounded-full border border-[#2c2c2c] bg-white/[0.03] text-[#9A9A9A] text-[15px] flex items-center justify-center z-10 hover:border-[#02FF00] hover:text-[#02FF00] transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: Offer Panel */}
          <div
            className="p-[30px] lg:p-[34px] relative"
            style={{
              background: 'radial-gradient(120% 90% at 0% 0%, rgba(2,255,0,0.08) 0%, transparent 55%), #101010'
            }}
          >
            <div className="flex items-center gap-[9px] mb-5 lg:mb-[26px]" style={{ fontFamily: 'Bebas Neue', fontSize: '24px', letterSpacing: '3px', color: '#fff' }}>
              <span className="text-[#02FF00] text-[18px]">✦</span>KORZI
            </div>

            <p className="font-semibold text-[19px] lg:text-[22px] text-white leading-[1.3] mb-[14px]" style={{ fontFamily: 'DM Sans' }}>
              A reward is waiting for you.
            </p>

            <h1 style={{ fontFamily: 'Bebas Neue', lineHeight: '0.92', letterSpacing: '1px', color: '#fff', fontSize: '34px' }} className="lg:text-[44px] mb-2">
              FLAT <span className="text-[#02FF00] block text-[52px] lg:text-[66px]">₹650 OFF</span>
            </h1>

            <div className="inline-flex items-center gap-2 bg-[#02FF00] text-black text-[13px] font-bold tracking-[1px] uppercase px-4 py-[9px] rounded-lg mb-6 shadow-[0_0_22px_rgba(2,255,0,0.35)]">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              OFFER ENDS TONIGHT
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-[13px]">
                <div className="w-9 h-9 rounded-full bg-[rgba(2,255,0,0.1)] border border-[rgba(2,255,0,0.3)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z" />
                  </svg>
                </div>
                <p className="text-[12.5px] text-[#cfcfcf] leading-[1.4] pt-[2px]" style={{ fontFamily: 'DM Sans' }}>
                  <b className="text-white font-semibold">Real machine, not a toy.</b> 4WD, proportional control, BIS certified for child safety.
                </p>
              </div>

              <div className="flex items-start gap-[13px]">
                <div className="w-9 h-9 rounded-full bg-[rgba(2,255,0,0.1)] border border-[rgba(2,255,0,0.3)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h4l3-8 4 16 3-8h4" />
                  </svg>
                </div>
                <p className="text-[12.5px] text-[#cfcfcf] leading-[1.4] pt-[2px]" style={{ fontFamily: 'DM Sans' }}>
                  <b className="text-white font-semibold">Imported RC feel, local price.</b> Built for Indian terrain — minus the customs and spare-part stress.
                </p>
              </div>

              <div className="flex items-start gap-[13px]">
                <div className="w-9 h-9 rounded-full bg-[rgba(2,255,0,0.1)] border border-[rgba(2,255,0,0.3)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-[12.5px] text-[#cfcfcf] leading-[1.4] pt-[2px]" style={{ fontFamily: 'DM Sans' }}>
                  <b className="text-white font-semibold">Made in India. Real support.</b> Spare parts and service available after you buy.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form Panel */}
          <div className="bg-black p-[22px] lg:p-[38px_34px] flex flex-col justify-center">
            <div className="font-semibold text-[11px] tracking-[2px] uppercase text-[#9A9A9A] mb-[5px]" style={{ fontFamily: 'DM Sans' }}>
              Claim your discount
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '30px', letterSpacing: '1px', color: '#fff', lineHeight: 1 }} className="mb-5">
              ENTER YOUR <span className="text-[#02FF00]">NUMBER</span>
            </h2>

            {/* Phone field */}
            <div className="flex items-center bg-[#0c0c0c] border-[1.5px] border-[#2a2a2a] rounded-xl overflow-hidden focus-within:border-[#02FF00] focus-within:shadow-[0_0_0_3px_rgba(2,255,0,0.12)] transition-all">
              <div className="flex items-center gap-[7px] px-[14px] h-[52px] border-r border-[#222] text-white text-[14px] font-semibold flex-shrink-0">
                <span className="w-5 h-[14px] rounded-[2px] overflow-hidden block">
                  <svg width="20" height="14" viewBox="0 0 20 14">
                    <rect width="20" height="4.66" y="0" fill="#FF9933" />
                    <rect width="20" height="4.66" y="4.66" fill="#fff" />
                    <rect width="20" height="4.66" y="9.33" fill="#138808" />
                    <circle cx="10" cy="7" r="1.6" fill="none" stroke="#000088" strokeWidth="0.5" />
                  </svg>
                </span>
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter your number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 h-[52px] bg-transparent border-none outline-none text-white text-[15px] tracking-[1px] px-[14px]"
                style={{ fontFamily: 'DM Sans' }}
              />
            </div>

            {/* Code chip */}
            <div
              className={`flex items-center justify-between gap-3 border-[1.5px] border-dashed rounded-[10px] p-[10px_10px_10px_16px] my-4 cursor-pointer select-none transition-colors ${
                copied ? 'border-[rgba(2,255,0,0.7)] bg-[rgba(2,255,0,0.1)]' : 'border-[rgba(2,255,0,0.45)] bg-[rgba(2,255,0,0.05)]'
              } hover:bg-[rgba(2,255,0,0.1)] hover:border-[rgba(2,255,0,0.7)]`}
              onClick={handleCopyCode}
            >
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#9A9A9A]" style={{ fontFamily: 'DM Sans' }}>YOUR CODE</span>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '2px', color: '#02FF00', lineHeight: 1 }}>KORZI650</span>
              </div>
              <button className={`flex items-center gap-[6px] flex-shrink-0 border rounded-lg px-3 py-2 text-[11px] font-bold tracking-[1px] transition-colors ${
                copied ? 'bg-[#02FF00] text-black border-[rgba(2,255,0,0.4)]' : 'bg-[rgba(2,255,0,0.12)] text-[#02FF00] border-[rgba(2,255,0,0.4)]'
              } hover:bg-[rgba(2,255,0,0.2)]`} style={{ fontFamily: 'DM Sans' }}>
                <svg className={`w-[13px] h-[13px] ${copied ? 'stroke-black' : 'stroke-[#02FF00]'}`} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 border-none rounded-xl cursor-pointer bg-[#02FF00] text-black flex items-center justify-center gap-2 hover:shadow-[0_0_24px_rgba(2,255,0,0.45)] hover:-translate-y-[1px] transition-all"
              style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '2px' }}
            >
              SHOP & SAVE ₹650 →
            </button>
            <p className="text-[10.5px] text-[#555] text-center mt-[13px] leading-[1.4]" style={{ fontFamily: 'DM Sans' }}>
              Code applied automatically at checkout. We only message you about your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
