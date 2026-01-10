"use client";

import { useState } from "react";
import { addSubject } from "@/app/actions/subject";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

export function AddSubjectModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-card text-card-foreground border w-full max-w-md p-6 rounded-lg shadow-xl relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <h2 className="text-xl font-bold mb-4">Add New Subject</h2>

                            <form
                                action={async (formData) => {
                                    await addSubject(null, formData);
                                    setIsOpen(false);
                                }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label>Subject Name</Label>
                                    <Input name="name" required placeholder="Data Structures" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Attended</Label>
                                        <Input name="attended" type="number" defaultValue="0" min="0" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Conducted</Label>
                                        <Input name="conducted" type="number" defaultValue="0" min="0" />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">Add Subject</Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
