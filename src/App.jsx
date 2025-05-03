import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Navbar3D from './components/layout/Navbar3D';
import Footer from './components/layout/Footer';
import Footer3D from './components/layout/Footer3D';
import { useState } from 'react';

// Regular Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// 3D Pages
import HomePage3D from './pages/HomePage3D';
import LoginPage3D from './pages/auth/LoginPage3D';
import RegisterPage3D from './pages/auth/RegisterPage3D';

// Error Pages
import NotFound3D from './pages/error/NotFound3D';
import ServerError3D from './pages/error/ServerError3D';

function App() {
  // State to toggle between regular and 3D mode
  const [is3DMode, setIs3DMode] = useState(true);
  
  // Layout components based on mode
  const LayoutNavbar = is3DMode ? Navbar3D : Navbar;
  const LayoutFooter = is3DMode ? Footer3D : Footer;
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <LayoutNavbar />
            <main className="flex-grow">
              <Routes>
                {/* Home Page */}
                <Route path="/" element={is3DMode ? <HomePage3D /> : <HomePage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={is3DMode ? <LoginPage3D /> : <LoginPage />} />
                <Route path="/register" element={is3DMode ? <RegisterPage3D /> : <RegisterPage />} />
                
                {/* For compatibility with old routes */}
                <Route path="/auth/login" element={is3DMode ? <LoginPage3D /> : <LoginPage />} />
                <Route path="/auth/register" element={is3DMode ? <RegisterPage3D /> : <RegisterPage />} />
                
                {/* Other Routes */}
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                
                {/* Error Pages */}
                <Route path="/server-error" element={<ServerError3D />} />
                <Route path="*" element={<NotFound3D />} />
                
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
            <LayoutFooter />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
