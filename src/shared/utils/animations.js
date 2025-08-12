export const menuSlide = {
  initial: { 
    x: 'calc(100% + 100px)',
    opacity: 0,
    scale: 0.98
  },
  enter: { 
    x: '0',
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.05
    } 
  },
  exit: { 
    x: 'calc(100% + 100px)',
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.3, 
      ease: [0.4, 0, 0.2, 1] 
    } 
  },
};

export const slide = {
  initial: { 
    x: 30, 
    opacity: 0,
    scale: 0.95
  },
  enter: (i) => ({ 
    x: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1], 
      delay: 0.05 + 0.03 * i 
    } 
  }),
  exit: {
    x: 20,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const scale = {
  open: { 
    scale: 1, 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.4, 0, 0.2, 1],
      delay: 0.05 
    } 
  },
  closed: { 
    scale: 0, 
    opacity: 0,
    x: -10,
    transition: { 
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

// New animations for enhanced sidebar
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scaleIn = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
