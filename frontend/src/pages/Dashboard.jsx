import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DonorDashboard from './DonorDashboard';
import NGODashboard from './NGODashboard';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  // Select vibrant, premium gradients based on role
  const getBackgroundClass = () => {
    switch(user.role) {
      case 'Donor':
        return 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-rose-950/20';
      case 'NGO':
        return 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/20';
      case 'Volunteer':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-950 dark:via-indigo-950/20 dark:to-violet-950/20';
      default:
        return 'bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <div className={`w-full min-h-[calc(100vh-64px)] transition-colors duration-500 ${getBackgroundClass()}`}>
      {user.role === 'Donor' && <DonorDashboard />}
      {user.role === 'NGO' && <NGODashboard />}
      {user.role === 'Volunteer' && <VolunteerDashboard />}
      {user.role === 'Admin' && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
