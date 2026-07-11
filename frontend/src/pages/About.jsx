import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Users, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
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
            {t('about.title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">FoodBridge</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('about.subtitle')}
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
                  <Globe className="text-primary-500" /> {t('about.mission_title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.mission_desc')}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-accent-500" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                  <Sparkles className="text-accent-500" /> {t('about.vision_title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.vision_desc')}
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="glass p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('about.story_title')}</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{t('about.story_p1')}</p>
                <p>{t('about.story_p2')}</p>
                <p>{t('about.story_p3')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Our Values & Why Choose Us */}
      <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values_title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('about.values_desc')}</p>
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
              title={t('about.val1_title')}
              description={t('about.val1_desc')}
            />
            <ValueCard 
              icon={<Users className="w-10 h-10 text-accent-500" />}
              title={t('about.val2_title')}
              description={t('about.val2_desc')}
            />
            <ValueCard 
              icon={<TrendingUp className="w-10 h-10 text-blue-500" />}
              title={t('about.val3_title')}
              description={t('about.val3_desc')}
            />
          </motion.div>

          <div className="glass p-12 rounded-3xl border border-gray-200 dark:border-gray-800 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('about.why_title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('about.why_desc')}
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
              {t('about.start_donating')} <ArrowRight />
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
