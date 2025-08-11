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
          className="flex h-[4.5vw] w-[4.5vw] cursor-pointer items-center justify-center rounded-full backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30 hover:from-white/30 hover:to-white/20 hover:border-primary/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/30 group relative overflow-hidden"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
          
          <div className={`burger ${isActive && 'burgerActive'}`}></div>
        </button>
      </div>
      <button 
        title="your_agency_name" 
        data-cursor-hover
        data-cursor-text="Home"
        className="p-[2vw] fixed z-[100] top-0 left-0 group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-br-3xl border-r border-b border-white/20 hover:from-white/15 hover:to-white/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
        
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
