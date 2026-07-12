import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Clock, MessageSquare, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { useState } from 'react';
const Contact = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000); // Reset after 5s
    }, 1500);
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t("contact.text1")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("contact.text2")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Left Column: Contact Info & Map */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.1
        }} className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="glass p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("contact.text3")}</h3>
              
              <ContactRow icon={<Mail />} title={t("contact.attr4")} value="dhumalhema4@gmail.com" />
              <ContactRow icon={<Phone />} title={t("contact.attr5")} value="+91 74899 12494" />
              <ContactRow icon={<MapPin />} title={t("contact.attr6")} value="Harishankarpuram, Gwalior 474001" />
              <ContactRow icon={<Globe />} title={t("contact.attr7")} value="www.foodbridge.com" />
              <ContactRow icon={<Clock />} title={t("contact.attr8")} value="Mon - Fri, 9:00 AM - 6:00 PM" />

              {/* Social Media */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">{t("contact.text9")}</p>
                <div className="flex gap-4">
                  <SocialIcon Icon={FaFacebook} color="text-[#1877F2]" />
                  <SocialIcon Icon={FaInstagram} color="text-[#E4405F]" />
                  <SocialIcon Icon={FaLinkedin} color="text-[#0A66C2]" />
                  <SocialIcon Icon={FaXTwitter} color="text-gray-900 dark:text-white" />
                  <SocialIcon Icon={FaGithub} color="text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:border-primary-500 hover:text-primary-500 transition-all shadow-sm">
                <MessageSquare size={18} />{t("contact.text10")}</button>
              <button className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:border-accent-500 hover:text-accent-500 transition-all shadow-sm">
                <Mail size={18} />{t("contact.text11")}</button>
            </div>

            {/* Map Placeholder */}
            <div className="glass h-64 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <iframe title={t("contact.attr12")} src="https://maps.google.com/maps?q=Harishankarpuram,%20Gwalior&t=&z=13&ie=UTF8&iwloc=&output=embed" className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.2
        }} className="lg:col-span-3">
            <div className="glass p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-primary-500 to-accent-500" />
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t("contact.text13")}</h2>
              
              {isSuccess ? <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t("contact.text14")}</h3>
                  <p>{t("contact.text15")}</p>
                </motion.div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("contact.text16")}</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder={t("contact.attr17")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("contact.text18")}</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder={t("contact.attr19")} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("contact.text20")}</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("contact.text21")}</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow" placeholder={t("contact.attr22")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("contact.text23")}</label>
                    <textarea required rows="6" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white transition-shadow resize-none" placeholder={t("contact.attr24")}></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>{t("contact.text25")}<Send size={18} /></>}
                  </button>
                </form>}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>;
};
const ContactRow = ({
  icon,
  title,
  value
}) => <div className="flex items-start gap-4">
    <div className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>;
const SocialIcon = ({
  Icon,
  color
}) => <a href="#" className={`p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform ${color}`}>
    <Icon className="w-5 h-5" />
  </a>;
export default Contact;