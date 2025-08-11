'use client';

import { FC, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/shared/utils';

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  hover3D?: boolean;
}

const GlassmorphismCard: FC<Props> = ({ 
  children, 
  className, 
  intensity = 'medium',
  hover3D = true 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hover3D) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const intensityClasses = {
    light: 'backdrop-blur-sm bg-white/5 border-white/10',
    medium: 'backdrop-blur-md bg-white/10 border-white/20',
    heavy: 'backdrop-blur-lg bg-white/15 border-white/30'
  };

  return (
    <motion.div
      ref={ref}
      style={hover3D ? {
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl border transition-all duration-300',
        'shadow-2xl shadow-black/20',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100 hover:shadow-3xl hover:shadow-primary/20',
        intensityClasses[intensity],
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative z-10" style={{ transform: "translateZ(75px)" }}>
        {children}
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-stroke/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
      </div>
    </motion.div>
  );
};

export default GlassmorphismCard;