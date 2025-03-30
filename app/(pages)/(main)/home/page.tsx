/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCoinFill, PiHeartFill, PiLightningFill, PiLockFill } from "react-icons/pi";
import { moduleData } from "@/lib/moduleData";
import Link from "next/link";

// Types
interface ModuleCardProps {
  color: 'blue' | 'amber' | 'green' | 'gray';
  iconSrc?: string;
  locked?: boolean;
  index: number;
  moduleId: number;
}

// Reusable ModuleCard component
const ModuleCard: React.FC<ModuleCardProps> = ({ color, iconSrc, locked = false, index, moduleId }) => {
  return (
    <Link href={locked ? "#" : `/modules/${moduleId}/questions/1`} legacyBehavior>
      <a className={`block ${!locked && "cursor-pointer"}`}>
        <div 
          className={`bg-${color}-${locked ? '300' : '500'} rounded-sm p-1 h-[100px] relative w-[100px] 
                    transition-all duration-300 hover:shadow-lg hover:scale-105 ${!locked && "cursor-pointer"}`}
          data-module-index={index}
        >
          {locked ? (
            <div className="w-full h-[90%] bg-gray-100 rounded-sm flex flex-col items-center justify-center">
              <PiLockFill size={40} className="text-gray-300 mb-1"/>
              <p className="text-xs text-gray-400">Coming Soon</p>
            </div>
          ) : (
            <>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                {iconSrc && <Image src={iconSrc} alt={`module ${index}`} height={80} width={80}/>}
              </div>
              <div className={`w-full h-[90%] bg-${color}-300 rounded-sm`}></div>
            </>
          )}
        </div>
      </a>
    </Link>
  );
};

const HomeView: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async(): Promise<void> => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (!user) {
          router.push('/auth');
          return;
        }

        setUser(user);
      } catch (error: any) {
        console.error("Error fetching user: ", error.message);
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-screen bg-gray-100 py-8 px-4 bg-pattern">
      <div className="container mx-auto max-w-7xl">
        {/* Optional welcome message or user info */}
        {user && (
          <div className="fixed z-[8] top-0 left-0 h-[80px] w-full p-4 bg-white flex items-center">
            
            <p className="text-gray-600 hidden">Hello, {user.email}</p>
            <div className="w-full flex gap-4 px-4 justify-between">
            <div className="w-full py-4 font-semibold flex gap-1"><PiLightningFill size={20} className="text-amber-500"/><p>500</p></div>
            <div className="w-full py-4 font-semibold flex gap-1"><PiHeartFill size={20} className="text-red-500"/><p>500</p></div>
            <div className="w-full py-4 font-semibold flex gap-1"><PiCoinFill size={20} className="text-blue-500"/><p>500</p></div>
            </div>
          </div>
        )}
        
        {/* Modules grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[70px]">
          {moduleData.map((module) => (
            <div key={module.id} className="flex flex-col items-center w-full">
              <ModuleCard
                index={module.id}
                moduleId={module.id}
                color={module.color}
                iconSrc={module.iconSrc}
                locked={module.locked}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomeView;