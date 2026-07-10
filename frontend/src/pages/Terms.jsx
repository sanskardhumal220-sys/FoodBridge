import { motion } from 'framer-motion';
import { BookOpen, UserCheck, ShieldAlert, Users, Truck, AlertTriangle, Ban, Scale, Copyright, RefreshCw, Mail, CheckCircle } from 'lucide-react';

const Terms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <BookOpen className="w-6 h-6 text-primary-500" />,
      content: "Welcome to FoodBridge. By accessing or using our platform, you agree to be bound by these Terms & Conditions. Please read them carefully before participating in our food rescue network."
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: <UserCheck className="w-6 h-6 text-accent-500" />,
      content: "All users must provide accurate registration information, maintain the security of their accounts, and use the platform solely for its intended purpose of food donation and rescue."
    },
    {
      id: "food-guidelines",
      title: "Food Donation Guidelines",
      icon: <ShieldAlert className="w-6 h-6 text-green-500" />,
      content: "Donated food must be safe for human consumption, properly stored, and accurately described. Food beyond its safe consumption window or showing signs of spoilage is strictly prohibited."
    },
    {
      id: "donor-responsibilities",
      title: "Donor Responsibilities",
      icon: <CheckCircle className="w-6 h-6 text-primary-500" />,
      content: "Donors are responsible for the initial quality and safety of the food. They must pack the food hygienically and be available at the agreed-upon time for pickup by volunteers or NGOs."
    },
    {
      id: "ngo-responsibilities",
      title: "NGO Responsibilities",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      content: "NGOs must verify the food upon receipt, maintain appropriate storage conditions, and distribute the food to end beneficiaries fairly and without charge."
    },
    {
      id: "volunteer-responsibilities",
      title: "Volunteer Responsibilities",
      icon: <Truck className="w-6 h-6 text-orange-500" />,
      content: "Volunteers must handle food safely during transit, ensure timely delivery, and respect the privacy and dignity of both donors and beneficiaries."
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: <Ban className="w-6 h-6 text-red-500" />,
      content: "Selling donated food, harassing other users, uploading false data, bypassing the FoodBrain AI safety checks, and using the platform for any illegal activities are strictly forbidden."
    },
    {
      id: "account-suspension",
      title: "Account Suspension Policy",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      content: "FoodBridge reserves the right to suspend or terminate accounts that violate these terms, repeatedly donate unsafe food, or fail to fulfill accepted pickups/deliveries without notice."
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: <Scale className="w-6 h-6 text-gray-500" />,
      content: "While FoodBridge uses AI to assist in safety checks, we act only as an intermediary platform. We are not liable for any health issues, damages, or losses resulting from the consumption of donated food."
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <Copyright className="w-6 h-6 text-purple-500" />,
      content: "All platform content, logos, AI algorithms (FoodBrain), and design elements are the exclusive property of FoodBridge and may not be copied or reproduced without permission."
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      icon: <RefreshCw className="w-6 h-6 text-primary-500" />,
      content: "We may update these terms periodically. Continued use of the platform after changes constitutes acceptance of the new terms. Users will be notified of significant changes."
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <Mail className="w-6 h-6 text-accent-500" />,
      content: "If you have any questions regarding these Terms & Conditions, please contact our legal team at legal@foodbridge.com."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-100/50 to-transparent dark:from-primary-900/20 dark:to-transparent -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-accent-200/30 dark:bg-accent-900/20 blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: June 25, 2026</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section) => (
            <motion.div 
              key={section.id} 
              variants={itemVariants}
              className="glass p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          By using FoodBridge, you agree to these terms. Thank you for making a difference.
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
