import React from 'react';
import HeroSection from '../components/home3d/HeroSection';
import ServicesSection from '../components/home3d/ServicesSection';
import FeaturesSection from '../components/home3d/FeaturesSection';
import BackgroundBubbles from '../components/home3d/BackgroundBubbles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const HomePage3D = () => {
  const { scrollYProgress } = useScroll();
  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background with animated water effect */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          style={{ y: parallaxBg }}
          className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-b from-gray-900 to-blue-900'
              : 'bg-gradient-to-b from-blue-50 to-sky-100'
          }`}
        />
        <BackgroundBubbles />
      </div>
      
      {/* Main Sections */}
      <HeroSection scrollYProgress={scrollYProgress} />
      <ServicesSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage3D;
