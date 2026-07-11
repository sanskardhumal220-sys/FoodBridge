import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/10 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Newsletter/CTA */}
        <div className="glass-card bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to make an impact?</h3>
            <p className="text-gray-400">Join thousands of donors and volunteers reducing food waste daily.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <Link to="/register" className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-lg shadow-primary-500/25">
              Get Started <ArrowRight size={20}/>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/30">FB</div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                FoodBridge
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm">
              An AI-powered logistics platform connecting surplus food with NGOs and volunteers in real-time. Zero waste. Zero hunger.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors text-gray-400 hover:text-white border border-white/10">TW</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors text-gray-400 hover:text-white border border-white/10">IN</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors text-gray-400 hover:text-white border border-white/10">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors text-gray-400 hover:text-white border border-white/10">GH</a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Features</Link></li>
              <li><Link to="/impact" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Our Impact</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">For Enterprise</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/support" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Sustainability Blog</Link></li>
              <li><Link to="/api-docs" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">API Documentation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="mailto:hello@foodbridge.ai" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">hello@foodbridge.ai</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">100 Innovation Drive<br/>San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} FoodBridge Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            Crafted with <Heart className="w-4 h-4 text-red-500 fill-current" /> for a sustainable future
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
