"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

function SubmitButton({ isSignup }: { isSignup: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700" type="submit" disabled={pending}>
            {pending ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
        </Button>
    );
}

interface AuthFormProps {
    action: (prevState: unknown, formData: FormData) => Promise<{ error?: string }>;
    isSignup?: boolean;
}

export function AuthForm({ action, isSignup = false }: AuthFormProps) {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        const result = await action(null, formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card className="glass border-white/10 shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center tracking-tight">
                        {isSignup ? "Create an account" : "Welcome back"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isSignup
                            ? "Enter your details to start tracking attendance"
                            : "Enter your credentials to access your dashboard"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-500 font-medium text-center">
                                {error}
                            </div>
                        )}
                        <SubmitButton isSignup={isSignup} />
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        {isSignup ? "Already have an account? " : "Don't have an account? "}
                        <Link
                            href={isSignup ? "/login" : "/signup"}
                            className="text-primary hover:underline font-medium"
                        >
                            {isSignup ? "Sign in" : "Sign up"}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
