"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsChevronLeft, BsChevronRight, BsDot } from "react-icons/bs";
import { TbLayoutColumns, TbShare } from "react-icons/tb";
import { moduleData, Module, Question } from "@/lib/moduleData";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const QuestionPage = () => {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const moduleId = Number(params.moduleId);
  const questionId = Number(params.questionId);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push('/auth');
          return;
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    // Find the module and question
    const currentModule = moduleData.find(m => m.id === moduleId);
    
    if (!currentModule || currentModule.locked) {
      router.push('/');
      return;
    }

    const currentQuestion = currentModule.questions.find(q => q.id === questionId);
    
    if (!currentQuestion) {
      router.push('/');
      return;
    }

    setModule(currentModule);
    setQuestion(currentQuestion);
    setLoading(false);
  }, [moduleId, questionId, router]);

  const handleNext = () => {
    if (!module) return;
    
    const nextQuestionIndex = module.questions.findIndex(q => q.id === questionId) + 1;
    
    if (nextQuestionIndex < module.questions.length) {
      const nextQuestion = module.questions[nextQuestionIndex];
      router.push(`/modules/${moduleId}/questions/${nextQuestion.id}`);
    } else {
      // If this is the last question, go back to home
      router.push('/');
    }
  };

  const handlePrev = () => {
    if (!module) return;
    
    const prevQuestionIndex = module.questions.findIndex(q => q.id === questionId) - 1;
    
    if (prevQuestionIndex >= 0) {
      const prevQuestion = module.questions[prevQuestionIndex];
      router.push(`/modules/${moduleId}/questions/${prevQuestion.id}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!module || !question) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-lg font-medium">Question not found</div>
      </div>
    );
  }

  const currentIndex = module.questions.findIndex(q => q.id === questionId);
  const totalQuestions = module.questions.length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-md w-full max-w-md shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex gap-2 items-center justify-start">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <BsDot 
                key={idx} 
                className={`${idx === currentIndex ? 'text-blue-500' : 'text-gray-300'} text-lg`} 
                size={30}
              />
            ))}
          </div>
          <div className="flex space-x-3">
            <TbLayoutColumns className="text-gray-500" />
            <TbShare className="text-gray-500" />
            <Link href="/home">
              <IoMdClose className="text-gray-500" />
            </Link>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h2 className="font-bold text-lg mb-2">{question.title}</h2>
          <p className="text-sm mb-4">{question.content}</p>
          
          {question.example && (
            <div className="bg-gray-100 p-3 rounded-md text-sm mb-4">
              <p className="font-semibold mb-1">Example:</p>
              <p>{question.example}</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 flex gap-4 w-full items-center justify-center">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentIndex === 0 ? 'bg-gray-200 text-gray-400' : `bg-${module.color}-500 text-white`
            }`}
          >
            <BsChevronLeft size={16} />
          </button>
          
          <button 
            onClick={handleNext}
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-${module.color}-500 text-white`}
          >
            <BsChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;