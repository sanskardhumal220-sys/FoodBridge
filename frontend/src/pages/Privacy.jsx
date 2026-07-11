import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { Shield, Database, Activity, MapPin, Camera, Cookie, Lock, Share2, UserCheck, Trash2, Mail } from 'lucide-react';
const Privacy = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };
  const policies = [{
    id: "introduction",
    title: "Introduction",
    icon: <Shield className="w-6 h-6 text-primary-500" />,
    content: "FoodBridge is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our platform."
  }, {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: <Database className="w-6 h-6 text-blue-500" />,
    content: "We collect information you provide directly to us, such as your name, email address, phone number, and organization details (if applicable) when you register an account."
  }, {
    id: "how-we-use-data",
    title: "How We Use Data",
    icon: <Activity className="w-6 h-6 text-green-500" />,
    content: "Your data is used to facilitate food donations, match donors with NGOs, communicate updates, improve our AI algorithms (FoodBrain), and ensure the safety of our community."
  }, {
    id: "location-permissions",
    title: "Location Permissions",
    icon: <MapPin className="w-6 h-6 text-orange-500" />,
    content: "We request location access to show you nearby donations or NGOs and to accurately route volunteers. Your precise location is only shared during active donation pickups."
  }, {
    id: "image-upload-permissions",
    title: "Image Upload Permissions",
    icon: <Camera className="w-6 h-6 text-purple-500" />,
    content: "Images of food uploaded to the platform are analyzed by our FoodBrain AI for safety and freshness. These images may be stored securely to improve our AI models."
  }, {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: <Cookie className="w-6 h-6 text-yellow-500" />,
    content: "We use cookies and local storage to remember your preferences (like Dark Mode), keep you logged in, and understand how you interact with our platform."
  }, {
    id: "data-security",
    title: "Data Security",
    icon: <Lock className="w-6 h-6 text-red-500" />,
    content: "We implement industry-standard encryption and security measures to protect your personal information from unauthorized access, alteration, or disclosure."
  }, {
    id: "data-sharing",
    title: "Data Sharing Policy",
    icon: <Share2 className="w-6 h-6 text-indigo-500" />,
    content: "We do not sell your personal data. Information is only shared with verified NGOs or volunteers explicitly for the purpose of completing a scheduled food rescue."
  }, {
    id: "user-rights",
    title: "Your User Rights",
    icon: <UserCheck className="w-6 h-6 text-teal-500" />,
    content: "You have the right to access, correct, or download the personal data we hold about you. You may update your profile information at any time through your dashboard."
  }, {
    id: "account-deletion",
    title: "Account Deletion",
    icon: <Trash2 className="w-6 h-6 text-gray-500" />,
    content: "You may request the permanent deletion of your account and associated data by contacting support. Some data may be retained for legal or security purposes."
  }, {
    id: "contact",
    title: "Contact Information",
    icon: <Mail className="w-6 h-6 text-accent-500" />,
    content: "For any privacy-related concerns or data requests, please contact our Data Protection Officer at privacy@foodbridge.com."
  }];
  return <div className="min-h-screen bg-white dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/40 dark:bg-accent-900/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5
      }} className="text-center mb-16">
          <div className="inline-block mb-4 p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
            <Shield className="w-12 h-12 text-primary-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t("privacy.text1")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t("privacy.text2")}</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-6">
          {policies.map(policy => <motion.div key={policy.id} variants={itemVariants} className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 transform scale-150 translate-x-4 -translate-y-4">
                {policy.icon}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {policy.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{policy.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {policy.content}
                </p>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </div>;
};
export default Privacy;