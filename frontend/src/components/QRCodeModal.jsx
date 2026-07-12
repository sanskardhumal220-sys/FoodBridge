import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

const QRCodeModal = ({ isOpen, onClose, code, title, subtitle }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-800 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6 mt-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title || 'Scan to Verify'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle || 'Show this code to the arriving party.'}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl flex justify-center items-center mx-auto w-48 h-48 shadow-inner border border-gray-100 mb-6">
            <QRCodeSVG value={code} size={160} level="H" />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-2">Or Use PIN</p>
            <div className="text-4xl font-mono font-bold tracking-[0.2em] text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 py-3 rounded-xl border border-primary-100 dark:border-primary-800">
              {code}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QRCodeModal;
