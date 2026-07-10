import React from 'react';
import { Leaf, Flame, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreshnessBadge = ({ foodBrainData, showDetails = false }) => {
  if (!foodBrainData) return null;

  const { freshnessScore, estimatedSpoilage, safetyScore, co2Saved, peopleFed } = foodBrainData;

  // Determine configuration based on safety and score
  let config = {
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    borderColor: 'border-green-200 dark:border-green-800/50',
    icon: <ShieldCheck size={16} className="text-green-500" />,
    stars: 5,
    label: 'Excellent',
  };

  if (safetyScore === 'Low' || freshnessScore < 50) {
    config = {
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800/50',
      icon: <AlertTriangle size={16} className="text-red-500" />,
      stars: Math.max(1, Math.round((freshnessScore / 100) * 5)),
      label: 'Warning',
    };
  } else if (safetyScore === 'Medium' || freshnessScore < 80) {
    config = {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800/50',
      icon: <Flame size={16} className="text-yellow-500" />,
      stars: Math.round((freshnessScore / 100) * 5),
      label: 'Good',
    };
  } else {
    config.stars = Math.round((freshnessScore / 100) * 5);
  }

  // Generate stars array
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-sm ${i < config.stars ? config.color : 'text-gray-300 dark:text-gray-600'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className={`flex flex-col gap-2 ${showDetails ? 'w-full' : 'w-auto'}`}>
      {/* Primary Badge */}
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bgColor} ${config.borderColor} shadow-sm w-max`}>
        {config.icon}
        <div className="flex -mt-0.5 tracking-tighter">
          {renderStars()}
        </div>
        <span className={`text-xs font-bold ${config.color} ml-1`}>
          {freshnessScore}% {config.label}
        </span>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 gap-2 mt-2"
          >
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700 text-xs flex items-center gap-2 shadow-sm">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <Info size={14} className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 leading-tight">Spoils in</p>
                <p className="font-semibold dark:text-white leading-tight">{estimatedSpoilage}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700 text-xs flex items-center gap-2 shadow-sm">
              <div className="p-1.5 bg-green-50 dark:bg-green-900/30 rounded-md">
                <Leaf size={14} className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 leading-tight">CO₂ Saved</p>
                <p className="font-semibold dark:text-white leading-tight">{Number(co2Saved).toFixed(1)} kg</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreshnessBadge;
