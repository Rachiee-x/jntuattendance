"use client";

import { updateAttendance, deleteSubject } from "@/app/actions/subject";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subject {
    id: string;
    name: string;
    attended: number;
    conducted: number;
}

export function SubjectCard({ subject }: { subject: Subject }) {
    const percentage = subject.conducted === 0 ? 100 : (subject.attended / subject.conducted) * 100;

    // Status Logic
    let status = "Safe";
    let statusColor = "text-green-500";
    if (percentage < 65) {
        status = "Detained";
        statusColor = "text-red-500";
    } else if (percentage < 75) {
        status = "Condonation";
        statusColor = "text-yellow-500";
    }

    return (
        <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="overflow-hidden glass border-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold truncate">{subject.name}</CardTitle>
                    <div className={cn("text-xs font-bold px-2 py-1 rounded-full bg-white/10", statusColor)}>
                        {status}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <div className="text-3xl font-bold">{percentage.toFixed(1)}%</div>
                            <div className="text-sm text-muted-foreground">
                                {subject.attended} / {subject.conducted} Classes
                            </div>
                        </div>
                        {/* Circular Progress or simple bar could go here. For now, simple text is premium enough with good typo */}
                    </div>

                    <div className="flex gap-2">
                        <form
                            action={async () => {
                                await updateAttendance(subject.id, "present");
                            }}
                            className="flex-1"
                        >
                            <Button variant="outline" className="w-full border-green-500/50 hover:bg-green-500/10 hover:text-green-500 text-green-500" size="sm">
                                <Check className="mr-2 h-4 w-4" /> Present
                            </Button>
                        </form>
                        <form
                            action={async () => {
                                await updateAttendance(subject.id, "absent");
                            }}
                            className="flex-1"
                        >
                            <Button variant="outline" className="w-full border-red-500/50 hover:bg-red-500/10 hover:text-red-500 text-red-500" size="sm">
                                <X className="mr-2 h-4 w-4" /> Absent
                            </Button>
                        </form>
                    </div>
                </CardContent>
                <CardFooter className="bg-black/20 p-2 flex justify-end">
                    <form
                        action={async () => {
                            await deleteSubject(subject.id);
                        }}
                    >
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
