'use client';

import { FC, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Props {}

const AdvancedCursor: FC<Props> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 800 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hover states for interactive elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [data-cursor-hover], input, textarea')) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Add hover listeners to interactive elements
    document.addEventListener('mouseenter', handleElementHover, true);
    document.addEventListener('mouseleave', handleElementLeave, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleElementHover, true);
      document.removeEventListener('mouseleave', handleElementLeave, true);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor - pointer style */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 }
        }}
      >
        <div className="w-full h-full relative">
          {/* Pointer shape */}
          <div 
            className="w-full h-full bg-white relative"
            style={{
              clipPath: 'polygon(0 0, 0 80%, 30% 60%, 50% 100%, 60% 50%, 80% 30%, 100% 50%, 50% 0)',
              transform: 'rotate(-45deg)',
            }}
          />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.div
              className="absolute top-full left-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap"
              style={{ x: '-50%' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {cursorText}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isVisible ? 0.4 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-primary/60 blur-sm" />
      </motion.div>
    </>
  );
};

export default AdvancedCursor;