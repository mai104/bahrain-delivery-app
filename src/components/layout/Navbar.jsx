import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

// مكونات الأيقونات
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { isArabic, toggleLanguage } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // سيتم تحديثه لاحقًا مع سياق المصادقة

  // تبديل حالة القائمة
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // النصوص حسب اللغة
  const texts = {
    logo: isArabic ? 'توصيل البحرين' : 'Bahrain Delivery',
    home: isArabic ? 'الرئيسية' : 'Home',
    services: isArabic ? 'الخدمات' : 'Services',
    aboutUs: isArabic ? 'من نحن' : 'About Us',
    contactUs: isArabic ? 'اتصل بنا' : 'Contact Us',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    signup: isArabic ? 'إنشاء حساب' : 'Sign Up',
    profile: isArabic ? 'الملف الشخصي' : 'Profile',
    orders: isArabic ? 'طلباتي' : 'My Orders',
    logout: isArabic ? 'تسجيل الخروج' : 'Logout',
    language: isArabic ? 'English' : 'العربية',
    darkMode: isArabic ? 'الوضع المظلم' : 'Dark Mode',
    lightMode: isArabic ? 'الوضع المضيء' : 'Light Mode',
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-nav sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* الشعار */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt={texts.logo} className="h-10 w-auto" />
              <span className="text-primary dark:text-primary-dark font-bold text-xl mx-2">{texts.logo}</span>
            </Link>
          </div>

          {/* القائمة الرئيسية - عرض على الشاشات الكبيرة */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
              {texts.home}
            </Link>
            <Link to="/services" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
              {texts.services}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
              {texts.aboutUs}
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors">
              {texts.contactUs}
            </Link>
          </div>

          {/* الأزرار والإعدادات على الشاشات الكبيرة */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* زر تبديل اللغة */}
            <button 
              onClick={toggleLanguage} 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark px-3 py-1 rounded-md"
            >
              {texts.language}
            </button>

            {/* زر تبديل الوضع المظلم */}
            <button 
              onClick={toggleTheme} 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark p-2 rounded-full"
              aria-label={darkMode ? texts.lightMode : texts.darkMode}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* أزرار تسجيل الدخول / الملف الشخصي */}
            {isLoggedIn ? (
              <div className="relative group">
                <button className="btn btn-primary">
                  {texts.profile}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {texts.profile}
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {texts.orders}
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {texts.logout}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/login" className="btn btn-outline">
                  {texts.login}
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  {texts.signup}
                </Link>
              </div>
            )}
          </div>

          {/* زر القائمة للشاشات الصغيرة */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {texts.home}
            </Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {texts.services}
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {texts.aboutUs}
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {texts.contactUs}
            </Link>
          </div>
          
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 dark:text-gray-400">{darkMode ? texts.darkMode : texts.lightMode}</span>
              <button 
                onClick={toggleTheme} 
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-gray-300 dark:bg-gray-600"
              >
                <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${darkMode ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">{texts.language}</span>
              <button 
                onClick={toggleLanguage} 
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
              >
                {texts.language}
              </button>
            </div>
            
            {!isLoggedIn && (
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/login" className="btn btn-outline w-full text-center">
                  {texts.login}
                </Link>
                <Link to="/signup" className="btn btn-primary w-full text-center">
                  {texts.signup}
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {texts.profile}
                </Link>
                <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {texts.orders}
                </Link>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {texts.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
