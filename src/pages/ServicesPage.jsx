import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import Card, { CardTitle, CardContent } from '../components/ui/Card';

const ServicesPage = () => {
  const { isArabic } = useLanguage();
  
  // النصوص حسب اللغة
  const texts = {
    pageTitle: isArabic ? 'خدماتنا' : 'Our Services',
    pageDescription: isArabic 
      ? 'اكتشف خدماتنا المميزة للتوصيل السريع في جميع أنحاء البحرين'
      : 'Discover our premium delivery services throughout Bahrain',
    waterService: isArabic ? 'خدمة توصيل المياه المعدنية' : 'Mineral Water Delivery Service',
    gasService: isArabic ? 'خدمة توصيل اسطوانات الغاز' : 'Gas Cylinders Delivery Service',
    waterDesc: isArabic
      ? 'نوفر خدمة توصيل المياه المعدنية النقية بأحجام مختلفة لتلبية احتياجاتك اليومية. يمكنك طلب المياه المعدنية للمنزل أو المكتب وستصلك في أسرع وقت ممكن.'
      : 'We provide delivery service for pure mineral water in different sizes to meet your daily needs. You can order mineral water for your home or office, and it will reach you as quickly as possible.',
    gasDesc: isArabic
      ? 'خدمة توصيل اسطوانات الغاز المنزلية بمختلف الأحجام، نضمن لك توصيل الاسطوانات بأمان تام وبأسعار مناسبة. خدمة على مدار الساعة لضمان تلبية احتياجاتك دون تأخير.'
      : 'Home gas cylinder delivery service in various sizes. We guarantee the delivery of cylinders with complete safety and at reasonable prices. 24/7 service to ensure your needs are met without delay.',
    features: isArabic ? 'المميزات' : 'Features',
    orderNow: isArabic ? 'اطلب الآن' : 'Order Now',
    waterFeatures: [
      {
        title: isArabic ? 'مياه معدنية نقية' : 'Pure Mineral Water',
        description: isArabic ? 'نقدم مياه معدنية نقية ومفلترة 100%' : '100% pure and filtered mineral water'
      },
      {
        title: isArabic ? 'أحجام متعددة' : 'Multiple Sizes',
        description: isArabic ? 'متوفر بعبوات مختلفة الأحجام لتناسب احتياجاتك' : 'Available in different sizes to suit your needs'
      },
      {
        title: isArabic ? 'توصيل سريع' : 'Fast Delivery',
        description: isArabic ? 'توصيل في نفس اليوم في معظم مناطق البحرين' : 'Same-day delivery in most areas of Bahrain'
      },
      {
        title: isArabic ? 'اشتراكات منتظمة' : 'Regular Subscriptions',
        description: isArabic ? 'خطط اشتراك بأسعار تنافسية' : 'Subscription plans at competitive prices'
      }
    ],
    gasFeatures: [
      {
        title: isArabic ? 'اسطوانات آمنة' : 'Safe Cylinders',
        description: isArabic ? 'اسطوانات مطابقة لمعايير السلامة' : 'Cylinders compliant with safety standards'
      },
      {
        title: isArabic ? 'أحجام متنوعة' : 'Various Sizes',
        description: isArabic ? 'متوفر بأحجام مختلفة للمنازل والمطاعم' : 'Available in different sizes for homes and restaurants'
      },
      {
        title: isArabic ? 'خدمة طوارئ' : 'Emergency Service',
        description: isArabic ? 'توصيل عاجل خلال ساعات لحالات الطوارئ' : 'Urgent delivery within hours for emergencies'
      },
      {
        title: isArabic ? 'خدمة استبدال' : 'Exchange Service',
        description: isArabic ? 'استبدال الاسطوانات الفارغة بأخرى ممتلئة' : 'Exchange empty cylinders for full ones'
      }
    ]
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* ترويسة الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {texts.pageTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {texts.pageDescription}
          </p>
        </div>

        {/* الخدمات */}
        <div className="space-y-12">
          {/* خدمة توصيل المياه */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="/images/water-service-large.jpg" 
                  alt={texts.waterService} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
                  {texts.waterService}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {texts.waterDesc}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {texts.features}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {texts.waterFeatures.map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-primary dark:text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ms-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/services/water">
                  <Button variant="primary" size="lg">
                    {texts.orderNow}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* خدمة توصيل اسطوانات الغاز */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex flex-row-reverse">
              <div className="md:w-2/5">
                <img 
                  src="/images/gas-service-large.jpg" 
                  alt={texts.gasService} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-secondary dark:text-secondary-dark mb-4">
                  {texts.gasService}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {texts.gasDesc}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {texts.features}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {texts.gasFeatures.map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-secondary dark:text-secondary-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ms-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/services/gas">
                  <Button variant="secondary" size="lg">
                    {texts.orderNow}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
        
        {/* قسم استفسار */}
        <div className="mt-16 bg-primary/10 dark:bg-primary-dark/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {isArabic ? 'هل لديك أسئلة؟' : 'Have Questions?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {isArabic 
              ? 'نحن هنا للمساعدة! إذا كان لديك أي استفسارات حول خدماتنا، لا تتردد في التواصل معنا.'
              : 'We\'re here to help! If you have any inquiries about our services, feel free to contact us.'}
          </p>
          <Link to="/contact">
            <Button variant="primary">
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
