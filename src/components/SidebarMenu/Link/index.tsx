'use client';

import { motion } from 'framer-motion';
import { slide, scale } from '@/shared/utils/animations';
import { FC, useState } from 'react';

interface Props {
  data: any;
  isActive: boolean;
  setSelectedIndicator: any;
  handleClick: () => void;
}

const Index: FC<Props> = ({ data, isActive, setSelectedIndicator, handleClick }) => {
  const { title, href, index } = data;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => {
        setSelectedIndicator(href);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={handleClick}
    >
      {/* Background hover effect */}
      <motion.div
        className="absolute inset-0 -inset-x-[1vw] rounded-2xl backdrop-blur-sm bg-gradient-to-r from-primary/10 via-white/5 to-transparent border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          scale: isActive ? 1 : 0.95,
          x: isActive ? 0 : -10
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Content container */}
      <div className="relative flex items-center p-[1vw] md:p-[1.5vw]">
        {/* Animated indicator */}
        <motion.div
          className="absolute left-0 flex items-center"
          variants={scale}
          animate={isActive ? 'open' : 'closed'}
        >
          <motion.div 
            className="w-[0.8vw] h-[0.8vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full bg-gradient-to-r from-primary via-white to-primary shadow-lg shadow-primary/50"
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
              rotate: isActive ? [0, 180, 360] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
          
          {/* Trailing glow */}
          <motion.div
            className="absolute inset-0 w-[0.8vw] h-[0.8vw] md:w-[1.5vw] md:h-[1.5vw] rounded-full bg-primary/30 blur-sm"
            animate={{
              scale: isActive ? [1, 1.5, 1] : 0,
              opacity: isActive ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Link text */}
        <motion.div 
          tabIndex={0} 
          data-cursor-hover
          data-cursor-text={`Navigate to ${title}`}
          className="cursor-pointer ml-[2vw] md:ml-[3vw] relative overflow-hidden"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.h3
            className="text-[2.2vw] md:text-[4vw] font-bold leading-[1.2] tracking-wide relative z-10"
            animate={{
              color: isActive ? '#CCC2DC' : '#E6E0E9',
              textShadow: isActive ? '0 0 20px rgba(204, 194, 220, 0.5)' : 'none',
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          {/* Text background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-white/10 to-transparent rounded-lg blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -20,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Underline effect */}
          <motion.div
            className="absolute bottom-0 left-0 h-[0.2vw] bg-gradient-to-r from-primary to-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isActive ? '100%' : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: '-200%' }}
            animate={{ x: isHovered ? '200%' : '-200%' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Arrow indicator */}
        <motion.div
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            x: isActive ? 0 : 10,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            className="w-[1.2vw] h-[1.2vw] md:w-[2.5vw] md:h-[2.5vw] text-primary"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[0.1vw] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Index;