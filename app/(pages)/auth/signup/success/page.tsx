import Link from "next/link";
import { PiCheckCircleDuotone } from "react-icons/pi";

const SignupSuccessView = () => {
    return ( 
        <>
        <main className="h-screen w-screen flex flex-col gap-4 text-center p-4 items-center justify-center">
            <PiCheckCircleDuotone className="text-green-700" size={96}/>
            <h2 className="font-semibold">Signup Successful</h2>
            <p>You have successfully signed up for Guli. To continue: <br />
            1. Verify your email from your email provider. <br />
            2. Proceed to Log in your new account.
            </p>

            <Link href={'/auth'} className="w-full min-h-[40px] flex items-center py-4 justify-center bg-blue-500 rounded-lg text-black font-semibold">Log In</Link>
        </main>
        </>
     );
}
 
export default SignupSuccessView;