interface PaymentIconsProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'stacked';
  className?: string;
}

const heights = { sm: 20, md: 28, lg: 32 };

const compactNames = ['Visa', 'Mastercard', 'Google Pay', 'PhonePe'];

const imgIcons = [
  { name: 'Visa', src: '/assets/payment/visa.png' },
  { name: 'Mastercard', src: '/assets/payment/mastercard.png' },
  { name: 'Google Pay', src: '/assets/payment/gpay.png' },
  { name: 'Paytm', src: '/assets/payment/paytm.png' },
];

function PhonePeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 680 680" xmlns="http://www.w3.org/2000/svg">
      <circle cx="339.53" cy="339.53" fill="#5f259f" r="339.46"/>
      <path d="m493.6 250.94c0-13.27-11.38-24.65-24.65-24.65h-45.51l-104.3-119.47c-9.48-11.38-24.65-15.17-39.82-11.38l-36.03 11.38c-5.69 1.9-7.59 9.48-3.79 13.27l113.78 108.1h-172.59c-5.69 0-9.48 3.79-9.48 9.48v18.96c0 13.27 11.38 24.65 24.65 24.65h26.55v91.03c0 68.27 36.03 108.1 96.72 108.1 18.96 0 34.14-1.9 53.1-9.48v60.69c0 17.07 13.27 30.34 30.34 30.34h26.55c5.69 0 11.38-5.69 11.38-11.38v-271.19h43.62c5.69 0 9.48-3.79 9.48-9.48zm-121.37 163.09c-11.38 5.69-26.55 7.59-37.93 7.59-30.34 0-45.51-15.17-45.51-49.31v-91.03h83.44z" fill="#fff"/>
    </svg>
  );
}

export default function PaymentIcons({ size = 'md', variant = 'full', className = '' }: PaymentIconsProps) {
  const h = heights[size];

  if (variant === 'stacked') {
    const stackIcons = imgIcons.filter(i => compactNames.includes(i.name));
    const overlap = Math.round(h * 0.3);

    return (
      <div className={`flex items-center ${className}`} style={{ paddingLeft: `${overlap}px` }}>
        {stackIcons.map((icon, i) => (
          <img
            key={icon.name}
            src={icon.src}
            alt={icon.name}
            className="rounded-full border border-white/40 bg-white shadow-sm"
            style={{
              height: `${h}px`,
              width: `${h}px`,
              objectFit: 'contain',
              marginLeft: `-${overlap}px`,
              zIndex: i,
              position: 'relative',
              padding: '2px',
            }}
          />
        ))}
        <div
          className="rounded-full overflow-hidden border border-white/40 shadow-sm"
          style={{
            height: `${h}px`,
            width: `${h}px`,
            marginLeft: `-${overlap}px`,
            zIndex: stackIcons.length,
            position: 'relative',
          }}
        >
          <PhonePeIcon size={h} />
        </div>
      </div>
    );
  }

  const visibleImgIcons = variant === 'compact'
    ? imgIcons.filter(i => compactNames.includes(i.name))
    : imgIcons;

  const showPhonePe = variant === 'full' || compactNames.includes('PhonePe');

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {visibleImgIcons.map(icon => (
        <img
          key={icon.name}
          src={icon.src}
          alt={icon.name}
          style={{ height: `${h}px`, width: `${h}px`, objectFit: 'contain' }}
        />
      ))}
      {showPhonePe && <PhonePeIcon size={h} />}
    </div>
  );
}
