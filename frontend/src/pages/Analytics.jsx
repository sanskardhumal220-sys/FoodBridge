import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { Package, Utensils, Trash2, CloudOff, TrendingUp, BarChart3, Activity } from 'lucide-react';
const Analytics = () => {
  const { t } = useTranslation();

  const stats = [{
    id: 1,
    label: "Total Food Donated",
    value: "320",
    unit: "kg",
    icon: <Package className="w-8 h-8 text-primary-500" />,
    trend: "+12.5%",
    description: "Rescued from going to waste",
    color: "from-primary-500/20 to-primary-600/5",
    borderColor: "border-primary-500/20"
  }, {
    id: 2,
    label: "Total Meals Served",
    value: "640",
    unit: "meals",
    icon: <Utensils className="w-8 h-8 text-accent-500" />,
    trend: "+15.2%",
    description: "Nourishing communities",
    color: "from-accent-500/20 to-accent-600/5",
    borderColor: "border-accent-500/20"
  }, {
    id: 3,
    label: "Food Waste Reduced",
    value: "320",
    unit: "kg",
    icon: <Trash2 className="w-8 h-8 text-emerald-500" />,
    trend: "+8.4%",
    description: "Diverted from landfills",
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/20"
  }, {
    id: 4,
    label: "CO₂ Emissions Saved",
    value: "0.8",
    unit: "tons",
    icon: <CloudOff className="w-8 h-8 text-blue-500" />,
    trend: "+10.1%",
    description: "Positive environmental impact",
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/20"
  }];
  return <div className="w-full min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-accent-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-full mb-6 shadow-sm">
            <Activity className="w-5 h-5 text-accent-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide uppercase">{t("analytics.text1")}</span>
          </motion.div>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t("analytics.text2")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">{t("analytics.text3")}</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("analytics.text4")}</motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => <motion.div key={stat.id} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1 * index + 0.3
        }} whileHover={{
          y: -8,
          scale: 1.02
        }} className={`relative overflow-hidden rounded-3xl glass border ${stat.borderColor} p-6 group cursor-default`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-sm backdrop-blur-md">
                    {stat.icon}
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">{stat.label}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stat.value}</span>
                    <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">{stat.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-500 mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* Faux Chart for extra premium feel */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8
      }} className="mt-16 rounded-3xl glass p-8 border border-gray-200/50 dark:border-gray-800/50 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("analytics.text5")}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t("analytics.text6")}</p>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <BarChart3 className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          
          <div className="h-64 w-full flex items-end justify-between space-x-2 relative z-10">
            {[40, 55, 45, 60, 75, 65, 80, 95, 85, 100, 90, 110].map((height, i) => <motion.div key={i} initial={{
            height: 0
          }} animate={{
            height: `${height / 110 * 100}%`
          }} transition={{
            delay: 1 + i * 0.05,
            duration: 0.8,
            type: "spring"
          }} className="w-full bg-gradient-to-t from-primary-500/80 to-primary-400/80 hover:from-primary-500 hover:to-primary-400 rounded-t-md transition-all duration-300 cursor-pointer relative group flex-1">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium shadow-lg z-20">{t("analytics.text7")}{i + 1}
                </div>
              </motion.div>)}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-8 px-8 z-0">
            <div className="mt-16 h-full flex flex-col justify-between pb-8">
              {[1, 2, 3, 4, 5].map((_, i) => <div key={i} className="w-full h-px bg-gray-200/50 dark:bg-gray-800/50" />)}
            </div>
          </div>
        </motion.div>

      </div>
    </div>;
};
export default Analytics;