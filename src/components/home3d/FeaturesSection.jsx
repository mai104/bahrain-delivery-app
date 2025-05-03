import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const FeatureCard = ({ icon, title, description, delay, color }) => {
  const { darkMode } = useTheme();
  
  return (
    <motion.div 
      className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border ${darkMode ? 'border-gray-700/30' : 'border-gray-200/60'} p-6 overflow-hidden relative`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      {/* Background gradient */}
      <div className={`absolute -top-32 -right-16 w-64 h-64 rounded-full ${color} opacity-20 blur-3xl`}></div>
      
      {/* Icon */}
      <div className={`relative z-10 w-14 h-14 rounded-full ${color.replace('opacity-20 blur-3xl', '')} bg-opacity-20 flex items-center justify-center mb-5`}>
        <div className={`w-10 h-10 rounded-full ${color.replace('opacity-20 blur-3xl', '')} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { isArabic } = useLanguage();
  const { darkMode } = useTheme();
  
  // Texts based on language
  const texts = {
    sectionTitle: isArabic ? 'ميزات الخدمة' : 'Service Features',
    sectionSubtitle: isArabic 
      ? 'تجربة فريدة للحصول على المياه والغاز بخدمة استثنائية'
      : 'A unique experience for obtaining water and gas with exceptional service',
    
    fastDeliveryTitle: isArabic ? 'توصيل سريع' : 'Fast Delivery',
    fastDeliveryDesc: isArabic 
      ? 'نصل إلى باب منزلك في غضون 30-60 دقيقة في جميع أنحاء البحرين'
      : 'We reach your doorstep within 30-60 minutes throughout Bahrain',
    
    qualityGuaranteedTitle: isArabic ? 'جودة مضمونة' : 'Quality Guaranteed',
    qualityGuaranteedDesc: isArabic
      ? 'منتجات موثوقة 100% ومعتمدة من الجهات المختصة والرقابية'
      : '100% reliable products approved by relevant regulatory authorities',
    
    easyOrderingTitle: isArabic ? 'طلب سهل وسريع' : 'Easy Ordering',
    easyOrderingDesc: isArabic
      ? 'سهولة الطلب عبر التطبيق أو الموقع الإلكتروني أو الاتصال المباشر'
      : 'Easy ordering via our app, website, or direct call',
    
    securePaymentTitle: isArabic ? 'دفع آمن' : 'Secure Payment',
    securePaymentDesc: isArabic
      ? 'خيارات دفع متعددة وآمنة لتناسب احتياجاتك'
      : 'Multiple secure payment options to suit your needs',
    
    trackingTitle: isArabic ? 'تتبع الطلبات' : 'Order Tracking',
    trackingDesc: isArabic
      ? 'تتبع طلبك مباشرة لمعرفة وقت الوصول المتوقع'
      : 'Track your order directly to know the expected arrival time',
    
    supportTitle: isArabic ? 'دعم على مدار الساعة' : '24/7 Support',
    supportDesc: isArabic
      ? 'فريق دعم متخصص جاهز للمساعدة في أي وقت على مدار الساعة'
      : 'Specialized support team ready to help at any time, around the clock',
  };

  // Icons
  const icons = {
    fastDelivery: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    quality: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    easyOrdering: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    securePayment: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    tracking: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    support: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  };

  // Features array
  const features = [
    {
      icon: icons.fastDelivery,
      title: texts.fastDeliveryTitle,
      description: texts.fastDeliveryDesc,
      color: 'bg-blue-500',
      delay: 0.1,
    },
    {
      icon: icons.quality,
      title: texts.qualityGuaranteedTitle,
      description: texts.qualityGuaranteedDesc,
      color: 'bg-red-500',
      delay: 0.2,
    },
    {
      icon: icons.easyOrdering,
      title: texts.easyOrderingTitle,
      description: texts.easyOrderingDesc,
      color: 'bg-green-500',
      delay: 0.3,
    },
    {
      icon: icons.securePayment,
      title: texts.securePaymentTitle,
      description: texts.securePaymentDesc,
      color: 'bg-purple-500',
      delay: 0.4,
    },
    {
      icon: icons.tracking,
      title: texts.trackingTitle,
      description: texts.trackingDesc,
      color: 'bg-yellow-500',
      delay: 0.5,
    },
    {
      icon: icons.support,
      title: texts.supportTitle,
      description: texts.supportDesc,
      color: 'bg-indigo-500',
      delay: 0.6,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {texts.sectionTitle}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              {texts.sectionSubtitle}
            </p>
          </motion.div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 dark:bg-primary-dark/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-10 w-40 h-40 bg-secondary/10 dark:bg-secondary-dark/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;
