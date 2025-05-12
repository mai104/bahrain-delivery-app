import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Suspense, lazy, useState } from 'react';

// Layouts
import Navbar from './components/layout/Navbar';
import Navbar3D from './components/layout/Navbar3D';
import Footer from './components/layout/Footer';
import Footer3D from './components/layout/Footer3D';

// Loading Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary dark:border-primary-dark"></div>
  </div>
);

// Lazy load regular pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductDetailsPage = lazy(() => import('./pages/products/ProductDetailsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

// Lazy load 3D pages
const HomePage3D = lazy(() => import('./pages/HomePage3D'));
const LoginPage3D = lazy(() => import('./pages/auth/LoginPage3D'));
const RegisterPage3D = lazy(() => import('./pages/auth/RegisterPage3D'));

// Lazy load error pages
const NotFound3D = lazy(() => import('./pages/error/NotFound3D'));
const ServerError3D = lazy(() => import('./pages/error/ServerError3D'));

/**
 * Main App Component
 * 
 * Provides routing and context providers for the application.
 */
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
            <LayoutNavbar 
              is3DMode={is3DMode} 
              toggleMode={() => setIs3DMode(prev => !prev)} 
            />
            <main className="flex-grow">
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={is3DMode ? <HomePage3D /> : <HomePage />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={is3DMode ? <LoginPage3D /> : <LoginPage />} />
                  <Route path="/register" element={is3DMode ? <RegisterPage3D /> : <RegisterPage />} />
                  
                  {/* Legacy auth route redirects */}
                  <Route path="/auth/login" element={<Navigate to="/login" replace />} />
                  <Route path="/auth/register" element={<Navigate to="/register" replace />} />
                  
                  {/* Product Routes */}
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  
                  {/* Service Routes */}
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:category" element={<ServicesPage />} />
                  
                  {/* Error Pages */}
                  <Route path="/server-error" element={<ServerError3D />} />
                  <Route path="*" element={<NotFound3D />} />
                  
                  {/* Future routes to be added:
                    - Products listing page
                    - Shopping cart
                    - Checkout flow
                    - User profile
                    - Order history
                    - Account settings
                  */}
                </Routes>
              </Suspense>
            </main>
            <LayoutFooter is3DMode={is3DMode} />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
