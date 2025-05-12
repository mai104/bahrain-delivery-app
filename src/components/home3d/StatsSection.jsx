/**
 * StatsSection
 * 
 * CURRENTLY UNUSED
 * 
 * Purpose: Displays key statistics about the delivery service with animated counters
 * Future Use: Will be integrated into the HomePage3D to showcase business metrics
 * 
 * Note: This component was designed to highlight key performance metrics of the
 * delivery service. It includes animated statistics and a wave separator effect.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const StatsSection = () => {
  const { isArabic } = useLanguage();
  const { darkMode } = useTheme();
  
  // Texts based on language
  const texts = {
    happyCustomers: isArabic ? 'عملاء سعداء' : 'Happy Customers',
    areasCovered: isArabic ? 'منطقة تغطية' : 'Areas Covered',
    avgDeliveryTime: isArabic ? 'متوسط وقت التوصيل' : 'Avg. Delivery Time',
  };

  const stats = [
    { value: '15k+', label: texts.happyCustomers },
    /* Removing the 30+ as requested */
    { value: '30min', label: texts.avgDeliveryTime },
  ];

  return (
    <section className={`relative py-8 ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center px-4 py-2 m-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-light mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={`${darkMode ? 'text-gray-800' : 'text-white'} w-full h-auto`}>
          <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default StatsSection;
