import { useState, useEffect } from 'react';
import { gaEvent } from '../utils/gtm';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
  timeLeft: {
    m: number;
    s: number;
};
setTimeLeft: React.Dispatch<React.SetStateAction<{
  m: number;
  s: number;
}>>
}

const COUPON_CODE = 'KORZI1300';
const TOTAL_SAVINGS = 1300;


export default function DiscountModal({
  isOpen,
  onClose,
  onSubmit,
  timeLeft,
}: DiscountModalProps) {
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pad = (n: number) => String(n).padStart(2, '0');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setPhone('');
      setCopied(false);
      setError('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyCode = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(COUPON_CODE).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    } else {
      const t = document.createElement('textarea');
      t.value = COUPON_CODE;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.focus();
      t.select();
      try {
        document.execCommand('copy');
      } catch {
        /* ignore */
      }
      document.body.removeChild(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const handleSubmit = async () => {
    if (phone.length === 0) {
      setError('Please enter your phone number');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    if (!/^[6-9]/.test(phone)) {
      setError('Number must start with 6, 7, 8 or 9');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://korzi.toys';
    try {
      await fetch(`${backendUrl}/api/newsletter/phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          source: 'discount_modal',
          url: window.location.href,
        }),
      });
    } catch (err) {
      console.error('Phone save error:', err);
    }

    gaEvent('lead', {
      content_name: 'discount_modal',
      value: TOTAL_SAVINGS,
      currency: 'INR',
    });

    setIsSubmitting(false);
    onSubmit(phone);
  };

  if (!isOpen) return null;

  const timerUnits = [
    { value: 0, label: 'HRS' },
    { value: timeLeft?.m, label: 'MIN' },
    { value: timeLeft?.s, label: 'SEC' },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[380px] lg:max-w-[900px] max-h-[88vh] overflow-y-auto rounded-[20px] overflow-x-hidden border border-white/[0.08] shadow-[0_0_80px_rgba(2,255,0,0.08)]"
        style={{ background: '#000000', fontFamily: 'DM Sans, sans-serif' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop close only — mobile close lives in the header row */}
        <button
          type="button"
          onClick={onClose}
          className="hidden lg:flex absolute top-4 right-4 w-8 h-8 rounded-full border border-white/30 items-center justify-center z-20"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ─── MOBILE LAYOUT (matches offer HTML reference) ───────── */}
        <div className="lg:hidden px-[22px] pt-6 pb-[26px] text-center">
          {/* Header: logo + close */}
          <div className="flex justify-between items-center mb-[22px]">
            <div className="flex items-center gap-[9px]" >
              <KorziDragonflyIcon />
              <span
                className="text-[#02FF00] font-bold text-[20px] tracking-[2px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                KORZI
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-[34px] h-[34px] rounded-full border border-white/30 flex items-center justify-center"
              aria-label="Close"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            className="text-white text-[25px] font-medium mb-2 leading-[1.4]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            🔥 Offer of the Day
          </div>

          <div
            className="text-white text-[22px] tracking-[1.5px] mb-2 gap-[2px]"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            💰 Save 
            <span
                className="text-[#02FF00] text-[22px] flex-shrink-0 font-bold ml-[7px] mr-[7px]"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
              ₹1,300 
              </span>
            Today
          </div>
        
          {/* Savings breakdown card */}
          <div
            className="rounded-[14px] p-[14px] mb-4 text-left"
            style={{
              background: 'rgba(2,255,0,0.06)',
              border: '1px solid rgba(2,255,0,0.3)',
            }}
          >
            <div className="flex justify-between items-center mb-[10px]">
              <div className="flex items-center gap-[9px] min-w-0">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M12 2H4v8l10 10 8-8L12 2z" />
                  <circle cx="8" cy="8" r="1.3" fill="#02FF00" stroke="none" />
                </svg>
                <span className="text-white text-[15px] font-bold truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Apex Drive K-01
                </span>
              </div>
              <span
                className="text-[#02FF00] text-[21px] flex-shrink-0 font-bold"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                ₹600 OFF
              </span>
            </div>

            <div className="flex justify-center mb-[14px]">
              <div className="w-6 h-6 rounded-full bg-[#02FF00] flex items-center justify-center">
                <span className="text-[#0a1f0a] text-[19px] font-bold leading-none">+</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-[9px] min-w-0">
                <GiftIcon size={19} />
                <span className="text-white text-[15px] font-bold truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Free Battery Pack
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-white text-[15px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Retail value
                </span>
                <span
                  className="text-[#02FF00] text-[20px] ml-[5px] font-bold"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  ₹700
                </span>
              </div>
            </div>

            <div
              className="pt-[10px] flex justify-between items-center"
              style={{ borderTop: '1px solid rgba(2,255,0,0.25)' }}
            >
              <span className="text-white text-[15px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Total Saved
              </span>
              <span
                className="text-[#02FF00] text-[22px]"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                ₹{TOTAL_SAVINGS.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-[9px] mb-[14px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span
              className="text-[#ff8080] text-[15px] font-bold tracking-[0.5px]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              OFFER ENDS IN
            </span>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            {timerUnits.map((u) => (
              <div
                key={u.label}
                className="rounded-[9px] py-2 px-1 w-[62px]"
                style={{
                  background: '#0d1a0d',
                  border: '1px solid rgba(2,255,0,0.4)',
                }}
              >
                <div
                  className="text-[#02FF00] text-[27px] leading-none tabular-nums"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  {pad(u.value)}
                </div>
                <div
                  className="text-white text-[11px] tracking-[0.5px] mt-0.5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {u.label}
                </div>
              </div>
            ))}
          </div>

          <PhoneField phone={phone} setPhone={setPhone} setError={setError} error={error} variant="mobile" />
          <CouponBox copied={copied} onCopy={handleCopyCode} variant="mobile" />
          <CtaButton isSubmitting={isSubmitting} onClick={handleSubmit} variant="mobile" />
          <SocialProof variant="mobile" />
        </div>

        {/* ─── DESKTOP LAYOUT (matches offer HTML reference) ──────── */}
        <div className="hidden lg:flex">
          {/* Left: product story — fixed 300px */}
          <div
            className="relative flex flex-col justify-center overflow-hidden flex-shrink-0"
            style={{
              width: '300px',
              background: '#0a0a0a',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              padding: '36px 28px',
            }}
          >
            <svg
              width="240"
              height="330"
              viewBox="0 0 100 140"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none"
              aria-hidden
            >
              <polygon points="50,20 2,2 22,24" fill="#02FF00" />
              <polygon points="50,20 98,2 78,24" fill="#02FF00" />
              <polygon points="50,20 8,34 24,26" fill="#02FF00" />
              <polygon points="50,20 92,34 76,26" fill="#02FF00" />
              <polygon points="50,0 44,14 50,20 56,14" fill="#02FF00" />
              <polygon points="47,22 50,20 53,22 51,60 50,95 49,60" fill="#02FF00" />
            </svg>

            <div className="relative z-10">
              <div className="flex items-center gap-[9px] mb-[30px]">
                <KorziDragonflyIcon />
                <span
                  className="text-[#02FF00] font-bold text-[18px] tracking-[2px]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  KORZI
                </span>
              </div>

              <div
                className="text-white text-[32px] leading-[1.15] mb-3 font-bold"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                APEX DRIVE <span className="text-[#02FF00]">K-01</span>
              </div>

              <p
                className="text-white text-[13.5px] leading-[1.6] mb-[26px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                4WD, proportional control, BIS certified. A real machine, not a toy.
              </p>

              <div className="flex flex-col gap-[13px]">
                <div className="flex items-center gap-[9px]">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M9 12.5L7 22l5-3 5 3-2-9.5" />
                  </svg>
                  <span className="text-white text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    BIS certified for child safety
                  </span>
                </div>
                <div className="flex items-center gap-[9px]">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M5 3v18M5 4h11l-2 4 2 4H5" />
                  </svg>
                  <span className="text-white text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Built in Bangalore, India
                  </span>
                </div>
                <div className="flex items-center gap-[9px]">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#02FF00" stroke="none" className="flex-shrink-0">
                    <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
                  </svg>
                  <span className="text-white text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    4.8/5 · 248+ verified buyers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: offer + form */}
          <div className="flex-1 min-w-0 text-center" style={{ padding: '34px 40px' }}>
            <div
              className="text-white text-[26px] font-medium mb-1"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              🔥 Offer of the Day
            </div>

            <div
              className="text-white text-[22px] tracking-[1.5px] mb-0.5"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
            💰 Save 
            <span
                className="text-[#02FF00] text-[22px] flex-shrink-0 font-bold ml-[7px] mr-[7px]"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
              ₹1,300 
              </span>
         Today
            </div>


            {/* Timer pill */}
            <div
              className="inline-flex items-center gap-3 rounded-[10px] px-[22px] py-2 mb-4"
              style={{
                background: 'rgba(2,255,0,0.08)',
                border: '1px solid rgba(2,255,0,0.3)',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff8080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <span
                className="text-[#ff8080] text-[18px] font-bold"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                ENDS IN
              </span>
              <span
                className="text-[#02FF00] text-[20px] tracking-[0.5px] tabular-nums"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
               {'00'}:{pad(timeLeft?.m)}:{pad(timeLeft?.s)}
              </span>
            </div>

            {/* Savings breakdown card */}
            <div
              className="rounded-[14px] text-left mb-[18px]"
              style={{
                background: 'rgba(2,255,0,0.06)',
                border: '1px solid rgba(2,255,0,0.3)',
                padding: '16px 22px',
              }}
            >
              <div className="flex justify-between items-center mb-[8px]">
                <div className="flex items-center gap-[9px]">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2H4v8l10 10 8-8L12 2z" />
                    <circle cx="8" cy="8" r="1.3" fill="#02FF00" stroke="none" />
                  </svg>
                  <span className="text-white text-[14px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Apex Drive K-01
                  </span>
                </div>
                <span
                  className="text-[#02FF00] text-[20px]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  ₹600 OFF
                </span>
              </div>

              <div className="flex justify-center mb-[13px]">
                <div className="w-7 h-7 rounded-full bg-[#02FF00] flex items-center justify-center">
                  <span className="text-[#0a1f0a] text-[17px] font-bold leading-none">+</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-[15px]">
                <div className="flex items-center gap-[9px]">
                  <GiftIcon size={17} />
                  <span className="text-white text-[14px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Free Battery Pack
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white text-[12px]font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Retail value
                  </span>
                  <span
                    className="text-[#02FF00] text-[20px] ml-[5px] font-bold"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    ₹700
                  </span>
                </div>
              </div>

              <div
                className="pt-[10px] flex justify-between items-center"
                style={{ borderTop: '1px solid rgba(2,255,0,0.25)' }}
              >
                <span className="text-white text-[14px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  💰 Total Saved
                </span>
                <span
                  className="text-[#02FF00] text-[26px]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  ₹{TOTAL_SAVINGS.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <PhoneField phone={phone} setPhone={setPhone} setError={setError} error={error} variant="desktop" />
            <CouponBox copied={copied} onCopy={handleCopyCode} variant="desktop" />
            <CtaButton isSubmitting={isSubmitting} onClick={handleSubmit} variant="desktop" />
            <SocialProof variant="desktop" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared subcomponents ─────────────────────────────────────────────────── */

function KorziDragonflyIcon() {
  return (
    <svg width="22" height="30" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <polygon points="50,20 2,2 22,24" fill="#02FF00" />
      <polygon points="50,20 98,2 78,24" fill="#02FF00" />
      <polygon points="50,20 8,34 24,26" fill="#02FF00" />
      <polygon points="50,20 92,34 76,26" fill="#02FF00" />
      <polygon points="50,0 44,14 50,20 56,14" fill="#02FF00" />
      <polygon points="47,22 50,20 53,22 51,60 50,95 49,60" fill="#02FF00" />
    </svg>
  );
}

function PhoneField({
  phone,
  setPhone,
  setError,
  error,
  variant = 'desktop',
}: {
  phone: string;
  setPhone: (v: string) => void;
  setError: (v: string) => void;
  error: string;
  variant?: 'mobile' | 'desktop';
}) {
  if (variant === 'mobile') {
    return (
      <div className="mb-[18px] text-left">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-white text-[14px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            PHONE NUMBER <span className="text-[#02FF00]">*</span>
          </span>
          {error && (
            <span className="text-[#ff8080] text-[12px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Enter a valid 10-digit number
            </span>
          )}
        </div>
        <div
          className="flex overflow-hidden rounded-[10px]"
          style={{
            border: error ? '1px solid #ff8080' : '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <div
            className="flex items-center gap-1.5 px-[14px] py-[14px] text-white text-[16px] flex-shrink-0"
            style={{ borderRight: '1px solid rgba(255,255,255,0.25)', fontFamily: 'DM Sans, sans-serif' }}
          >
            🇮🇳 +91
          </div>
          <input
            type="tel"
            placeholder="Required to continue"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
              setError('');
            }}
            className="flex-1 bg-transparent border-none outline-none text-white text-[16px] px-[14px] py-[14px] min-w-0 placeholder:text-[#666]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[14px] text-left">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-white text-[12.5px] font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          PHONE NUMBER <span className="text-[#02FF00]">*</span>
        </span>
        {error && (
          <span className="text-[#ff8080] text-[10.5px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Enter a valid number
          </span>
        )}
      </div>
      <div
        className="flex overflow-hidden rounded-[10px]"
        style={{
          border: error ? '1px solid #ff8080' : '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <div
          className="flex items-center gap-1.5 px-[14px] py-3 text-white text-[13px] flex-shrink-0"
          style={{ borderRight: '1px solid rgba(255,255,255,0.25)', fontFamily: 'DM Sans, sans-serif' }}
        >
          🇮🇳 +91
        </div>
        <input
          type="tel"
          placeholder="Required to continue"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
            setError('');
          }}
          className="flex-1 bg-transparent border-none outline-none text-white text-[13px] px-[14px] py-3 min-w-0 placeholder:text-[#666]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        />
      </div>
    </div>
  );
}

function CouponBox({
  copied,
  onCopy,
  variant = 'desktop',
}: {
  copied: boolean;
  onCopy: () => void;
  variant?: 'mobile' | 'desktop';
}) {
  if (variant === 'mobile') {
    return (
      <div
        className="flex justify-between items-center rounded-xl px-4 py-[14px] mb-[14px] text-left cursor-pointer select-none"
        style={{
          border: '2px dashed #02FF00',
          background: copied ? 'rgba(2,255,0,0.12)' : 'rgba(2,255,0,0.06)',
        }}
        onClick={onCopy}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onCopy();
        }}
      >
        <div className="min-w-0 pr-2">
          <div
            className="text-white text-[13px] tracking-[0.5px] mb-1"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            YOUR CODE
          </div>
          <div
            className="text-[#02FF00] font-bold text-[21px] tracking-[1px] mb-1"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {COUPON_CODE}
          </div>
          <div
            className="text-white text-[13px] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Paste this code at checkout to apply
          </div>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 flex-shrink-0 rounded-[9px] px-[14px] py-2.5 text-[13px] font-bold min-h-[44px]"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            background: copied ? '#02FF00' : 'rgba(2,255,0,0.15)',
            border: '1px solid rgba(2,255,0,0.5)',
            color: copied ? '#0a1f0a' : '#02FF00',
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={copied ? '#0a1f0a' : '#02FF00'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between items-center rounded-[10px] px-4 py-3 mb-5 text-left cursor-pointer select-none gap-2.5"
      style={{
        border: '1.5px dashed #02FF00',
        background: copied ? 'rgba(2,255,0,0.12)' : 'rgba(2,255,0,0.06)',
      }}
      onClick={onCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onCopy();
      }}
    >
      <div className="min-w-0">
        <div
          className="text-white text-[10px] tracking-[0.5px] mb-[3px]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          YOUR CODE
        </div>
        <div
          className="text-[#02FF00] font-bold text-[17px] tracking-[0.3px] mb-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {COUPON_CODE}
        </div>
        <div
          className="text-white text-[12px] font-medium"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Paste this code at checkout to apply
        </div>
      </div>
      <button
        type="button"
        className="flex items-center gap-[5px] flex-shrink-0 rounded-lg px-[13px] py-[9px] text-[11px] font-bold whitespace-nowrap"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          background: copied ? '#02FF00' : 'rgba(2,255,0,0.15)',
          border: '1px solid rgba(2,255,0,0.5)',
          color: copied ? '#0a1f0a' : '#02FF00',
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={copied ? '#0a1f0a' : '#02FF00'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        <span>{copied ? 'COPIED' : 'COPY'}</span>
      </button>
    </div>
  );
}

function CtaButton({
  isSubmitting,
  onClick,
  variant = 'desktop',
}: {
  isSubmitting: boolean;
  onClick: () => void;
  variant?: 'mobile' | 'desktop';
}) {
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isSubmitting}
        className="w-full rounded-xl flex items-center justify-center gap-2 cursor-pointer mb-[18px] min-h-[52px] disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          background: '#02FF00',
          color: '#0a1f0a',
          fontWeight: 900,
          fontSize: '16px',
          letterSpacing: '0.3px',
          padding: '17px',
          WebkitTextStroke: '0.4px #0a1f0a',
          whiteSpace: 'nowrap',
        }}
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            TAKING YOU TO CHECKOUT
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </>
        ) : (
          <>
            PLACE ORDER & SAVE ₹{TOTAL_SAVINGS.toLocaleString('en-IN')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="w-full rounded-[11px] flex items-center justify-center gap-[7px] cursor-pointer mb-[14px] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
      style={{
        fontFamily: 'DM Sans, sans-serif',
        background: '#02FF00',
        color: '#0a1f0a',
        fontWeight: 900,
        fontSize: '14px',
        letterSpacing: '0.3px',
        padding: '14px',
        WebkitTextStroke: '0.4px #0a1f0a',
      }}
    >
      {isSubmitting ? (
        <>
          TAKING YOU TO CHECKOUT
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </>
      ) : (
        <>
          PLACE ORDER & SAVE ₹{TOTAL_SAVINGS.toLocaleString('en-IN')}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </>
      )}
    </button>
  );
}

function SocialProof({ variant = 'desktop' }: { variant?: 'mobile' | 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="text-[#02FF00] text-[15px] tracking-[1px]">★★★★★</span>
        <span className="text-white text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          4.8/5 · Trusted by 248+ verified buyers
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-[#02FF00] text-[12px] tracking-[1px]">★★★★★</span>
      <span className="text-white text-[11px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        4.8/5 · Trusted by 248+ verified buyers
      </span>
    </div>
  );
}

function GiftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#02FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" />
      <path d="M12 8v13M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7M7.5 8a2.5 2.5 0 010-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 010 5" />
    </svg>
  );
}
