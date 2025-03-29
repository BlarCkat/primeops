/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { PiWarningCircleDuotone } from "react-icons/pi";

const AuthView = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentState, setCurrentState] = useState<"signup" | "login">();

    useEffect(()=>{
        setCurrentState('login');

        if (currentState === "signup") {
            setCurrentState("signup")
        }
        else {
            setCurrentState("login")
        }
    })

    const handleEmailLogin = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const {error} = await supabase.auth.signInWithPassword({
                email, password
            });

            if (error) {
                throw error;
            }
            router.push('/main');
        } catch (error:any) {
            setError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    // const handleGoogleLogin = async (): Promise<void>=>{
    //     try {
    //         const {error} = await supabase.auth.signInWithOAuth({
    //             provider: 'google',
    //         });
    //         if (error) throw error;
    //     } catch (error:any) {
    //         setError(error.message)
    //     }
    // }

    // 

    const handleEmailSignup = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false);
        }

        try {
            const {error} = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) throw error;
            router.push('/auth/signup/success')
        } catch (error:any) { 
            setError(error.message);
        }

    }

    // const handleGoogleSignup = async():Promise<void>=>{
    //     try {
    //         const {error} = await supabase.auth.signInWithOAuth({
    //             provider: "google",
    //             options: {
    //                 redirectTo:`${window.location.origin}/auth/callback`}
    //         })

    //         if (error) throw error
    //     } catch (error:any) {
    //         setError(error.message)
    //     }
    // }



    return ( 
        <>
        <main className="h-screen w-screen px-6 py-[40px]">
            
            {currentState === "login" && 
            <>
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-2 justify-between items-center w-full h-full pt-6">
                <div className="inputs w-full flex flex-col gap-4 ">
                <h2 className="text-6xl">Log In</h2>
                <p>Log in your existing account to continue.</p>
                {error && <><p className="p-2 w-full bg-red-500/50 text-white h-[40px] rounded-lg flex items-center"><PiWarningCircleDuotone size={20}/>{error}</p></>}
                <div className="border-slate-800 border-2 rounded-lg w-full">
                    <input type="text" placeholder="Email Address" id="emailAddress" className="border-none p-4 w-full outline-none" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
                </div>
                <div className="border-slate-800 border-2 rounded-lg w-full">
                    <input type="password" placeholder="Password" id="password" className="border-none p-4 w-full outline-none" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
                </div>
                </div>
                <div className="actions flex flex-col w-full gap-4">
                    <div className="w-full text-center">Don&apos;t have an account? <span className="text-blue-500" onClick={()=> setCurrentState("signup")}>Sign Up</span></div>
                {/* <button type="button" className="w-full min-h-[40px] flex items-center py-4 justify-center bg-transparent rounded-lg text-white border-2 border-gray-700 font-semibold gap-4"><PiGoogleLogoBold size={20} onSubmit={handleGoogleLogin}/> Log In With Google</button> */}
                <button type="submit" className="w-full min-h-[40px] flex items-center py-4 justify-center bg-blue-500 rounded-lg text-black font-semibold" disabled={loading}>{loading ? "Loading": "Log In"}</button>
                </div>
            </form>
            </>
            }


            {currentState === "signup" && 
            <>
            <form onSubmit={handleEmailSignup} className="flex flex-col gap-2 justify-between items-center w-full h-full pt-6">
                <div className="inputs w-full flex flex-col gap-4 ">
                <h2 className="text-6xl">Sign Up</h2>
                <p>Create your account to get started.</p>
                {error && <><p className="p-2 w-full bg-red-500/50 text-white h-[40px] rounded-lg flex items-center"><PiWarningCircleDuotone size={20}/>{error}</p></>}
                <div className="border-slate-800 border-2 rounded-lg w-full">
                    <input type="text" placeholder="Email Address" id="emailAddress" className="border-none p-4 w-full outline-none" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
                </div>
                <div className="border-slate-800 border-2 rounded-lg w-full">
                    <input type="password" placeholder="Password" id="password" className="border-none p-4 w-full outline-none" value={password} onChange={(event)=> setPassword(event.target.value)} required/>
                </div>
                <div className="border-slate-800 border-2 rounded-lg w-full">
                    <input type="password" placeholder="Confirm Password" id="confirmPassword" className="border-none p-4 w-full outline-none" value={confirmPassword} onChange={(event)=> setConfirmPassword(event.target.value)} required/>
                </div>
                </div>
                <div className="actions flex flex-col w-full gap-4">
                <div className="w-full text-center">Already have an account? <span className="text-blue-500" onClick={()=> setCurrentState("login")}>Log In</span></div>
                {/* <button type="button" className="w-full min-h-[40px] flex items-center py-4 justify-center bg-transparent rounded-lg text-white border-2 border-gray-700 font-semibold gap-4"><PiGoogleLogoBold size={20} onSubmit={handleGoogleSignup}/> Sign Up With Google</button> */}
                <button type="submit" className="w-full min-h-[40px] flex items-center py-4 justify-center bg-blue-500 rounded-lg text-black font-semibold" disabled={loading}>{loading ? "Loading": "Sign Up"}</button>
                </div>
            </form>
            </>
            }
            

        </main>
        </>
     );
}
 
export default AuthView;