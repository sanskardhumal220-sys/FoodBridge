import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 z-10 pt-20 pb-10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="FoodBridge Logo" className="h-10 w-10 rounded-full object-contain p-1 bg-white shadow-sm border border-gray-100" />
              <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                FoodBridge
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Bridging the gap between surplus food and those in need. Join our mission to eliminate global food waste and hunger today.
            </p>

            <div className="glass-card p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Join our newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="hello@example.com" 
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-shadow dark:text-white"
                />
                <button className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-xl transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4">
              {[
                { name: 'Dashboard', path: '/dashboard' }, 
                { name: 'Start Donating', path: '/dashboard' }, 
                { name: 'NGO Radar', path: '/dashboard' }, 
                { name: 'Live Tracking', path: '/dashboard' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' }, 
                { name: 'Help Center', path: '/support' }, 
                { name: 'FAQ', path: '/faq' }, 
                { name: 'Feedback', path: '/feedback' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: 'Terms of Service', path: '/terms' }, 
                { name: 'Privacy Policy', path: '/privacy' }, 
                { name: 'Cookie Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:dhumalhema4@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors text-sm mt-1 break-words">
                  dhumalhema4@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  +91 74899 12494
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-500 shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                  Harishankarpuram<br/>Gwalior 474001
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} FoodBridge. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, i) => (
              <a key={i} href="#" className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-full transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm font-medium bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
            Made with <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Heart className="w-4 h-4 text-red-500 fill-current" /></motion.div> for a better world
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
