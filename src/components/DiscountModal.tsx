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
    const flash = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    const legacyCopy = () => {
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
      flash();
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(COUPON_CODE).then(flash, legacyCopy);
    } else {
      legacyCopy();
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

  const ended = (timeLeft?.m ?? 0) <= 0 && (timeLeft?.s ?? 0) <= 0;
  const left = `00 : ${pad(timeLeft?.m ?? 0)} : ${pad(timeLeft?.s ?? 0)}`;

  const shared = {
    phone,
    setPhone,
    error,
    setError,
    copied,
    onCopy: handleCopyCode,
    isSubmitting,
    onSubmit: handleSubmit,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Grand festive offer"
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* ─── MOBILE / TABLET: "Festive gift" design (390px card) ─────────── */}
      <div
        className="flex flex-col lg:hidden relative w-full max-w-[390px] max-h-[94vh] overflow-y-auto overflow-x-hidden"
        style={{ ...CARD, padding: '14px 18px 16px', gap: 9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <img src={LOGO} alt="Korzi" style={{ width: 130, height: 26, display: 'block' }} />
          <CloseButton onClick={onClose} />
        </div>

        <div className="flex flex-col items-center text-center" style={{ gap: 8 }}>
          <div style={BADGE}>GRAND FESTIVE OFFER</div>
          <h2 style={{ ...BEBAS, margin: 0, fontWeight: 400, fontSize: 38, lineHeight: 0.95 }}>
            💰 Save <span style={{ color: GREEN }}>₹1,300</span> Today
          </h2>
        </div>

        <Countdown ended={ended} left={left} size={22} />

        <div
          className="flex items-center justify-center"
          style={{
            height: 92,
            gap: 10,
            background: 'radial-gradient(closest-side, #1f3a1f 0%, #101010 100%)',
            borderRadius: 16,
          }}
        >
          <ProductCombo carWidth={150} batteryWidth={70} plusSize={28} />
        </div>

        <Benefits iconSize={26} />
        <CodeBox {...shared} variant="mobile" />
        <PhoneField {...shared} id="offer-phone-m" />
        <CtaButton {...shared} compact />
        <Rating compact />
      </div>

      {/* ─── DESKTOP: two-column 880×540 design ──────────────────────────── */}
      <div
        className="hidden lg:grid relative w-[880px] max-w-full max-h-[94vh] overflow-y-auto"
        style={{ ...CARD, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: hero */}
        <div
          className="flex flex-col items-center"
          style={{
            gap: 8,
            padding: '28px 28px 30px',
            background: 'radial-gradient(80% 60% at 50% 58%, #1f3a1f 0%, #101010 100%)',
            borderRight: '1px solid #1f2a1f',
          }}
        >
          <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
            <img src={LOGO} alt="Korzi" style={{ width: 150, height: 30, display: 'block' }} />
            <div style={BADGE}>GRAND FESTIVE OFFER</div>
            <h2 style={{ ...BEBAS, margin: 0, fontWeight: 400, fontSize: 52, lineHeight: 0.95 }}>
              💰 SAVE <span style={{ color: GREEN }}>₹1,300</span> TODAY
            </h2>
            <Countdown ended={ended} left={left} size={24} />
          </div>
          <div className="flex items-center justify-center flex-grow" style={{ gap: 12 }}>
            <ProductCombo carWidth={240} batteryWidth={96} plusSize={30} />
          </div>
        </div>

        {/* Right: offer + form */}
        <div className="relative flex flex-col justify-center" style={{ gap: 14, padding: '68px 32px 26px' }}>
          <div className="absolute" style={{ top: 14, right: 14 }}>
            <CloseButton onClick={onClose} />
          </div>
          <Benefits iconSize={26} />
          <CodeBox {...shared} variant="desktop" />
          <PhoneField {...shared} id="offer-phone-d" />
          <CtaButton {...shared} />
          <Rating />
        </div>
      </div>
    </div>
  );
}

/* ─── Design tokens (from the V3 design files) ─────────────────────────────── */

const GREEN = '#02FF00';
const DARK = '#101010';
const LOGO = '/assets/offer/korzi-logo.webp';
const BEBAS: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
const DM: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif" };
const CARD: React.CSSProperties = {
  ...DM,
  boxSizing: 'border-box',
  background: DARK,
  color: '#FFFFFF',
  border: '1px solid #2a2a2a',
  borderRadius: 24,
};
const BADGE: React.CSSProperties = {
  ...BEBAS,
  fontSize: 24,
  letterSpacing: 3,
  color: DARK,
  background: GREEN,
  padding: '4px 14px 2px',
  borderRadius: 4,
};

/* ─── Shared subcomponents ─────────────────────────────────────────────────── */

type SharedProps = {
  phone: string;
  setPhone: (v: string) => void;
  error: string;
  setError: (v: string) => void;
  copied: boolean;
  onCopy: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="flex items-center justify-center flex-shrink-0 hover:border-white/60 transition-colors"
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        background: 'transparent',
        border: '1px solid #3a3a3a',
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 3l10 10M13 3L3 13" />
      </svg>
    </button>
  );
}

function Countdown({ ended, left, size }: { ended: boolean; left: string; size: number }) {
  return (
    <div className="flex justify-center items-center" style={{ gap: 8, color: '#FF8A80' }} aria-live="off">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" />
      </svg>
      {ended ? (
        <span style={{ ...BEBAS, fontSize: size }}>OFFER HAS ENDED</span>
      ) : (
        <>
          <span style={{ ...BEBAS, fontSize: size }}>OFFER ENDS IN ·</span>
          <span style={{ ...BEBAS, fontSize: size + 2, color: '#FFFFFF', letterSpacing: 1 }} className="tabular-nums">
            {left}
          </span>
          <span style={{ ...BEBAS, fontSize: size }}>LEFT</span>
        </>
      )}
    </div>
  );
}

function ProductCombo({ carWidth, batteryWidth, plusSize }: { carWidth: number; batteryWidth: number; plusSize: number }) {
  return (
    <>
      <img
        src="/assets/offer/apex-k01.webp"
        alt="Apex Drive K-01 RC buggy"
        style={{ width: carWidth, height: 'auto', display: 'block', minWidth: 0 }}
      />
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: plusSize, height: plusSize, borderRadius: plusSize / 2, background: GREEN, color: DARK }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M8 3v10M3 8h10" />
        </svg>
      </div>
      <div className="flex flex-col items-center flex-shrink-0" style={{ gap: 6 }}>
        <img
          src="/assets/offer/battery.webp"
          alt="Spare battery pack"
          style={{ width: batteryWidth, height: 'auto', display: 'block' }}
        />
        <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, letterSpacing: 0.5 }}>FREE BATTERY</div>
      </div>
    </>
  );
}

function Benefits({ iconSize }: { iconSize: number }) {
  const Check = () => (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 2, background: GREEN, color: DARK }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </div>
  );
  return (
    <div
      className="flex flex-col"
      style={{ gap: 8, border: `1.5px solid ${GREEN}`, borderRadius: 16, background: '#121812', padding: '12px 14px' }}
    >
      <div className="flex items-center" style={{ gap: 12 }}>
        <Check />
        <div style={{ fontSize: 15 }}>
          <b>₹600 off</b> – now <b>₹5,520</b> <s style={{ color: '#8a8a8a' }}>₹6,120</s>
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <Check />
        <div style={{ fontSize: 15 }}>
          <b>Free spare battery</b> (₹700 value) – twice the playtime
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <Check />
        <div style={{ fontSize: 15 }}>
          <b>4WD Semi Hobby Grade Basher</b>
        </div>
      </div>
    </div>
  );
}

function CodeBox({ copied, onCopy, variant }: SharedProps & { variant: 'mobile' | 'desktop' }) {
  const mobile = variant === 'mobile';
  return (
    <div
      className="flex justify-between items-center"
      style={{
        gap: 14,
        border: `2px dashed ${GREEN}`,
        borderRadius: 16,
        background: copied ? '#142814' : '#0f170f',
        padding: mobile ? '10px 14px' : '12px 16px',
        transition: 'background .2s',
      }}
    >
      <div className="flex flex-col min-w-0" style={{ gap: mobile ? 4 : 3 }}>
        <div style={{ fontSize: mobile ? 13 : 12, letterSpacing: 1 }}>YOUR CODE</div>
        <div style={{ fontWeight: 700, fontSize: mobile ? 24 : 26, letterSpacing: 1, color: GREEN, lineHeight: 1.1 }}>
          {COUPON_CODE}
        </div>
        <div style={{ fontSize: mobile ? 12 : 13, lineHeight: 1.35 }}>
          {mobile ? 'Copy & paste on the next page' : 'Copy & paste on the next page to save ₹1,300'}
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="flex items-center flex-shrink-0"
        style={{
          ...DM,
          gap: 8,
          height: 44,
          padding: '0 16px',
          borderRadius: 10,
          border: `1.5px solid ${GREEN}`,
          background: copied ? GREEN : '#142814',
          color: copied ? DARK : GREEN,
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="5" y="5" width="9" height="9" rx="2" />
          <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
        </svg>
        {copied ? 'COPIED' : 'COPY'}
      </button>
    </div>
  );
}

function PhoneField({ phone, setPhone, error, setError, onSubmit, id }: SharedProps & { id: string }) {
  const border = error ? '#FF8A80' : GREEN;
  return (
    <div className="flex flex-col" style={{ gap: 6 }}>
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} style={{ fontSize: 14, fontWeight: 700 }}>
          WhatsApp Number
        </label>
        {error && (
          <span role="alert" style={{ fontSize: 12, color: '#FF8A80' }}>
            {error}
          </span>
        )}
      </div>
      <div
        className="flex overflow-hidden"
        style={{ border: `1.5px solid ${border}`, borderRadius: 12, height: 50, background: '#121812' }}
      >
        <span className="flex items-center" style={{ padding: '0 14px', borderRight: `1.5px solid ${border}`, fontSize: 16 }}>
          +91
        </span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
            setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
          aria-invalid={!!error}
          className="flex-grow min-w-0 placeholder:text-[#8a8a8a]"
          style={{ ...DM, background: 'transparent', border: 0, color: '#FFFFFF', fontSize: 16, padding: '0 14px', outline: 'none' }}
        />
      </div>
    </div>
  );
}

function CtaButton({ isSubmitting, onSubmit, compact }: SharedProps & { compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={isSubmitting}
      className="flex items-center justify-center flex-shrink-0 w-full hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
      style={{
        ...BEBAS,
        gap: 10,
        minHeight: compact ? 52 : 58,
        borderRadius: 16,
        border: 0,
        background: GREEN,
        color: DARK,
        fontSize: compact ? 25 : 28,
        letterSpacing: 1,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {isSubmitting ? (
        <>
          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          <span>Taking you to checkout</span>
        </>
      ) : (
        <>
          <span>Place Order &amp; Save ₹{TOTAL_SAVINGS.toLocaleString('en-IN')}</span>
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </>
      )}
    </button>
  );
}

function Rating({ compact }: { compact?: boolean }) {
  const star = 'M8 1l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.9 3.6 14.4l1.1-4.9L.9 6.1l5-.5z';
  return (
    <div className="flex justify-center items-center" style={{ gap: 8, fontSize: compact ? 12 : 13, whiteSpace: 'nowrap' }}>
      <svg width="84" height="16" viewBox="0 0 84 16" role="img" aria-label="Rated 4.8 out of 5">
        <g fill={GREEN}>
          {[0, 17, 34, 51, 68].map((x) => (
            <path key={x} transform={`translate(${x} 0)`} d={star} />
          ))}
        </g>
      </svg>
      <span>4.8/5 · Trusted by 248+ verified buyers</span>
    </div>
  );
}
