import { lazy, Suspense } from 'react';
import HeroSection from '../components/Home/HeroSection';
import SpecsSection from '../components/Home/SpecsSection';
import ApexDriveSection from '../components/Home/ApexDriveSection';
import MarqueeBar from '../components/Home/MarqueeBar';
import DetailCarousel from '../components/Home/DetailCarousel';
import ManufacturingSection from '../components/Home/Services';
import EllipseTransition from '../components/Home/EllipseTransition';
import CarAnimation from '../components/Home/CarAnimation';

const MissionSection = lazy(() => import('../components/Home/MissionSection'));
const FaqSection = lazy(() => import('../components/Home/Faq'));
const InsightsSection = lazy(() => import('../components/Home/InsightsSection'));
const JoinFamSection = lazy(() => import('../components/Home/JoinFamSection'));
const Footer = lazy(() => import('../components/Home/footer'));

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <HeroSection />
      <SpecsSection />
      <ApexDriveSection />
      <div className="hidden md:block">
        <MarqueeBar />
      </div>
      <DetailCarousel />
      <div className="relative">
        <ManufacturingSection />
        <EllipseTransition />
      </div>
      <CarAnimation />
      <Suspense fallback={null}>
        <MissionSection />
        <FaqSection />
        <InsightsSection />
        <JoinFamSection />
        <Footer />
      </Suspense>
    </div>
  );
}
