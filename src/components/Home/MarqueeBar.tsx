export default function MarqueeBar() {
    const features = [
      '4WD DRIVE CONTROL',
      'UP TO 25 KM/H SPEED',
      'RECHARGEABLE BATTERY',
      'BIS CERTIFIED SAFE',
      'BUILT FOR REAL PLAY',
      'LOCAL SERVICE & SUPPORT',
      'BUILT IN INDIA',
      'TESTED FOR CHAOS',
      'GRIP, GUTS & GO',
    ];
  
    return (
      <div className="bg-[#02FF00] py-4 overflow-hidden -mt-24 relative z-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...features, ...features].map((feature, index) => (
            <span
              key={index}
              className="inline-block px-8 text-black font-heading text-lg uppercase"
            >
              {feature} |
            </span>
          ))}
        </div>
      </div>
    );
  }
  