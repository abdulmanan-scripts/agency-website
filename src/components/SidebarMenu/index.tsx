'use client';

import { FC, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import CustomLink from './Link';
import { NAV_ITEMS } from '@/data';
import { menuSlide } from '@/shared/utils/animations';

interface Props {
  close: () => void;
}

const Index: FC<Props> = ({ close }) => {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const smoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    close();
  };

  return (
    <>
      {/* Enhanced backdrop with animated blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[3999] bg-black/30 backdrop-blur-xl"
        onClick={close}
      />
      
      {/* Main sidebar container */}
      <motion.div
        ref={containerRef}
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="fixed right-0 top-0 z-[4000] h-screen w-[35vw] md:w-[90vw] overflow-hidden"
      >
        {/* Multi-layered glassmorphism background */}
        <div className="absolute inset-0">
          {/* Base glass layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-bg-1/80 via-bg-2/90 to-gray-1/70" />
          
          {/* Secondary glass layer with different blur */}
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-stroke/10" />
          
          {/* Border gradients */}
          <div className="absolute inset-0 border-l-2 border-gradient-to-b from-primary/40 via-white/20 to-stroke/30" />
          <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs with enhanced animations */}
          <motion.div
            className="absolute top-[15%] right-[20%] w-40 h-40 rounded-full bg-primary/15 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[60%] left-[10%] w-32 h-32 rounded-full bg-stroke/20 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.6, 0.2],
              x: [0, -15, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[30%] w-24 h-24 rounded-full bg-white/10 blur-xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(204, 194, 220, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(74, 68, 88, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content container with enhanced layout */}
        <div className="relative z-10 h-full flex flex-col p-[3vw] md:p-[4vw]">
          {/* Header section with enhanced styling */}
          <motion.div 
            className="mb-[3vw] md:mb-[4vw]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Close button */}
            <motion.button
              onClick={close}
              className="absolute top-[2vw] right-[2vw] w-[3vw] h-[3vw] md:w-[6vw] md:h-[6vw] rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center group hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-[1.2vw] h-[1.2vw] md:w-[2.5vw] md:h-[2.5vw] text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Title section */}
            <div className="space-y-[0.5vw]">
              <motion.h2 
                className="text-[2.5vw] md:text-[5vw] font-bold bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Navigation
              </motion.h2>
              <motion.div 
                className="h-[0.15vw] bg-gradient-to-r from-primary via-white to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Navigation links with enhanced layout */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div 
              className="space-y-[1vw] md:space-y-[2vw]"
              onMouseLeave={() => setSelectedIndicator(null)}
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.05, 
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <CustomLink
                    handleClick={() => smoothScroll(item.href)}
                    data={{ ...item, index }}
                    isActive={selectedIndicator === item.href}
                    setSelectedIndicator={setSelectedIndicator}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer section with enhanced design */}
          <motion.div 
            className="space-y-[1.5vw] md:space-y-[3vw]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {/* Divider */}
            <div className="h-[0.1vw] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* GitHub button with enhanced design */}
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Shatlyk1011/agency-website"
              data-cursor-hover
              data-cursor-text="Star on GitHub"
              className="group relative overflow-hidden"
            >
              <motion.div
                className="relative backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl p-[1.2vw] md:p-[2vw] transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-stroke/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center justify-center gap-[1vw] md:gap-[2vw]">
                  <motion.svg
                    className="w-[1.8vw] h-[1.8vw] md:w-[3.5vw] md:h-[3.5vw] text-white/80 group-hover:text-primary transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </motion.svg>
                  <div className="text-center">
                    <p className="text-[1.2vw] md:text-[2.5vw] font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                      Give a Star
                    </p>
                    <p className="text-[0.8vw] md:text-[1.8vw] text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      Support the project
                    </p>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              </motion.div>
            </Link>

            {/* Additional info */}
            <motion.div 
              className="text-center space-y-[0.5vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p className="text-[0.9vw] md:text-[2vw] text-white/50">
                © 2024 Creative Agency
              </p>
              <div className="flex justify-center space-x-[1vw] text-[0.8vw] md:text-[1.8vw] text-white/40">
                <span>Privacy</span>
                <span>•</span>
                <span>Terms</span>
                <span>•</span>
                <span>Contact</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Edge glow effect */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-primary/40 via-white/60 to-stroke/40" />
      </motion.div>
    </>
  );
};

export default Index;