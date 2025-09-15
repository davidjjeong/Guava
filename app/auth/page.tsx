"use client";

import React, { useEffect, useState } from "react";
import { createClient } from '../../lib/supabase/client';
import { useAuth } from '../../contexts/auth-context';
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const supabase = createClient();
    const {user, loading: authLoading } = useAuth();
    const router = useRouter(); // allows us to redirect user to a page

    useEffect(() => {
        if (user && !authLoading) { // if user exists and data for auth isn't loading, redirect to home page
            router.push("/");
        }
    }, [user, authLoading, router])

    async function handleAuth(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true);
        setError("");

        try {
            if (isSignUp) {
                const {data, error} = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;
                if (data.user && !data.session) { // user signed up, but did not confirm email
                    setError("Please check your email for a confirmation link");
                    return;
                }
            } else {
                const {error} = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-[#28301C]">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-[#FFC3CC] mb-2">
                        Guava
                    </h1>
                    <p className="text-xl">
                        {isSignUp ? "Create Your Account" : "Sign in to your account"}
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleAuth}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-[#FFC3CC]"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border-2 border-[#FFC3CC] rounded-md shadow-sm focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-lg font-medium text-[#FFC3CC]"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border-2 border-[#FFC3CC] rounded-md shadow-sm focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div className="text-[#FFC3CC]">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm font-medium text-[#28301C] text-lg bg-[#D2DB76] hover:opacity-90 disabled:opacity-50 transition duration-300"
                    >
                        {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>
                <div className="text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-[#D2DB76] hover:cursor-pointer hover:text-[#FFC3CC] transition duration-300"
                    >
                        {isSignUp 
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up" 
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}