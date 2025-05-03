import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import HeroSlider from '../components/ui/HeroSlider';

// بيانات تجريبية للمنتجات
const dummyProducts = [
  {
    id: 1,
    name: 'مياه معدنية - عبوة كبيرة',
    nameEn: 'Mineral Water - Large Bottle',
    description: 'مياه معدنية نقية، عبوة 18 لتر مناسبة للاستخدام المنزلي',
    descriptionEn: 'Pure mineral water, 18-liter bottle suitable for home use',
    price: 1.5,
    oldPrice: 1.8,
    discount: 16,
    image: '/images/water-large.jpg',
    category: 'water'
  },
  {
    id: 2,
    name: 'مياه معدنية - عبوة صغيرة (كرتون)',
    nameEn: 'Mineral Water - Small Bottles (Carton)',
    description: 'كرتون مياه معدنية، 24 عبوة × 330 مل',
    descriptionEn: 'Carton of mineral water, 24 bottles × 330 ml',
    price: 3.2,
    oldPrice: null,
    discount: 0,
    image: '/images/water-small.jpg',
    category: 'water'
  },
  {
    id: 3,
    name: 'اسطوانة غاز منزلية كبيرة',
    nameEn: 'Large Home Gas Cylinder',
    description: 'اسطوانة غاز منزلية كبيرة سعة 22 كجم',
    descriptionEn: 'Large home gas cylinder, 22 kg capacity',
    price: 8.5,
    oldPrice: 9.5,
    discount: 10,
    image: '/images/gas-large.jpg',
    category: 'gas'
  },
  {
    id: 4,
    name: 'اسطوانة غاز منزلية صغيرة',
    nameEn: 'Small Home Gas Cylinder',
    description: 'اسطوانة غاز منزلية صغيرة سعة 12 كجم',
    descriptionEn: 'Small home gas cylinder, 12 kg capacity',
    price: 5.5,
    oldPrice: null,
    discount: 0,
    image: '/images/gas-small.jpg',
    category: 'gas'
  }
];

// بيانات تجريبية للسلايدر
const dummySlides = [
  {
    id: 1,
    title: 'خدمة توصيل سريعة وموثوقة',
    titleEn: 'Fast and Reliable Delivery Service',
    description: 'نوصل المياه المعدنية واسطوانات الغاز إلى منزلك في أسرع وقت',
    descriptionEn: 'We deliver mineral water and gas cylinders to your home in no time',
    image: '/images/slider1.jpg',
    link: '/services',
    buttonText: 'اطلب الآن',
    buttonTextEn: 'Order Now'
  },
  {
    id: 2,
    title: 'خصم 20% على الطلب الأول',
    titleEn: '20% Discount on Your First Order',
    description: 'استفد من عرض الخصم الخاص للعملاء الجدد',
    descriptionEn: 'Take advantage of the special discount offer for new customers',
    image: '/images/slider2.jpg',
    link: '/signup',
    buttonText: 'سجل الآن',
    buttonTextEn: 'Sign Up Now'
  }
];

const HomePage = () => {
  const { isArabic } = useLanguage();
  
  // النصوص حسب اللغة
  const texts = {
    featuredProducts: isArabic ? 'منتجاتنا المميزة' : 'Featured Products',
    viewAll: isArabic ? 'عرض الكل' : 'View All',
    waterService: isArabic ? 'خدمة توصيل المياه المعدنية' : 'Mineral Water Delivery Service',
    gasService: isArabic ? 'خدمة توصيل اسطوانات الغاز' : 'Gas Cylinders Delivery Service',
    orderNow: isArabic ? 'اطلب الآن' : 'Order Now',
    servicesDesc: isArabic 
      ? 'نقدم خدمات توصيل سريعة وموثوقة في جميع أنحاء مملكة البحرين'
      : 'We provide fast and reliable delivery services throughout the Kingdom of Bahrain',
    howItWorks: isArabic ? 'كيف يعمل التطبيق' : 'How It Works',
    step1: isArabic ? 'اختر المنتج' : 'Choose Product',
    step2: isArabic ? 'أدخل العنوان' : 'Enter Address',
    step3: isArabic ? 'ادفع بسهولة' : 'Easy Payment',
    step4: isArabic ? 'استلم طلبك' : 'Receive Order',
    step1Desc: isArabic 
      ? 'تصفح منتجاتنا واختر ما تحتاجه'
      : 'Browse our products and choose what you need',
    step2Desc: isArabic 
      ? 'حدد موقعك أو أدخل عنوانك'
      : 'Set your location or enter your address',
    step3Desc: isArabic 
      ? 'ادفع بسهولة عبر بطاقة الائتمان أو عند الاستلام'
      : 'Pay easily via credit card or cash on delivery',
    step4Desc: isArabic 
      ? 'استلم طلبك في أسرع وقت ممكن'
      : 'Receive your order as quickly as possible',
  };

  // تعديل بيانات المنتجات حسب اللغة
  const localizedProducts = dummyProducts.map(product => ({
    ...product,
    name: isArabic ? product.name : product.nameEn,
    description: isArabic ? product.description : product.descriptionEn
  }));

  // تعديل بيانات السلايدر حسب اللغة
  const localizedSlides = dummySlides.map(slide => ({
    ...slide,
    title: isArabic ? slide.title : slide.titleEn,
    description: isArabic ? slide.description : slide.descriptionEn,
    buttonText: isArabic ? slide.buttonText : slide.buttonTextEn
  }));

  return (
    <div className="min-h-screen">
      {/* قسم السلايدر الرئيسي */}
      <section className="mb-12">
        <HeroSlider slides={localizedSlides} />
      </section>

      {/* قسم الخدمات */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            {texts.servicesDesc}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* خدمة المياه */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <img 
                  src="/images/water-service.jpg" 
                  alt={texts.waterService} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 dark:bg-primary-dark/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{texts.waterService}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isArabic 
                    ? 'توصيل المياه المعدنية النقية بأحجام مختلفة إلى منزلك أو مكتبك في أي وقت'
                    : 'Delivery of pure mineral water in different sizes to your home or office anytime'}
                </p>
                <Link to="/services/water">
                  <Button variant="primary" className="w-full">
                    {texts.orderNow}
                  </Button>
                </Link>
              </div>
            </div>

            {/* خدمة الغاز */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <img 
                  src="/images/gas-service.jpg" 
                  alt={texts.gasService} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/30 dark:bg-secondary-dark/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{texts.gasService}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isArabic 
                    ? 'خدمة توصيل اسطوانات الغاز المنزلية بمختلف الأحجام بأمان وسرعة'
                    : 'Safe and fast delivery service for home gas cylinders in various sizes'}
                </p>
                <Link to="/services/gas">
                  <Button variant="secondary" className="w-full">
                    {texts.orderNow}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم المنتجات المميزة */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {texts.featuredProducts}
            </h2>
            <Link to="/products">
              <Button variant="outline" size="sm">
                {texts.viewAll}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localizedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* قسم كيف يعمل التطبيق */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {texts.howItWorks}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* الخطوة الأولى */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{texts.step1}</h3>
              <p className="text-gray-600 dark:text-gray-400">{texts.step1Desc}</p>
            </div>

            {/* الخطوة الثانية */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{texts.step2}</h3>
              <p className="text-gray-600 dark:text-gray-400">{texts.step2Desc}</p>
            </div>

            {/* الخطوة الثالثة */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{texts.step3}</h3>
              <p className="text-gray-600 dark:text-gray-400">{texts.step3Desc}</p>
            </div>

            {/* الخطوة الرابعة */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{texts.step4}</h3>
              <p className="text-gray-600 dark:text-gray-400">{texts.step4Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
