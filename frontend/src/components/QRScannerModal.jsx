import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';

const QRScannerModal = ({ isOpen, onClose, onScanSuccess, title, subtitle }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10, 
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            return {
              width: Math.floor(minEdge * 0.7),
              height: Math.floor(minEdge * 0.7)
            };
          }
        },
        false
      );

      scanner.render(
        (decodedText) => {
          scanner.clear();
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          // ignore background scanning errors
        }
      );

      return () => {
        scanner.clear().catch(error => console.error("Failed to clear scanner", error));
      };
    }
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 6) {
      onScanSuccess(pin);
    } else {
      setError('PIN must be 6 digits');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title || 'Scan QR Code'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle || 'Align the QR code within the frame.'}</p>
          </div>

          <div className="rounded-2xl border-2 border-primary-500/30 mb-6 bg-black relative w-full overflow-hidden min-h-[300px] flex items-center justify-center">
             <div id="reader" className="w-full h-full text-white"></div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 uppercase tracking-widest font-semibold">Or Enter PIN</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              maxLength="6"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="000000"
              className="w-full text-center text-4xl font-mono font-bold tracking-[0.2em] bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-0 rounded-xl py-3 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 transition-colors"
            />
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            <button
              type="submit"
              disabled={pin.length !== 6}
              className="w-full mt-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              Verify PIN
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QRScannerModal;
