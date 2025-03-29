import { PiCheckCircleDuotone } from "react-icons/pi";

const SignupSuccessView = () => {
    return ( 
        <>
        <main className="h-screen w-screen flex flex-col gap-4 text-center p-4 items-center justify-center">
            <PiCheckCircleDuotone className="text-green-700" size={96}/>
            <h2 className="font-semibold">Signup Successful</h2>
            <p>You have successfully signed up for Guli. Let&apos;s get started...</p>
        </main>
        </>
     );
}
 
export default SignupSuccessView;