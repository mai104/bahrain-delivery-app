import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// الصفحات
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                {/* مسارات إضافية ستتم إضافتها لاحقًا:
                  - صفحة المنتجات
                  - صفحات الخدمات المحددة (المياه، الغاز)
                  - صفحة السلة
                  - صفحة الدفع
                  - صفحة الملف الشخصي
                  - صفحة الطلبات السابقة
                  - وغيرها...
                */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
