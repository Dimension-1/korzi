import VideoCarousel from '../components/Home/videoCarousel';
import ImageCarousel from '../components/Home/ImageCarousel';
import FoodJournalismSection from '../components/Home/FoodJournalismSection';
import RealFoodSection from '../components/Home/RealFoodSection';
import JoinFamSection from '../components/Home/JoinFamSection';
import PaymentBanner from '../components/Home/PaymentBanner';
import FaqSection from '../components/Home/Faq';
import Footer from '../components/Home/footer';

export default function HomePage() {
  return (
    <>
      {/* Header Text Section */}
      <div className="mb-4 ml-2 sm:ml-4 md:ml-6 lg:ml-12 xl:ml-16 mt-8 sm:mt-12 md:mt-10 lg:mt-14 xl:mt-16">
        <h1 className="text-2xl lg:text-3xl font-medium text-[var(--foreground)] mb-2 font-heading">
          Korzi
        </h1>
        <p className="text-lg lg:text-xl text-[var(--foreground)] font-body">
          MACHINES <span className="text-[var(--primary)]">FOR THE YOUNG</span>
        </p>
      </div>

      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/image.png"
            alt="Korzi RC Car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Content Overlay - Left Aligned */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-2xl px-8 lg:px-16 xl:px-20">
            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-[var(--foreground)] mb-4 font-body">
              Celebrating Innovation in Technology
            </p>
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-[var(--foreground)] font-heading">
              MACHINES FOR THE{' '}
              <span className="text-[var(--primary)]">YOUNG</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg lg:text-xl text-[var(--text-secondary)] mb-8 max-w-xl font-body">
              Discover the world of RC cars, drones, and robotics. Build, play, and learn with cutting-edge technology designed for the next generation.
            </p>

            {/* Watch Button */}
            <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 flex items-center gap-3 font-body">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              WATCH
            </button>
          </div>
        </div>
      </div>
      
      <VideoCarousel />
      <FaqSection />
      <ImageCarousel />
      <FoodJournalismSection />
      <RealFoodSection />
      <JoinFamSection />
      <PaymentBanner />
      <Footer />
    </>
  );
}
