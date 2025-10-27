import VideoCarousel from '../components/Home/videoCarousel';
import ImageCarousel from '../components/Home/ImageCarousel';
import FoodJournalismSection from '../components/Home/FoodJournalismSection';
import RealFoodSection from '../components/Home/RealFoodSection';
import JoinFamSection from '../components/Home/JoinFamSection';
import PaymentBanner from '../components/Home/PaymentBanner';
import FaqSection from '../components/Home/Faq';
import Footer from '../components/Home/footer';
import RollingTagsBanner from '../components/Home/RollingTagsBanner';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full pt-6">
        <div className="w-full"> 
           <p className="text-3xl font-bold text-[var(--foreground)] ml-8 pb-4">Korzi Toys</p>
        </div>
                {/* Background Image */}
        <div className="relative h-[80vh] w-full lg:w-[90%] ml-auto overflow-hidden">
          <img
            src="/image.png"
            alt="Korzi RC Car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-12">
              {/* Subtitle */}
              <p className="text-base lg:text-lg text-[var(--foreground)] mb-4 font-body">
                Celebrating Innovation in Technology
              </p>
              
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl mb-6 text-[var(--foreground)] font-heading leading-tight">
                MACHINES FOR THE{' '}
                <span className="text-[var(--primary)]">YOUNG</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-[var(--foreground)] mb-8 max-w-2xl font-body leading-relaxed">
                Discover the world of RC cars, drones, and robotics. Build, play, and learn with cutting-edge technology designed for the next generation.
              </p>

              {/* Action Button */}
              <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-black px-8 py-4 rounded-lg text-lg transition-colors duration-300 flex items-center gap-3 font-body">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                WATCH
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      <ImageCarousel />
      <RollingTagsBanner />
      <RealFoodSection />
      <VideoCarousel />      
      <FaqSection />      
      <FoodJournalismSection />      
      <JoinFamSection />
      <PaymentBanner />
      <Footer />
    </>
  );
}
