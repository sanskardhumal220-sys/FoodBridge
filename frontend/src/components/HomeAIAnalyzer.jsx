import { motion } from 'framer-motion';
import { Camera, ShieldCheck, Activity, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

const HomeAIAnalyzer = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setIsScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-[#0f0f0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 font-bold text-sm">
              <Brain size={16} /> Powered by FoodBrain AI
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Instant Quality Check with <span className="text-gradient">AI Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Our proprietary AI models instantly analyze photos of surplus food to determine freshness, estimate nutritional value, and ensure safety standards are met before donation.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <ShieldCheck className="text-primary-500" />, title: 'Safety Verification', desc: 'Identifies potential spoilage or contamination.' },
                { icon: <Activity className="text-accent-500" />, title: 'Nutritional Estimation', desc: 'Calculates rough macros and calorie counts to match dietary needs.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0 shadow-inner">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Scanner Interface Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            
            <div className="glass-panel p-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                  <Camera size={20} className="text-primary-500" />
                  FoodScanner Pro
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video mb-6 group">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Food scanning" className="w-full h-full object-cover opacity-80" />
                
                {/* Laser Animation */}
                {isScanning && (
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-primary-400 shadow-[0_0_20px_rgba(52,211,153,1)] z-10"
                  ></motion.div>
                )}

                {/* AI Bounding Boxes */}
                {!isScanning && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-primary-400 bg-primary-400/20 rounded-lg flex items-start p-2 backdrop-blur-[2px]"
                  >
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">Fresh Salad: 98%</span>
                  </motion.div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="bg-gray-50 dark:bg-gray-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {isScanning ? 'Analyzing Food Quality...' : 'Analysis Complete'}
                  </span>
                  <span className="text-sm font-bold text-primary-500">{scanProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                    style={{ width: `${scanProgress}%` }}
                  ></motion.div>
                </div>

                {!isScanning && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between"
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</div>
                      <div className="text-sm font-bold text-green-500 flex items-center gap-1"><ShieldCheck size={14}/> Safe</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Est. Life</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">~48 Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impact</div>
                      <div className="text-sm font-bold text-accent-500">2 Meals</div>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAIAnalyzer;
