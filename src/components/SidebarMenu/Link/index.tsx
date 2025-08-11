import { motion } from 'framer-motion';
import { slide, scale } from '@/shared/utils/animations';

import { FC } from 'react';

interface Props {
  data: any;
  isActive: boolean;
  setSelectedIndicator: any;
  handleClick: () => void;
}

const Index: FC<Props> = ({ data, isActive, setSelectedIndicator, handleClick }) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center group"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={handleClick}
    >
      <motion.div
        className="absolute left-0 inline-block h-[0.6vw] w-[0.6vw] rounded-full bg-gradient-to-r from-primary to-white shadow-lg shadow-primary/50"
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
      ></motion.div>
      <div 
        tabIndex={0} 
        data-cursor-hover
        data-cursor-text={`Go to ${title}`}
        className="cursor-pointer text-[2.5vw] md:text-[3vw] leading-[1.35] md:leading-[1.25] font-semibold tracking-wide duration-300 transition-all hover:translate-x-[1.6vw] hover:text-primary hover:drop-shadow-lg relative"
      >
        {title}
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
      </div>
    </motion.div>
  );
};
export default Index;
