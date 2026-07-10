import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VerifiedBadge = ({ size = 16, showText = true }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800"
      title="Verified NGO"
    >
      <CheckCircle size={size} className="fill-blue-600 text-white dark:fill-blue-500 dark:text-gray-900" />
      {showText && <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>}
    </motion.div>
  );
};

export default VerifiedBadge;
