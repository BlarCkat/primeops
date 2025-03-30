/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import BottomNavigationBarComponent from "@/components/ui/BottomBar.component";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const { data: {user}, error} = await supabase.auth.getUser();
        if (error) throw error;
        
        if (!user) {
          router.push('/landing');
          return;
        }

        setUser(user);
      } catch (error:any) {
        console.error("Error fetching user: ", error);
        router.push('/auth')
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p>hello there {user?.email}</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen lg:w-[500px]">
      
        
        {/* Main content */}
        {children}

      {/* Navigation bar */}
      <BottomNavigationBarComponent/>
    </main>
  );
};

export default MainLayout;