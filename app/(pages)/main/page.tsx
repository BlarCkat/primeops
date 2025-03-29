"use client"

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCpuDuotone, PiFilesDuotone, PiHouseDuotone, PiUserCircleDuotone } from "react-icons/pi";

const MainView = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const { data: {user}, error} = await supabase.auth.getUser();
                if (error) throw error;
                
                if (!user) {
                    router.push('/auth');
                    return;
                }
    
                setUser(user);
                } 
            
            catch (error:any) {
                    console.error("Error fetching user: ", error);
                    router.push('/auth')
                }
                finally {
                    setLoading(false);
                };
                
            };
            fetchUser();
    }, [router])

    const handleSignOut = async()=>{
        try {
            const {error} = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error:any) {
            console.error("Error Signing out", error)
        }
    }

    if (loading) {
        return (
        <>
        <main className="h-screen w-screen flex items-center justify-center">
            <p>Loading...</p>
        </main>
        </>
        )
    }


    return ( 
        <>
        <main className="h-screen w-screen">
            <h2>{user?.email}</h2>

            <div className="absolute z-[9] bottom-0 left-0 bottombar flex gap-2 w-screen h-[60px] items-center justify-between px-[10vw]">
                <PiHouseDuotone size={32}/>
                <PiFilesDuotone size={32}/>
                <PiCpuDuotone size={32}/>
                <PiUserCircleDuotone size={32}/>
            </div>
        </main>
        </>
     );
}
 
export default MainView;