/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiLockFill } from "react-icons/pi";

const HomeView = () => {
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
        <main className="min-h-screen h-[2000px] w-screen bg-pattern">
            <div className="overflow-x-hidden w-full h-full">
            <h2 className="hidden">{user?.email}</h2>
            <div className="w-full h-fit flex items-center justify-center p-6">
                {/* <Image src={'/img/dashboard.svg'} width={400} height={400} alt="image" /> */}
                
                
                <div className="absolute top-5 bg-blue-500 rounded-sm w-[100px] h-[100px] p-1">
                    <div className="absolute top-0 left-0"><Image src={'/img/module-1.svg'} alt="image" height={80} width={80}/></div>
                    <div className="w-full h-[90%] bg-blue-300 rounded-sm"></div>
                </div>

                <div className="absolute top-[25%] right-5 bg-amber-500 rounded-sm w-[100px] h-[100px] p-1">
                    <div className="absolute top-0 center-0"><Image src={'/img/module-2.svg'} alt="image" height={80} width={80}/></div>
                    <div className="w-full h-[90%] bg-amber-300 rounded-sm"></div>
                </div>
                
                <div className="absolute top-[40%] left-5 bg-green-500 rounded-sm w-[100px] h-[100px] p-1">
                    <div className="absolute top-0 center-0"><Image src={'/img/module-3.svg'} alt="image" height={80} width={80}/></div>
                    <div className="w-full h-[90%] bg-green-300 rounded-sm"></div>
                </div>

                <div className="absolute top-[60%] bg-blue-500 rounded-sm w-[100px] h-[100px] p-1">
                <div className="absolute top-0 w-full h-full flex items-center justify-center"><Image src={'/img/module-1.svg'} alt="image" height={80} width={80}/></div>
                    <div className="w-full h-[90%] bg-blue-300 rounded-sm"></div>
                </div>

                <div className="absolute top-[80%] right-5 bg-blue-500 rounded-sm w-[100px] h-[100px] p-1">
                    <div className="absolute top-0 center-0 w-full h-full flex items-center justify-center"><Image src={'/img/module-3.svg'} alt="image" height={80} width={80}/></div>
                    <div className="w-full h-[90%] bg-blue-300 rounded-sm"></div>
                </div>

                <div className="absolute top-[100%] left-5 bg-gray-300 rounded-sm w-[100px] h-[100px] p-1">
                    <div className="w-full h-[90%] bg-gray-100 rounded-sm flex items-center justify-center"><PiLockFill size={60} className="text-gray-300"/></div>
                </div>

                <div className="absolute top-[120%] bg-gray-300 rounded-sm w-[100px] h-[100px] p-1">
                <div className="w-full h-[90%] bg-gray-100 rounded-sm flex items-center justify-center"><PiLockFill size={60} className="text-gray-300"/></div>
                </div>


            </div>
            </div>
        </main>
        </>
     );
}
 
export default HomeView;