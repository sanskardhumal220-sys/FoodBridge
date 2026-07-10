import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, XCircle, FileText } from 'lucide-react';
import { triggerNotification } from '../components/ToastProvider';

const AdminDashboard = () => {
  const [pendingNGOs, setPendingNGOs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingNGOs();
  }, []);

  const fetchPendingNGOs = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.get('http://localhost:5000/api/admin/ngos/pending', {
        headers: { Authorization: `Bearer ${userInfo.token}` } // Assume admin has token
      });
      setPendingNGOs(data);
    } catch (error) {
      console.error('Failed to fetch NGOs', error);
      triggerNotification('Failed to fetch pending NGOs');
    }
    setLoading(false);
  };

  const handleVerify = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.put(`http://localhost:5000/api/admin/ngos/${id}/verify`, { status }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      triggerNotification(`NGO ${status} successfully!`);
      setPendingNGOs(pendingNGOs.filter(ngo => ngo._id !== id));
    } catch (error) {
      console.error('Verification failed', error);
      triggerNotification('Verification action failed');
    }
  };

  const openCertificate = (base64) => {
    if (!base64) return alert('No certificate uploaded.');
    const newWindow = window.open();
    newWindow.document.write(`<iframe src="${base64}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert className="text-primary-500 w-8 h-8" />
        <h2 className="text-3xl font-bold dark:text-white">Admin Dashboard</h2>
      </div>

      <div className="glass p-8 rounded-3xl">
        <h3 className="text-xl font-bold mb-6 dark:text-white">Pending NGO Verifications</h3>
        
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading pending NGOs...</p>
        ) : pendingNGOs.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="mx-auto w-12 h-12 text-green-500 mb-4 opacity-50" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">All caught up! No pending verifications.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingNGOs.map((ngo, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={ngo._id} 
                className="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{ngo.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{ngo.email}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-1 uppercase tracking-wider">Status: {ngo.verificationStatus}</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => openCertificate(ngo.certificate)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl font-semibold transition-colors border border-blue-200 dark:border-blue-800"
                  >
                    <FileText size={18} /> View Cert
                  </button>
                  <button 
                    onClick={() => handleVerify(ngo._id, 'Approved')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-xl font-semibold transition-colors shadow-md shadow-green-500/20"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => handleVerify(ngo._id, 'Rejected')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-xl font-semibold transition-colors border border-red-200 dark:border-red-800"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
