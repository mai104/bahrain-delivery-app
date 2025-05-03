import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const ServiceCard = ({ title, description, bgGradient, link, buttonClass }) => {
  const { isArabic } = useLanguage();
  
  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden shadow-xl ${bgGradient}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-white">
          {title}
        </h3>
        
        <p className="mb-8 text-white/90">
          {description}
        </p>
        
        <div className="flex justify-center">
          <Link to={link}>
            <button 
              className={buttonClass}
            >
              {isArabic ? 'اطلب الآن' : 'Order Now'}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { isArabic } = useLanguage();
  const { darkMode } = useTheme();
  
  // Texts based on language
  const texts = {
    servicesDesc: isArabic 
      ? 'نقدم خدمات توصيل سريعة وموثوقة في جميع أنحاء مملكة البحرين'
      : 'We provide fast and reliable delivery services throughout the Kingdom of Bahrain',
    waterService: isArabic ? 'خدمة توصيل المياه المعدنية' : 'Mineral Water Delivery Service',
    gasService: isArabic ? 'خدمة توصيل اسطوانات الغاز' : 'Gas Cylinders Delivery Service',
    waterDesc: isArabic 
      ? 'توصيل المياه المعدنية النقية بأحجام مختلفة إلى منزلك أو مكتبك في أي وقت'
      : 'Delivery of pure mineral water in different sizes to your home or office anytime',
    gasDesc: isArabic 
      ? 'خدمة توصيل اسطوانات الغاز المنزلية بمختلف الأحجام بأمان وسرعة'
      : 'Safe and fast delivery service for home gas cylinders in various sizes'
  };

  // Button styles as shown in the image
  const tealButton = "px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 bg-teal-400 hover:bg-teal-300 text-white";
  const blueButton = "px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 bg-blue-500 hover:bg-blue-400 text-white";

  return (
    <section className={`relative py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {texts.servicesDesc}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Water Service */}
          <ServiceCard 
            title={texts.waterService}
            description={texts.waterDesc}
            bgGradient="bg-gradient-to-r from-blue-600 to-blue-400"
            link="/services/water"
            buttonClass={blueButton}
          />
          
          {/* Gas Service */}
          <ServiceCard 
            title={texts.gasService}
            description={texts.gasDesc}
            bgGradient="bg-gradient-to-r from-teal-500 to-blue-600"
            link="/services/gas"
            buttonClass={tealButton}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
