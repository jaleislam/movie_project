import Hero from "../components/Hero";
import TrendingSection from "../components/TrendingSection";
import AwardsBanner from "../components/AwardsBanner";
import MoviesSection from "../components/MoviesSection";
import SeriesSection from "../components/SeriesSection";
import PricingSection from "../components/PricingSection";
import CollectionSection from "../components/CollectionSection";
import ContinueWatchingSection from "../components/ContinueWatchingSection";
import FaqSection from "../components/FaqSection";
import StudiosSection from "../components/StudiosSection";
import "../styles/hero.scss";
import "../styles/movieSections.scss";
import "../styles/extraSections.scss";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingSection />
      <AwardsBanner />
      <MoviesSection />
      <SeriesSection />
      <PricingSection />
      <CollectionSection />
      <ContinueWatchingSection />
      <FaqSection />
      <StudiosSection />
    </div>
  );
};

export default Home;