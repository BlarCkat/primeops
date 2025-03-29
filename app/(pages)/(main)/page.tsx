/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import BottomNavigationBarComponent from "@/components/ui/BottomBar.component";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
                    console.error("Error fetching this user: ", error);
                    router.push('/auth')
                }
                finally {
                    setLoading(false);
                };
                
            };
            fetchUser();
    }, [router])

    // const handleSignOut = async()=>{
    //     try {
    //         const {error} = await supabase.auth.signOut();
    //         if (error) throw error;
    //     } catch (error:any) {
    //         console.error("Error Signing out", error)
    //     }
    // }

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

            <BottomNavigationBarComponent/>
        </main>
        </>
     );
}
 
export default MainView;