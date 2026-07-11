import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 }
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
      className="w-full h-full relative"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
