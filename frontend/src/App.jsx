import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import ReportIssue from './pages/ReportIssue';
import Settings from './pages/Settings';
import Support from './pages/Support';
import DonateInfo from './pages/DonateInfo';
import NGORadar from './pages/NGORadar';
import LiveTracking from './pages/LiveTracking';
import CookiePolicy from './pages/CookiePolicy';

import ToastProvider from './components/ToastProvider';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AnimatedPage from './components/AnimatedPage';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
        <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
        <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/feedback" element={<AnimatedPage><Feedback /></AnimatedPage>} />
        <Route path="/report-issue" element={<AnimatedPage><ReportIssue /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
        <Route path="/support" element={<AnimatedPage><Support /></AnimatedPage>} />
        <Route path="/donate-info" element={<AnimatedPage><DonateInfo /></AnimatedPage>} />
        <Route path="/ngo-radar" element={<AnimatedPage><NGORadar /></AnimatedPage>} />
        <Route path="/live-tracking" element={<AnimatedPage><LiveTracking /></AnimatedPage>} />
        <Route path="/cookie-policy" element={<AnimatedPage><CookiePolicy /></AnimatedPage>} />

      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <CustomCursor />
        <ToastProvider />
        <Navbar />
        <main className="flex-grow pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
