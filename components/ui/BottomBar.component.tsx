"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  PiHouseDuotone, 
  PiFilesDuotone, 
  PiCpuDuotone, 
  PiUserCircleDuotone,
  PiHouseFill,
  PiFilesFill,
  PiCpuFill, 
  PiUserCircleFill 
} from "react-icons/pi";

type NavItem = {
  path: string;
  label: string;
  activeIcon: React.ElementType;
  inactiveIcon: React.ElementType;
}

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { 
      path: '/home', 
      label: 'Home', 
      activeIcon: PiHouseFill, 
      inactiveIcon: PiHouseDuotone 
    },
    { 
      path: '/lessons', 
      label: 'Lessons', 
      activeIcon: PiFilesFill, 
      inactiveIcon: PiFilesDuotone 
    },
    { 
      path: '/ai', 
      label: 'AI', 
      activeIcon: PiCpuFill, 
      inactiveIcon: PiCpuDuotone 
    },
    { 
      path: '/account', 
      label: 'Account', 
      activeIcon: PiUserCircleFill, 
      inactiveIcon: PiUserCircleDuotone 
    }
  ];

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <div className="fixed z-[9] bottom-0 left-0 shadow-lg w-screen h-[60px] flex items-center justify-between px-[10vw] bg-white">
      {navItems.map((item) => {
        const active = isActive(item.path);
        const IconComponent = active ? item.activeIcon : item.inactiveIcon;
        
        return (
          <Link 
            href={item.path} 
            key={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
              active 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-400'
            }`}
          >
            <IconComponent size={28} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;