import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Users, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden bg-white dark:bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950/40 dark:via-gray-950 dark:to-accent-900/20 -z-10" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent-400/20 blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
          >
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">FoodBridge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We are on a mission to eliminate food waste and eradicate hunger by connecting surplus food with those who need it most.
          </motion.p>
        </div>
      </section>

      {/* Mission, Vision, and Story */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="glass p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary-500" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                  <Globe className="text-primary-500" /> Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To create a seamless, technology-driven ecosystem that rescues perfectly good surplus food from restaurants, events, and individuals, and delivers it swiftly to NGOs and communities facing food insecurity.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-accent-500" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                  <Sparkles className="text-accent-500" /> Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  A world where no edible food goes to waste and no person goes to bed hungry. We envision sustainable, zero-waste communities powered by compassion and shared resources.
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="glass p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  FoodBridge was born from a simple observation: while banquet halls throw away hundreds of kilos of fresh food every night, just a few miles away, families struggle to find their next meal.
                </p>
                <p>
                  What started as a small WhatsApp group of volunteers rescuing food in local neighborhoods has blossomed into a sophisticated platform. Today, our AI-powered FoodBrain technology ensures that food is matched efficiently, safely, and transparently.
                </p>
                <p>
                  We believe that bridging this gap isn't just about logistics; it's about building a community that cares. Every meal rescued is a step towards a greener planet and a kinder society.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Our Values & Why Choose Us */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide our everyday operations and long-term vision.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-24"
          >
            <ValueCard 
              icon={<ShieldCheck className="w-10 h-10 text-primary-500" />}
              title="Safety First"
              description="Our FoodBrain AI strictly evaluates freshness and safety before any food reaches a beneficiary."
            />
            <ValueCard 
              icon={<Users className="w-10 h-10 text-accent-500" />}
              title="Community Driven"
              description="We empower local heroes—donors, volunteers, and NGOs—to make an impact in their own neighborhoods."
            />
            <ValueCard 
              icon={<TrendingUp className="w-10 h-10 text-blue-500" />}
              title="Radical Transparency"
              description="Track your donation from pickup to plate. Know exactly who you helped and the environmental impact made."
            />
          </motion.div>

          <div className="glass p-12 rounded-3xl border border-gray-200 dark:border-gray-800 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Choose FoodBridge?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Unlike traditional food banks, FoodBridge operates in real-time. We don't store surplus food; we route it instantly. This means fresher food for beneficiaries, zero storage overhead, and a highly scalable model that can rescue food anywhere, anytime.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
              Start Donating Today <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};



const ValueCard = ({ icon, title, description }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center"
  >
    <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default About;
