import Link from "next/link";
import { PiCheckCircleFill } from "react-icons/pi";

const SignupSuccessView = () => {
    return ( 
        <>
        <main className="h-screen w-screen flex flex-col gap-4 text-left p-4 items-center justify-center">
            <h2 className="font-semibold text-2xl">Check your email to confirm your account</h2>
            <p>We&apos;ve sent a confirmation link to your email. Click the link in your inbox to verify your account and get started!<br /> <br />
            Didn&apos;t get the email?<br /><br />
            </p>
            <div className="flex flex-col">
            <li>Proceed to Log in your new account.</li>
            <li>Still no email? <Link href={''} className="text-green-500">Resend Link</Link></li>
            </div>
            <p>Once confirmed, you&apos;ll unlock personalized financial missions and rewards. 🚀</p>

            <Link href={'/onboarding'} className="w-full min-h-[40px] flex items-center py-4 justify-center bg-[#00D05E] rounded-lg text-white font-semibold">Got It</Link>

            <div className="absolute bottom-0 left-0 p-4">
            <div className=" bg-[#457259] px-4 py-2 rounded-lg text-white text-lg flex items-center"> <PiCheckCircleFill size={64}/> Confirmation email successfully sent to your address</div>
            </div>
        </main>
        </>
     );
}
 
export default SignupSuccessView;