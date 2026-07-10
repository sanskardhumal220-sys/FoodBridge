import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="FoodBridge Logo" className="h-8 w-auto rounded-lg object-cover" />
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                FoodBridge
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              Bridging the gap between surplus food and those in need. Join us in our mission to eliminate food waste and hunger.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm font-bold">Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Feedback</Link>
              </li>
              <li>
                <Link to="/report-issue" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Report Issue</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Dashboard</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Start Donating</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="mailto:support@foodbridge.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm">support@foodbridge.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm leading-tight">123 Impact Way<br/>Sustainability City, SC 90210</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} FoodBridge. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> for a better world
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
