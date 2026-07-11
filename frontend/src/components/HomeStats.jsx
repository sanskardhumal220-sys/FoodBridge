import { motion } from 'framer-motion';


const HomeStats = () => {
  const stats = [
    { label: 'Meals Saved', value: 10000, suffix: '+' },
    { label: 'NGOs Connected', value: 150, suffix: '+' },
    { label: 'Volunteers Active', value: 500, suffix: '+' },
    { label: 'Food Waste Reduced', value: 5, suffix: ' Tons+' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="relative -mt-16 z-30 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants} 
        className="glass-panel p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-primary-500/30"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-[#0a0a0a]/80 to-accent-900/40 -z-10"></div>
        
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="flex flex-col items-center justify-center">
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2 drop-shadow-sm flex items-center justify-center">
              <span>{stat.value}{stat.suffix}</span>
            </div>
            <div className="text-primary-400 font-bold tracking-wider text-sm uppercase opacity-90">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeStats;
