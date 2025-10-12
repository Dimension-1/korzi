import React from 'react';

const CertificationsScroll: React.FC = () => {
  const certifications = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&crop=center"
    }
  ];

  return (
    <div className="py-12 bg-[var(--background)] overflow-hidden">
      {/* Auto-scrolling certifications */}
      <div className="relative">
        <div className="flex animate-scroll space-x-8">
          {/* First set */}
          {certifications.map((cert) => (
            <div
              key={`first-${cert.id}`}
              className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden shadow-lg"
            >
              <img 
                src={cert.image} 
                alt="Certification"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {certifications.map((cert) => (
            <div
              key={`second-${cert.id}`}
              className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden shadow-lg"
            >
              <img 
                src={cert.image} 
                alt="Certification"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsScroll;
