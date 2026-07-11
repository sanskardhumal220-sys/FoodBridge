import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { io } from 'socket.io-client';

// Custom hook to trigger notifications from anywhere
export const triggerNotification = (message) => {
  window.dispatchEvent(new CustomEvent('app-notify', { detail: { message } }));
};

const ToastProvider = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleNotify = (e) => {
      const { message } = e.detail;
      const id = Date.now();
      
      setToasts((prev) => [...prev, { id, message }]);

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    };

    window.addEventListener('app-notify', handleNotify);

    // Setup Socket.io client
    const socket = io(import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '');

    socket.on('new_donation', (donation) => {
      triggerNotification(`🔔 New Food Rescue Available: ${donation.foodType}!`);
    });

    socket.on('donation_accepted', (donation) => {
      triggerNotification(`🤝 An NGO has accepted the donation of ${donation.foodType}!`);
    });

    socket.on('delivery_claimed', (donation) => {
      triggerNotification(`🚚 A volunteer is on the way to pick up ${donation.foodType}!`);
    });

    socket.on('donation_delivered', (donation) => {
      triggerNotification(`✅ Delivery Complete: ${donation.foodType} has arrived!`);
    });

    return () => {
      window.removeEventListener('app-notify', handleNotify);
      socket.disconnect();
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start gap-3 pointer-events-auto"
          >
            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-500 p-2 rounded-full flex-shrink-0">
              <Bell size={18} />
            </div>
            <div className="flex-grow pt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
              {toast.message}
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastProvider;
