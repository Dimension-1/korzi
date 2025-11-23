import SupportHero from '../components/Support/SupportHero';
import TroubleshootingSection from '../components/Support/TroubleshootingSection';
import WarrantyServiceSection from '../components/Support/WarrantyServiceSection';
import Footer from '../components/Home/footer';

export default function SupportPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      <SupportHero />
      <TroubleshootingSection />
      <WarrantyServiceSection />
      <Footer />
    </div>
  );
}
