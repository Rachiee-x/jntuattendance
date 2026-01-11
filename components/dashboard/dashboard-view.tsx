"use client";

import { SubjectCard } from "./subject-card";
import { AddSubjectModal } from "./add-subject-modal";
import { getSubjects } from "@/app/actions/subject"; // This is just for type reference or we pass data
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface DashboardViewProps {
    subjects: Awaited<ReturnType<typeof getSubjects>>;
    username?: string;
}

export function DashboardView({ subjects, username }: DashboardViewProps) {
    // Calculate Overall Persistence
    const totalAttended = subjects.reduce((acc: number, s) => acc + s.attended, 0);
    const totalConducted = subjects.reduce((acc: number, s) => acc + s.conducted, 0);
    const overallPercentage = totalConducted === 0 ? 100 : (totalAttended / totalConducted) * 100;

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 space-y-8">
            <header className="flex justify-between items-center bg-card/50 backdrop-blur p-4 rounded-xl border border-border/50 sticky top-4 z-10">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Attendance
                    </h1>
                    <p className="text-xs text-muted-foreground">Welcome, {username}</p>
                </div>
                <div className="flex items-center gap-4">
                    <form action={logout}>
                        <Button variant="ghost" size="icon">
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </header>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-6 rounded-xl border flex flex-col justify-center items-center">
                    <span className="text-sm text-muted-foreground">Overall Attendance</span>
                    <span className={`text-4xl font-bold ${overallPercentage < 75 ? 'text-red-500' : 'text-green-500'}`}>
                        {overallPercentage.toFixed(1)}%
                    </span>
                </div>
                <div className="bg-card p-6 rounded-xl border flex flex-col justify-center items-center">
                    <span className="text-sm text-muted-foreground">Total Classes</span>
                    <span className="text-4xl font-bold text-foreground">{totalConducted}</span>
                </div>
                <div className="bg-card p-6 rounded-xl border flex flex-col justify-center items-center justify-between">
                    <AddSubjectModal />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((sub) => (
                    <SubjectCard key={sub.id} subject={sub} />
                ))}

                {subjects.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        No subjects added yet. Click &quot;Add Subject&quot; to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
