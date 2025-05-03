import { createContext, useContext, useState, useEffect } from 'react';

// إنشاء سياق اللغة
const LanguageContext = createContext();

// مزود سياق اللغة
export const LanguageProvider = ({ children }) => {
  // استخدام اللغة المخزنة محليًا أو تعيين العربية كلغة افتراضية
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ar';
  });

  // تحديث اتجاه الصفحة والكلاسات عند تغيير اللغة
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  // تبديل اللغة بين العربية والإنجليزية
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // تعيين اللغة إلى قيمة محددة
  const changeLanguage = (lang) => {
    if (lang === 'ar' || lang === 'en') {
      setLanguage(lang);
    }
  };

  // تحقق ما إذا كانت اللغة هي العربية
  const isArabic = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, isArabic, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// هوك للاستخدام السهل
export const useLanguage = () => useContext(LanguageContext);
