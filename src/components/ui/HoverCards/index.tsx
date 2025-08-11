import { FC, SVGProps, useState } from 'react';

import { cn } from '@/shared/utils';
import { AnimatePresence, motion } from 'framer-motion';
import GlassmorphismCard from '../GlassmorphismCard';

interface Props {
  cards: { title: string; icon: FC<SVGProps<SVGSVGElement>>; description: string }[];
  wrapperClasses?: string;
  itemClasses?: string;
}

const Index: FC<Props> = ({ cards, itemClasses, wrapperClasses }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className={cn('grid md:grid-cols-2 gap-4', itemClasses)}>
      {cards.map((card, idx) => (
        <GlassmorphismCard
          key={idx}
          className={cn('relative flex flex-col px-[1.4vw] py-[1.6vw] md:px-[2vw] md:py-[2vw] last:col-span-2 md:col-span-2', itemClasses)}
          intensity="medium"
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div className="flex items-center space-x-[0.6vw] mb-[1.2vw]">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <card.icon className="drop-shadow-lg" />
            </motion.div>
            <h6 className="text-[1.6vw] md:text-[3.5vw] md:tracking-tight font-semibold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              {card.title}
            </h6>
          </div>
          <p className="text-[1vw] md:text-[2.25vw] font-light leading-[1.5] md:leading-[1.2] md:tracking-tight text-white/90">
            {card.description}
          </p>
        </GlassmorphismCard>
      ))}
    </div>
  );
};
export default Index;
