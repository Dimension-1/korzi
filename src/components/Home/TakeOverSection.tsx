import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const S3_BASE = 'https://korzi-website-assets-2026.s3.amazonaws.com/assets/testimonials';

const testimonialVideos = [
  `${S3_BASE}/Testimonial_1.mp4`,
  `${S3_BASE}/Testimonial_2.mp4`,
  `${S3_BASE}/Testimonial_3.mp4`,
  `${S3_BASE}/Testimonial_4.mp4`,
  `${S3_BASE}/Testimonial_5.mp4`,
  `${S3_BASE}/Testimonial_6.mp4`,
];

export default function TakeOverSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // FIX: Track the single currently playing video index (or null if none are playing)
  const [playingIndex, setPlayingIndex] = useState<number | null>(0);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const allIndexes = testimonialVideos.map((_, i) => i);
    if (isDesktop) {
      setVisible(new Set(allIndexes));
    } else {
      setTimeout(()=>{
        setVisible(new Set(allIndexes));
      },300)
    
    }
  }, []);

  // Handle auto-playing the single default video once it becomes visible
  useEffect(() => {
    if (visible.has(0) && playingIndex === 0) {
      videoRefs.current[0]?.play().catch(() => {});
    }
  }, [visible, playingIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.nativeEvent as PointerEvent).pointerType === 'touch' || 
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollLeft = percentage * maxScroll;
  };

  // FIX: Single video toggle handler
  const handleVideoTap = (index: number) => {
    const targetVideo = videoRefs.current[index];
    if (!targetVideo) return;

    if (playingIndex === index) {
      // If clicking the already playing video, pause it
      targetVideo.pause();
      setPlayingIndex(null);
    } else {
      // 1. Pause every single other video first
      videoRefs.current.forEach((video, idx) => {
        if (video && idx !== index) {
          video.pause();
        }
      });

      // 2. Play the target video and update state
      targetVideo.play().catch(() => {});
      setPlayingIndex(index);
    }
  };

  return (
    <section className="bg-black py-5 md:py-16">
      <div className="max-w-[95%] 2xl:max-w-[90%] mx-auto px-8">
        {/* Title */}
        <h2 
          className="text-center uppercase mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl"
          style={{
            fontFamily: 'Bebas Neue',
          }}
        >
          WATCH KORZI TAKE OVER
        </h2>

        <p
          className="text-center mb-12 mx-auto bg-clip-text text-transparent"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '24px',
            lineHeight: '30px',
            background: 'linear-gradient(100.06deg, #FFFFFF 1.37%, #999999 57.42%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Built for driveways, terraces, streets, parks, and dirt tracks.<br />
          Wherever there's space, the K-01 makes motion happen.
        </p>

        {/* Video Carousel */}
        <div 
          ref={scrollContainerRef}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-scroll mb-8 pb-4 scrollbar-hide"
        >
          {testimonialVideos.map((src, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className="flex-shrink-0 w-[calc((100%-16px)/2)] md:w-[calc((100%-64px)/5)] h-[280px] md:h-[400px] bg-zinc-900 relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleVideoTap(index)}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={visible.has(index) ? src : undefined}
                className={`w-full h-full object-cover transition-opacity duration-300 ${visible.has(index) ? 'opacity-100' : 'opacity-0'}`}
                muted
                loop
                playsInline
              />

              {/* Show skeleton loader until the video is visible */}
              {!visible.has(index) && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
              )}

              {/* FIX: Check playing state using single index matching */}
              {playingIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Shop Now Button */}
        <div className="flex justify-center mb-20">
          <button className="bg-[#3A3A3A] text-white px-8 py-3 flex items-center gap-3 border-l-4 border-[#02FF00] group relative overflow-hidden">
            <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300" style={{ fontFamily: 'DM Sans', fontSize: '14px', letterSpacing: '0.05em' }}>
              SHOP NOW
            </span>
            <ArrowUpRight className="relative z-10 w-5 h-5 text-[#02FF00] group-hover:text-black transition-colors duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}