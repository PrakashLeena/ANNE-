import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/features"  element={<FeaturesPage />} />
            <Route path="/pricing"   element={<PricingPage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/signup"    element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/support"   element={<SupportPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
