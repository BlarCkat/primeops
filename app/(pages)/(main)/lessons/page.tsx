// app/lessons/page.tsx
'use client';

import { useAuth } from '@/contexts/Auth.context';
import { lessonModules } from '@/data/lessons.data';
import { Lesson } from '@/types/lesson.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Simple icons component - in a real app, you'd use a proper icon library
const Icon = ({ name }: { name: string }) => {
  const iconMap: Record<string, string> = {
    cash: '💵',
    briefcase: '💼',
    shoppingCart: '🛒',
    piggyBank: '🐖',
    target: '🎯',
    bank: '🏦',
    calculator: '🧮',
    receipt: '🧾',
    chart: '📊',
    default: '📚'
  };

  return <span className="text-2xl">{iconMap[name] || iconMap.default}</span>;
};

export default function LessonsView() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState(lessonModules[0].id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.isLocked) return;
    router.push(`/lessons/${lesson.id}`);
  };

  const currentModule = lessonModules.find(module => module.id === activeModule) || lessonModules[0];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Lessons</h1>
        <div className="flex items-center gap-4">
          <div>
            <span className="font-medium text-amber-500">✨ {user ? 0 : 0} XP</span>
            <span className="mx-3 font-medium text-red-500">🔥 {user ? 0 : 0} day streak</span>
          </div>
        </div>
      </div>

      {/* Module Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {lessonModules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={`rounded-full px-6 py-2 font-medium transition ${
              activeModule === module.id
                ? `bg-${module.colorScheme.primary} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${module.isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={module.isLocked}
          >
            {module.title}
            {module.isLocked && ' 🔒'}
          </button>
        ))}
      </div>

      {/* Module Description */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <h2 className="text-2xl font-bold" style={{ color: currentModule.colorScheme.primary }}>
          {currentModule.title}
        </h2>
        <p className="text-gray-600">{currentModule.description}</p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentModule.lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`relative cursor-pointer rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg ${
              lesson.isLocked ? 'cursor-not-allowed opacity-70' : ''
            }`}
            onClick={() => handleStartLesson(lesson)}
          >
            {/* Progress indicator */}
            {lesson.completionPercentage && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-200">
                <div
                  className="h-full"
                  style={{
                    width: `${lesson.completionPercentage}%`,
                    backgroundColor: currentModule.colorScheme.primary,
                  }}
                ></div>
              </div>
            )}

            {/* Locked indicator */}
            {lesson.isLocked && (
              <div className="absolute right-4 top-4 text-xl text-gray-400">🔒</div>
            )}

            {/* Completed indicator */}
            {lesson.status && (
              <div 
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: currentModule.colorScheme.primary }}
              >
                ✓
              </div>
            )}

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${currentModule.colorScheme.secondary}20` }}>
              <Icon name={lesson.iconName} />
            </div>
            
            <h3 className="mb-2 text-lg font-semibold">{lesson.title}</h3>
            <p className="mb-4 text-sm text-gray-600">{lesson.description}</p>
            
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-gray-500">{lesson.durationMinutes} mins</span>
              <span className="font-medium text-amber-500">+{lesson.XPReward} XP</span>
            </div>
            
            {/* Connector line to next lesson */}
            {index < currentModule.lessons.length - 1 && (
              <div className="absolute -bottom-4 left-1/2 h-4 w-px bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}