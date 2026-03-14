import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { BlueprintsSection } from '@/components/sections/BlueprintsSection';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { DiscoverySection } from '@/components/sections/DiscoverySection';
import { getArticles } from '@/lib/data/articles';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <BlueprintsSection />
      <PurposeSection />
      <InsightsSection articles={articles.slice(0, 3)} />
      <DiscoverySection />
    </>
  );
}
