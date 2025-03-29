import Image from "next/image";
import { PiListBold } from "react-icons/pi";

const LandingView = () => {
    return ( 
        <>
        <main className="w-screen h-fit bg-white text-black">
            <nav className="nav p-4 flex justify-between items-center">
                <div className=""><Image src={'img/logo_primary.svg'} height={32} width={68} alt="image"/></div>
                <PiListBold size={20}/>
            </nav>

            <section className="hero text-center px-8 pt-8 flex flex-col gap-4">
                <h1 className="text-[36px] leading-[36px] font-semibold tracking-tighter">Build your <span className="text-[#00D05E]">Financial Superskills</span> with Gamified Lessons</h1>
                <p className="text-slate-500 px-8">Master essential money skills through interactive AI lessons that make learning fun.</p>
                <div className="w-full">
                    <button className="bg-[#00D05E] text-white px-8 py-4 rounded-lg font-semibold">Get Started</button></div>
                <div className="w-fit py-10">
                <Image src={'img/image-hero.svg'} height={500} width={500} alt="image"/>
                </div>
            </section>

            <section className="clients text-center px-8 pt-8 flex flex-col gap-4">
                <span className="text-lg font-semibold text-[#00D05E]"> For Fintech, Banks & Businesses</span>
            <h1 className="text-[36px] leading-[36px] font-semibold tracking-tighter">Seamlessly integrate gamified financial literacy into your app</h1>
            <p className="text-slate-500 px-8">Easily integrate gamified financial literacy into your app with our developer-friendly API. Access interactive lessons, quizzes, and real-world scenarios.</p>
            <div className="w-full py-10">
                <button className="bg-[#00D05E] text-white px-8 py-4 rounded-lg font-semibold">Request Demo</button>
            </div>
                    <Image src={'img/image-clients.svg'} height={500} width={500} alt="image"/>    
            </section>
        <footer className="py-8 flex items-center justify-center bg-white text-slate-600">
            <p>&copy; 2025 PrimeOps. All rights reserved.</p>
        </footer>
        </main>
        </>
     );
}
 
export default LandingView;