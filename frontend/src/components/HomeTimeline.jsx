import { motion } from 'framer-motion';
import { Camera, Brain, Users, Truck, HeartHandshake } from 'lucide-react';

const HomeTimeline = () => {
  const steps = [
    { icon: <Camera size={24} />, title: 'Upload Food', desc: 'Snap a picture of the surplus food you want to donate.' },
    { icon: <Brain size={24} />, title: 'AI Analysis', desc: 'FoodBrain AI instantly estimates freshness, safety, and nutritional impact.' },
    { icon: <Users size={24} />, title: 'NGO Matching', desc: 'Our smart algorithm finds the nearest verified NGO in need.' },
    { icon: <Truck size={24} />, title: 'Volunteer Pickup', desc: 'A volunteer is dispatched to pick up the donation using optimized routing.' },
    { icon: <HeartHandshake size={24} />, title: 'Food Delivered', desc: 'The food safely reaches those who need it most, reducing hunger and waste.' }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            How <span className="text-gradient">FoodBridge</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A seamless, AI-powered journey from surplus to sustainability.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary-500/20 via-accent-500/50 to-primary-500/20 -translate-y-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                {/* Glowing Node */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-primary-500 rounded-full z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 relative z-20 md:mt-24">
                  <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTimeline;
