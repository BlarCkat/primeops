import { Lesson } from "./lesson.type";

export interface Course {
    id: string;
    title: string;
    description: string;
    level: number;
    lessons: Lesson[];
    isCompleted: "notDone" | "inProgress" | "Completed";
    isLocked: boolean;
    colorScheme: {
        primary: string;
        secondary: string;
    }   
}