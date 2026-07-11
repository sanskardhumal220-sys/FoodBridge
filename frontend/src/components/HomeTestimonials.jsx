import { motion } from 'framer-motion';

const HomeTestimonials = () => {
  const testimonials = [
    {
      quote: "FoodBridge helped us serve hundreds of meals this month alone. The smart routing connects us with donors instantly.",
      author: "Sarah Jenkins",
      role: "Director, City Hope Shelter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
    },
    {
      quote: "The AI freshness analysis makes food donations safer and gives us peace of mind when accepting surplus from restaurants.",
      author: "David Chen",
      role: "Logistics Manager, Food Bank NYC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
    },
    {
      quote: "As a volunteer driver, the app makes it incredibly easy to find pickups along my daily commute. Highly recommend!",
      author: "Elena Rodriguez",
      role: "Top Volunteer Driver",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary-500/5 to-accent-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            Loved by <span className="text-gradient">Our Community</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-gray-800 relative"
            >
              <div className="text-5xl text-primary-200 dark:text-primary-900/50 absolute top-4 left-4 font-serif">"</div>
              <p className="text-gray-700 dark:text-gray-300 text-lg relative z-10 italic mb-8 pt-4">
                {t.quote}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
