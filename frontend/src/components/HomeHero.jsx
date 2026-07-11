import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const HomeHero = ({ t }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 800 } },
      color: { value: "#10b981" },
      shape: { type: "circle" },
      opacity: { value: 0.2, random: true },
      size: { value: 3, random: true },
      move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" },
      links: { enable: true, distance: 150, color: "#10b981", opacity: 0.1, width: 1 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } } }
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white pt-20">
      {/* Background World Map Image / Particles */}
      <div className="absolute inset-0 z-0">
        <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0" />
        <div className="absolute inset-0 bg-[url('/world-map.svg')] bg-center bg-no-repeat bg-contain opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
      </div>

      {/* Floating Emojis */}
      <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-[10%] text-5xl z-10 hidden lg:block">🍎</motion.div>
      <motion.div animate={{ y: [15, -15, 15], rotate: [0, -10, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-1/3 left-[15%] text-6xl z-10 hidden lg:block">🍲</motion.div>
      <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 15, -15, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-[15%] text-5xl z-10 hidden lg:block">🥗</motion.div>
      <motion.div animate={{ y: [20, -20, 20], rotate: [0, -15, 15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 3 }} className="absolute bottom-1/4 right-[10%] text-6xl z-10 hidden lg:block">🍞</motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, type: 'spring' }} 
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass-card border border-primary-500/30 text-primary-300 font-semibold text-sm shadow-xl shadow-primary-500/10"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
          </span>
          Next-Gen Food Rescue Platform
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }} 
          className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]"
        >
          Bridging Surplus Food <br className="hidden md:block"/> with <span className="text-gradient font-black">People in Need.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.4 }} 
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          AI-powered food redistribution platform connecting donors, NGOs, and volunteers to reduce hunger and environmental waste.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }} 
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link to="/register" className="group glow-border bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
            Donate Food
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/dashboard" className="glass-card text-white hover:text-primary-400 px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center border border-white/10 hover:border-primary-500/50">
            Explore NGOs
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
