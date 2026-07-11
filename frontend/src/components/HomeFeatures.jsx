import { motion } from 'framer-motion';
import { Camera, Bell, MapPin, Brain, BarChart2, Users, QrCode, Leaf } from 'lucide-react';

const HomeFeatures = () => {
  const features = [
    { icon: <Camera size={24} />, title: 'AI Quality Detection', desc: 'Auto-scans food freshness and safety before donation.' },
    { icon: <Bell size={24} />, title: 'Real-Time Alerts', desc: 'Instant push notifications for new donations and route updates.' },
    { icon: <MapPin size={24} />, title: 'Nearby NGO Finder', desc: 'Location-based discovery of the closest verified partners.' },
    { icon: <Brain size={24} />, title: 'Smart Matching', desc: 'Algorithm pairs food type with NGO dietary requirements.' },
    { icon: <BarChart2 size={24} />, title: 'Analytics Dashboard', desc: 'Track your total impact, meals saved, and carbon offset.' },
    { icon: <Users size={24} />, title: 'Volunteer Management', desc: 'Efficiently organize, route, and reward volunteer drivers.' },
    { icon: <QrCode size={24} />, title: 'QR Verification', desc: 'Secure handoffs with scannable QR codes for donors and NGOs.' },
    { icon: <Leaf size={24} />, title: 'Sustainability Reports', desc: 'Downloadable ESG compliance reports for corporate donors.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            Premium <span className="text-gradient">Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to manage food redistribution at scale.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 rounded-3xl group border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary-500 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFeatures;
