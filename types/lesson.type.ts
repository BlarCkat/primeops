export interface Lesson {
    id: string;
    title: string;
    description: string;
    iconName: string;
    level: number;
    durationMinutes: number;
    XPReward: number,
    status: "notdone" | "inProgress" | "Done",
    completionPercentage?: number;
    isLocked: boolean;
    tags: string[];
    prerequisiteIds?: string[] 
}