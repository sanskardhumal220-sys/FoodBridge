import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { triggerNotification } from './ToastProvider';
import { useTranslation } from 'react-i18next';

const ChatModal = ({ isOpen, onClose, donationId, currentUser }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && donationId) {
      loadMessages();
      // Listen for incoming messages on this donation
      const handleStorageChange = (e) => {
        if (e.key === 'mockChats') {
          loadMessages();
        }
      };
      window.addEventListener('storage', handleStorageChange);
      
      // Also custom event for same-window updates
      const handleLocalEvent = () => loadMessages();
      window.addEventListener(`chat-updated-${donationId}`, handleLocalEvent);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener(`chat-updated-${donationId}`, handleLocalEvent);
      };
    }
  }, [isOpen, donationId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const loadMessages = () => {
    const storedChats = JSON.parse(localStorage.getItem('mockChats')) || {};
    setMessages(storedChats[donationId] || []);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      timestamp: new Date().toISOString(),
    };

    const storedChats = JSON.parse(localStorage.getItem('mockChats')) || {};
    const donationChats = storedChats[donationId] || [];
    donationChats.push(newMessage);
    storedChats[donationId] = donationChats;
    
    localStorage.setItem('mockChats', JSON.stringify(storedChats));
    
    // Simulate notification for the other party if they aren't looking
    triggerNotification(`💬 New message from ${currentUser.name}: ${inputText.substring(0, 20)}...`);

    // Dispatch event so same window updates instantly if multiple tabs open
    window.dispatchEvent(new Event(`chat-updated-${donationId}`));
    window.dispatchEvent(new Event('storage')); // trigger cross tab
    
    setInputText('');
    loadMessages();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-bold text-lg dark:text-white">{t('chat_modal.title')}</h3>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center">
                  <p className="mb-2">{t('chat_modal.no_messages')}</p>
                  <p className="text-sm">{t('chat_modal.say_hi')}</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderName === currentUser.name && msg.senderRole === currentUser.role;
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {isMe ? t('chat_modal.you') : msg.senderName} ({msg.senderRole})
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${isMe ? 'bg-primary-500 text-white rounded-tr-none shadow-md shadow-primary-500/20' : 'bg-gray-100 dark:bg-gray-800 dark:text-white rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('chat_modal.type_message')}
                  className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
