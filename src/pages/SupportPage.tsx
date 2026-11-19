import SupportHero from '../components/Support/SupportHero';
import TroubleshootingSection from '../components/Support/TroubleshootingSection';
import WarrantyServiceSection from '../components/Support/WarrantyServiceSection';
import SafetyCareSection from '../components/Support/SafetyCareSection';
import ContactSection from '../components/Support/ContactSection';
import Footer from '../components/Home/footer';

export default function SupportPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      <SupportHero />
      <TroubleshootingSection />
      <WarrantyServiceSection />
      <SafetyCareSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
