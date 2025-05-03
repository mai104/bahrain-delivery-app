import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import SocialLinks from '../ui/SocialLinks';

const Footer = () => {
  const { isArabic } = useLanguage();

  // النصوص حسب اللغة
  const texts = {
    appName: isArabic ? 'توصيل البحرين' : 'Bahrain Delivery',
    aboutUs: isArabic ? 'من نحن' : 'About Us',
    services: isArabic ? 'خدماتنا' : 'Our Services',
    terms: isArabic ? 'الشروط والأحكام' : 'Terms & Conditions',
    privacy: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
    contact: isArabic ? 'اتصل بنا' : 'Contact Us',
    water: isArabic ? 'توصيل المياه المعدنية' : 'Mineral Water Delivery',
    gas: isArabic ? 'توصيل اسطوانات الغاز' : 'Gas Cylinders Delivery',
    support: isArabic ? 'الدعم' : 'Support',
    faq: isArabic ? 'الأسئلة الشائعة' : 'FAQ',
    followUs: isArabic ? 'تابعنا' : 'Follow Us',
    copyright: isArabic ? '© 2025 توصيل البحرين. جميع الحقوق محفوظة.' : '© 2025 Bahrain Delivery. All rights reserved.',
    address: isArabic ? 'المنامة، مملكة البحرين' : 'Manama, Kingdom of Bahrain',
  };

  return (
    <footer className="bg-white dark:bg-gray-800 pt-8 pb-6 border-t border:gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* عن الشركة */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary dark:text-primary-dark">{texts.appName}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isArabic 
                ? 'نقدم خدمات توصيل سريعة وموثوقة في جميع أنحاء البحرين.'
                : 'We provide fast and reliable delivery services throughout Bahrain.'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{texts.address}</p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">{isArabic ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {texts.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {texts.services}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {texts.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* مواقع التواصل */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">{texts.followUs}</h3>
            <SocialLinks />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">{texts.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
