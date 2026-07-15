import { motion } from 'framer-motion';
import { Target, Eye, HeartHandshake, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            About <span className="text-primary-500">FoodBridge</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between surplus food and people in need.
          </p>
          <div className="mt-6 inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-6 py-2 rounded-full font-semibold border border-primary-100 dark:border-primary-800">
            Powered by AI Food Redistribution
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Our Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/40 text-primary-500 rounded-2xl">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We aim to completely eliminate food waste while simultaneously combating hunger in our communities. By leveraging smart technology, we ensure that perfectly good surplus food reaches those who need it most, rather than ending up in landfills.
            </p>
          </motion.div>

          {/* Our Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-accent-100 dark:bg-accent-900/40 text-accent-500 rounded-2xl">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A world where no edible food is ever wasted and no one goes to bed hungry. We envision a seamless, global network of connected businesses, NGOs, and volunteers working together effortlessly through our platform.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Why FoodBridge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/40 text-green-500 rounded-2xl">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why FoodBridge?</h2>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3"><span className="text-primary-500">✔</span> <strong>Smart Matching:</strong> AI instantly connects donations with the nearest verified NGOs.</li>
              <li className="flex gap-3"><span className="text-primary-500">✔</span> <strong>Safety First:</strong> FoodBrain analyzes images and details to guarantee food quality.</li>
              <li className="flex gap-3"><span className="text-primary-500">✔</span> <strong>Community Driven:</strong> A network of dedicated volunteers handling rapid logistics.</li>
            </ul>
          </motion.div>

          {/* Team Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/40 text-purple-500 rounded-2xl">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Information</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Built by passionate developers during a hackathon to solve real-world problems. We are a diverse group of engineers and designers committed to using technology for social good.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">🚀 More features coming soon.</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
