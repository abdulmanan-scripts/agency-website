import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';

interface Props {
  card: any;
}

const Index: FC<Props> = ({ card: { title, services, description, number, classes } }) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });
  return (
    <motion.div 
      ref={ref} 
      key={number} 
      className="px-[6vw] md:px-[3vw] pb-[9.5vw] last:pb-[13vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h4 
        className="text-[3.7vw] md:text-[7vw] md:mt-[3vw] font-light mb-[2vw]"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {title}
      </motion.h4>
      
      <GlassmorphismCard 
        className={`p-[2vw] ${classes}`}
        intensity="light"
      >
        <div className="flex items-start space-x-[3vw] md:space-x-0 md:flex-col">
          <div className="flex-1 md:mb-[2vw]">
            <div className="flex flex-wrap space-y-[2vw] md:space-y-[1.5vw]">
              {services.map((service: string[], i: number) => {
                return (
                  <motion.ul 
                    key={i} 
                    className="flex items-center space-x-[5vw] text-[1.7vw] md:text-[3vw] font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    {service.map((s, idx) => (
                      <li key={s} className="flex items-center space-x-[0.6vw]">
                        <motion.div 
                          className="h-[1.2vw] w-[1.2vw] rounded-full bg-gradient-to-r from-primary to-white shadow-lg shadow-primary/50"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <p className="hover:text-primary transition-colors duration-300">{s}</p>
                      </li>
                    ))}
                  </motion.ul>
                );
              })}
            </div>
          </div>

          <div className="relative flex-1">
            <motion.p 
              className="relative z-[2000] line-clamp-4 text-[1.5vw] md:text-[3vw] font-medium leading-[1.7] md:text-balance md:leading-[1.5] md:mt-[3vw] text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {description}
            </motion.p>
            <motion.div 
              className="absolute right-[6vw] top-[1.8vw] z-[1] text-right text-[16vw] font-extrabold tracking-[5%] text-gray-1/30 md:text-[28vw] md:top-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ scale: 1.05, color: 'rgba(204, 194, 220, 0.2)' }}
            >
              {number}
            </motion.div>
          </div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};
export default Index;
