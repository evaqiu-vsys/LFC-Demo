import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Trophy, ShoppingBag, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mainRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const currentScrollY = mainRef.current.scrollTop;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <main ref={mainRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-md mx-auto min-h-full bg-gray-50 relative">
          <Outlet />
        </div>
      </main>
      
      {/* Floating Navigation Bar */}
      <nav 
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-md mx-auto px-4 pb-6 pt-2">
          <div className="glass rounded-2xl shadow-elevated border border-gray-200/50 px-2 py-2">
            <div className="flex justify-around items-center">
              <NavItem to="/home" icon={<Home size={22} />} label="Home" isActive={location.pathname === '/home'} />
              <NavItem to="/membership" icon={<Trophy size={22} />} label="Members" isActive={location.pathname === '/membership'} />
              <NavItem to="/marketplace" icon={<ShoppingBag size={22} />} label="Market" isActive={location.pathname === '/marketplace'} />
              <NavItem to="/my" icon={<User size={22} />} label="My" isActive={location.pathname === '/my'} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, isActive }: { to: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <NavLink
      to={to}
      className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'text-lfc-red' 
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
      }`}
    >
      {/* Active indicator background */}
      {isActive && (
        <div className="absolute inset-0 bg-lfc-red/10 rounded-xl animate-fade-in-up"></div>
      )}
      
      {/* Icon with animation */}
      <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
        {icon}
      </div>
      
      {/* Label */}
      <span className={`relative z-10 text-[10px] mt-1 font-medium transition-all duration-300 ${
        isActive ? 'font-bold' : ''
      }`}>
        {label}
      </span>
      
      {/* Active dot indicator */}
      {isActive && (
        <div className="absolute -bottom-0.5 w-1 h-1 bg-lfc-red rounded-full"></div>
      )}
    </NavLink>
  );
}