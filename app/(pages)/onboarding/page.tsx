"use client"

import { useAuth } from "@/contexts/Auth.context";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OnboardingState = "onb0" | "onb1" | "onb2" | "onb3" | "onb4" | "onb5" | "result";
type FinancialLiteracyLevel = "beginner" | "intermediate" | "expert";

interface OnboardingResponses {
    monthlyRemaining: string | null;
    windfall: string | null;
    borrowing: string | null;
    scamAwareness: string | null;
    recommendations: string | null;
}

const OnboardingView = () => {
    const router = useRouter();
    const [loading, setIsLoading] = useState<boolean>(false)
    const [currentState, setCurrentState] = useState<OnboardingState>("onb0");
    const [literacyLevel, setLiteracyLevel] = useState<FinancialLiteracyLevel | null>(null);
    const [responses, setResponses] = useState<OnboardingResponses>({
        monthlyRemaining: null,
        borrowing: null,
        recommendations: null,
        scamAwareness: null,
        windfall: null,
    })

    const {user} = useAuth();

    const handleAnswerSelection = async (question: keyof OnboardingResponses, answer: string)=>{
        setResponses(prev => ({
            ...prev,
            [question]: answer
          }));

          // Update to move to the next onboarding state
          switch (currentState) {
            case "onb0":
                setCurrentState("onb1")  // Move to the next state
                break;
            case "onb1":
                setCurrentState('onb2')  // Move to the next state
                break;
            case "onb2":
                setCurrentState('onb3')  // Move to the next state
                break;
            case "onb3":
                setCurrentState('onb4')  // Move to the next state
                break;
            case "onb4":
                setCurrentState('onb5')  // Move to the next state
                break;
            case "onb5":
                setIsLoading(true);
                await analyzeAndSaveResults(answer)
                break;
        }
    }
    
    const analyzeAndSaveResults = async (finalAnswer: string) =>{
        const finalResponses = {
            ...responses, 
            recommendations: finalAnswer
        }

        try {
            const openaiResponse = await fetch('/api/analyze-literacy', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    responses: finalResponses,
                })
            });

            if (!openaiResponse.ok) {
                throw new Error('Failed to analyze literacy level');
            }

            const data = await openaiResponse.json();
            const determinedLevel = data.literacyLevel as FinancialLiteracyLevel;
            setLiteracyLevel(determinedLevel);

            if (user) {
                const {error} = await supabase.from('user_profiles').upsert({
                    user_id: user.id,
                    onboarding_completed: true,
                    financial_literacy_level: determinedLevel,
                    monthly_remaining: finalResponses.monthlyRemaining,
                    windfall_usage: finalResponses.windfall,
                    borrowing_preference: finalResponses.borrowing,
                    scam_awareness: finalResponses.scamAwareness,
                    onboarding_date: new Date().toISOString(),
                });
                if (error) {
                    console.error("Error saving to Supabase:", error)
                }
            }

            setCurrentState("result")

        } catch (error) {
            console.error("Error: ", error);
            setLiteracyLevel("beginner");
            setCurrentState('result')
        }
        finally {
            setIsLoading(false);
        }
    }
    
    return ( 
        <>
        <main className="h-fit w-screen p-4">
        <nav className="h-[40px] flex justify-between items-center">
          <Link href={''}></Link>
          <Image src={'/img/logo_primary.svg'} height={32} width={64} alt="Logo"/>
          <Link href={''}></Link>
        </nav>

        {/* Onboarding Screen 0 - Introduction */}
        {currentState === "onb0" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            <Image src={'/img/onboarding-1.svg'} height={100} width={100} alt="Onboarding illustration"/>
            <h1 className="text-4xl font-semibold">Smart Money. <br />Real Rewards.</h1>
            <p className="text-slate-400">We&apos;re here to make financial literacy fun and rewarding. Answer a few quick questions so we can personalize your journey</p>
            <div className="py-8 w-screen h-fit flex p-6">
              <button 
                type="button" 
                onClick={() => setCurrentState("onb1")} 
                className="w-full min-h-[40px] flex items-center py-4 justify-center bg-[#00D05E] rounded-lg text-white font-semibold"
              >
                Let&apos;s Go
              </button>
            </div>
          </div>
        )}
        
        {/* Onboarding Screen 1 - Monthly Income */}
        {currentState === "onb1" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-12">
            <h1 className="text-4xl font-semibold">At the end of every month, how much of your income do you usually have left?</h1>
            <Image src={'/img/onboarding-2.svg'} height={100} width={100} alt="Income illustration"/>
            <div className="flex items-center w-full h-fit gap-4 flex-col">
              <button 
                onClick={() => handleAnswerSelection('monthlyRemaining', "don't track")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I don&apos;t track my income and expenses
              </button>
              <button 
                onClick={() => handleAnswerSelection('monthlyRemaining', "run out")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I usually run out of money before the month ends.
              </button>
              <button 
                onClick={() => handleAnswerSelection('monthlyRemaining', "save inconsistently")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I save some, but not consistently
              </button>
              <button 
                onClick={() => handleAnswerSelection('monthlyRemaining', "strict budget")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I follow a strict budget and always have savings.
              </button>
            </div>
          </div>
        )}

        {/* Onboarding Screen 2 - Windfall */}
        {currentState === "onb2" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            <h1 className="text-4xl font-semibold">If you received GHS 1,000 today, what would you do first?</h1>
            <Image src={'/img/onboarding-3.svg'} height={100} width={100} alt="Money illustration"/>
            <div className="flex items-center w-full h-fit gap-4 flex-col">
              <button 
                onClick={() => handleAnswerSelection('windfall', "spend all")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Spend it all
              </button>
              <button 
                onClick={() => handleAnswerSelection('windfall', "mobile wallet")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Save it in a mobile wallet.
              </button>
              <button 
                onClick={() => handleAnswerSelection('windfall', "savings account")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Invest it in a savings account or treasury bills
              </button>
              <button 
                onClick={() => handleAnswerSelection('windfall', "diversified portfolio")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Put it into a diversified investment portfolio.
              </button>
            </div>
          </div>
        )}

        {/* Onboarding Screen 3 - Borrowing */}
        {currentState === "onb3" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            <h1 className="text-4xl font-semibold">You need to borrow money. What&apos;s the best option?</h1>
            <Image src={'/img/onboarding-4.svg'} height={100} width={100} alt="Borrowing illustration"/>
            <div className="flex items-center w-full h-fit gap-4 flex-col">
              <button 
                onClick={() => handleAnswerSelection('borrowing', "loan app")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                A loan app with high interest but instant cash
              </button>
              <button 
                onClick={() => handleAnswerSelection('borrowing', "bank loan")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                A bank loan with structured repayment
              </button>
              <button 
                onClick={() => handleAnswerSelection('borrowing', "family loan")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Borrowing from a friend or family member
              </button>
              <button 
                onClick={() => handleAnswerSelection('borrowing', "avoid borrowing")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I avoid borrowing unless necessary
              </button>
            </div>
          </div>
        )}

        {/* Onboarding Screen 4 - Scam Awareness */}
        {currentState === "onb4" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            <h1 className="text-4xl font-semibold">You receive an SMS saying you&apos;ve won a lottery you never played. What do you do?</h1>
            <Image src={'/img/onboarding-5.svg'} height={100} width={100} alt="Scam awareness illustration"/>
            <div className="flex items-center w-full h-fit gap-4 flex-col">
              <button 
                onClick={() => handleAnswerSelection('scamAwareness', "claim prize")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Click the link to claim my prize
              </button>
              <button 
                onClick={() => handleAnswerSelection('scamAwareness', "call number")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Call the number in the message to confirm
              </button>
              <button 
                onClick={() => handleAnswerSelection('scamAwareness', "ignore scam")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Ignore it—I know it&apos;s a scam
              </button>
              <button 
                onClick={() => handleAnswerSelection('scamAwareness', "report fraud")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Report it as fraud
              </button>
            </div>
          </div>
        )}
        
        {/* Onboarding Screen 5 - Recommendations */}
        {currentState === "onb5" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            <h1 className="text-4xl font-semibold">Have you ever recommended a financial product or app to a friend?</h1>
            <Image src={'/img/onboarding-6.svg'} height={100} width={100} alt="Recommendations illustration"/>
            <div className="flex items-center w-full h-fit gap-4 flex-col">
              <button 
                onClick={() => handleAnswerSelection('recommendations', "never refer")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                No, I never refer apps
              </button>
              <button 
                onClick={() => handleAnswerSelection('recommendations', "one-time bonuses")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Yes, but only for one-time bonuses
              </button>
              <button 
                onClick={() => handleAnswerSelection('recommendations', "follow trends")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                Yes, and I actively follow fintech trends
              </button>
              <button 
                onClick={() => handleAnswerSelection('recommendations', "earn from referrals")}
                className="min-h-[70px] flex flex-col items-center justify-center rounded-lg w-full border-[1px] border-gray-200 shadow-lg shadow-gray-200 hover:bg-gray-50"
              >
                I&apos;m always looking for ways to earn from referrals
              </button>
            </div>
          </div>
        )}

        {/* Results Screen - Financial Literacy Assessment */}
        {currentState === "result" && (
          <div className="w-full flex flex-col gap-4 justify-between items-center px-4 text-center pt-16">
            
            <p className="text-slate-400">Your financial superpower revealed.</p>
            
            <div className="w-full max-w-md bg-white rounded-xl p-6 mt-4">
                {literacyLevel === "beginner" && 
                <>
              <div className="relative flex items-center justify-center">
                <Image className="" src={'/img/onboarding-result-beginner.svg'} width={400} height={400} alt="beginner"/>
              </div>
              <div className="border-[0.5px] rounded-lg border-gray-200 text-start p-4">
                <h2 className="text-green-600">Superpower: Openness to Growth</h2>
                <p>You&apos;re eager to learn and take control of your finances. Every expert starts somewhere!</p>
              </div>
                </>
                }

                {literacyLevel === "intermediate" && 
                <>
              <div className="relative flex items-center justify-center">
                <Image className="" src={'/img/onboarding-result-intermediate.svg'} width={400} height={400} alt="beginner"/>
              </div>
              <div className="border-[0.5px] rounded-lg border-gray-200 text-start p-4">
                <h2 className="text-green-600">Superpower: Adaptability</h2>
                <p>You understand the basics and are ready to build better financial habits.</p>
              </div>
                </>
                }
                
                {literacyLevel === "expert" && 
                <>
              <div className="relative flex items-center justify-center">
                <Image className="" src={'/img/onboarding-result-pro.svg'} width={400} height={400} alt="beginner"/>
              </div>
              <div className="border-[0.5px] rounded-lg border-gray-200 text-start p-4">
                <h2 className="text-green-600">Superpower: Optimization</h2>
                <p>You&apos;re financially savvy and focused on maximizing your money&apos;s potential.</p>
              </div>
                </>
                }
              
              {/* <p className="text-gray-600 mb-4">
                {literacyLevel === "beginner" && "You're at the beginning of your financial journey. We'll help you build a strong foundation."}
                {literacyLevel === "intermediate" && "You have solid financial knowledge. We'll help you expand your skills."}
                {literacyLevel === "expert" && "You have advanced financial knowledge. We'll focus on advanced topics and strategies."}
              </p> */}
              
              <div className="w-full mt-6">
                <button 
                  onClick={() => router.push('/selectMissions')}
                  className="w-full py-3 bg-[#00D05E] rounded-lg text-white font-semibold"
                >
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D05E] mx-auto mb-4"></div>
              <p className="text-lg">Analyzing your financial profile...</p>
            </div>
          </div>
        )}
      </main>
        </>
     );
}
 
export default OnboardingView;