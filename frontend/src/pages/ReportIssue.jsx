import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Upload, Bug, CheckCircle2, Copy } from 'lucide-react';

const CATEGORIES = [
  'Login Issue',
  'Registration Issue',
  'Donation Problem',
  'Pickup Issue',
  'Volunteer Issue',
  'Payment Issue',
  'Bug Report',
  'Other'
];

const PRIORITIES = [
  { id: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' },
  { id: 'Medium', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  { id: 'High', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
  { id: 'Critical', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800' }
];

const ReportIssue = () => {
  const [priority, setPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueId, setIssueId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and ID generation
    setTimeout(() => {
      const generatedId = `FB-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;
      setIssueId(generatedId);
      setIsSubmitting(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(issueId);
    // You could trigger a toast here if ToastProvider was easily accessible
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Report a Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encountered an issue? Let us know the details so our engineering team can squash the bugs.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {issueId ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl text-center"
            >
              <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-primary-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Report Submitted Successfully</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Thank you for reporting this issue. Our team has been notified and will investigate it immediately.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl max-w-md mx-auto mb-8 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Your Issue Tracking ID</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white">{issueId}</span>
                  <button onClick={copyToClipboard} className="p-2 text-gray-500 hover:text-primary-500 transition-colors" title="Copy to clipboard">
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button className="px-8 py-4 rounded-xl font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:scale-105 transition-transform">
                  Track Issue
                </button>
                <button 
                  onClick={() => setIssueId('')}
                  className="px-8 py-4 rounded-xl font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  Report Another
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl space-y-8"
            >
              
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="jane@example.com" />
                </div>
              </div>

              {/* Issue Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issue Category</label>
                  <select required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow">
                    <option value="" disabled selected>Select a category...</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issue Title</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="e.g. Cannot upload food image" />
                </div>
              </div>

              {/* Priority Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority Level</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PRIORITIES.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPriority(p.id)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        priority === p.id 
                          ? `${p.color} ring-2 ring-offset-2 dark:ring-offset-gray-950 ring-${p.id === 'Critical' ? 'red' : p.id === 'High' ? 'orange' : p.id === 'Medium' ? 'blue' : 'green'}-500 shadow-md` 
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {p.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea required rows="5" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow resize-none" placeholder="Please provide as much detail as possible to help us reproduce the issue..."></textarea>
              </div>

              {/* Environment Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Browser</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="e.g. Chrome 120" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Device</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="e.g. iPhone 14 Pro, Windows 11" />
                </div>
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Screenshot</label>
                  <label className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-pointer transition-colors">
                    <Upload size={24} />
                    <span className="text-sm">Click to upload image</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Video <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <label className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-pointer transition-colors">
                    <Upload size={24} />
                    <span className="text-sm">Click to upload video</span>
                    <input type="file" className="hidden" accept="video/*" />
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Submit Bug Report <Bug size={18} /></>
                )}
              </button>

            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReportIssue;
