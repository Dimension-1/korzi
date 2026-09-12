export default function MarqueeBar() {
    const features = [
      '4WD Drive Control',
      'Up to 25 km/h Speed',
      'Rechargeable Battery',
      'BIS Certified Safe',
      'Built Tough for Real Play',
      'Local Service & Support',
      'Built in India',
      'Tested for Chaos',
      'Grip, Guts, Glory',
    ];
  //ok
    return (
      <div className="bg-[#02FF00] py-2 overflow-hidden -mt-24 relative z-0">
        <div className="flex animate-marquee-mobile md:animate-marquee whitespace-nowrap">
          {[...features, ...features, ...features, ...features].map((feature, index) => (
            <span key={index} className="flex items-center">
              <span
                className="inline-block px-2 text-black"
                style={{
                  fontFamily: 'Bebas Neue',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '29px',
                  color: '#000000'
                }}
              >
                {feature}
              </span>
              {index < features.length * 4 - 1 && (
                <span className="text-black px-2 text-2xl">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
  