import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { BlueprintsSection } from '@/components/sections/BlueprintsSection';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { DiscoverySection } from '@/components/sections/DiscoverySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <BlueprintsSection />
      <PurposeSection />
      <InsightsSection />
      <DiscoverySection />
    </>
  );
}
