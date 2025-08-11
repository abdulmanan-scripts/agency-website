'use client';
import { FC, useEffect, useState } from 'react';

import SidebarMenu from '@/components/SidebarMenu';
import { AnimatePresence } from 'framer-motion';
import { LogoIcon } from '@/icons/ApproachIcons/LogoIcon';

interface Props {}

const Index: FC<Props> = () => {
  const [isActive, setIsActive] = useState(false);
  const closeSidebar = () => setIsActive(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActive(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return (
    <div >
      <div className="fixed right-0 z-[4001] p-[2vw]">
        <button
          type="button"
          data-cursor-hover
          data-cursor-text={isActive ? "Close Menu" : "Open Menu"}
          onClick={() => setIsActive(!isActive)}
          className="flex h-[4.5vw] w-[4.5vw] cursor-pointer items-center justify-center rounded-full backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 group">
          <div className={`burger ${isActive && 'burgerActive'}`}></div>
        </button>
      </div>
      <button 
        title="your_agency_name" 
        data-cursor-hover
        data-cursor-text="Home"
        className="p-[2vw] fixed z-[100] top-0 left-0 group backdrop-blur-sm bg-white/5 rounded-br-2xl border-r border-b border-white/10 hover:bg-white/10 transition-all duration-300"
      >
        <LogoIcon className="w-[5vw] h-[5vw] group-hover:text-white/80 transition duration-300" />
      </button>
      <AnimatePresence mode="wait">{isActive && (
        <SidebarMenu close={closeSidebar} />
      )}
      </AnimatePresence>
    </div>
  );
};
export default Index;
