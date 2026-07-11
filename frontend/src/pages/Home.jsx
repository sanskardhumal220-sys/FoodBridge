import { useTranslation } from 'react-i18next';
import HomeHero from '../components/HomeHero';
import HomeStats from '../components/HomeStats';
import HomeTimeline from '../components/HomeTimeline';
import HomeAIAnalyzer from '../components/HomeAIAnalyzer';
import HomeMap from '../components/HomeMap';
import HomeFeatures from '../components/HomeFeatures';
import HomeTestimonials from '../components/HomeTestimonials';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white dark:bg-[#0a0a0a] min-h-screen">
      <HomeHero t={t} />
      <HomeStats />
      <HomeTimeline />
      <HomeAIAnalyzer />
      <HomeMap />
      <HomeFeatures />
      <HomeTestimonials />
    </div>
  );
};

export default Home;