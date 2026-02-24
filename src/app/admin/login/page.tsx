"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center dynamic-gradient-bg px-6">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-[var(--color-pure-white)]/60 blur-[100px]" />
                <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[var(--color-ocean-steel)]/20 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md"
            >
                <GlassCard className="p-8">
                    <h1 className="mb-2 text-3xl font-black text-[var(--color-jet-black)]">Admin Portal</h1>
                    <p className="mb-8 text-[var(--color-deep-slate)]/80">Please sign in to manage your portfolio.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-[var(--color-jet-black)]">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-[var(--color-ocean-steel)]/50 bg-[var(--color-pure-white)] p-4 text-[var(--color-jet-black)] shadow-inner outline-none focus:border-[var(--color-deep-slate)]"
                                placeholder="admin@nafisa.com"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-[var(--color-jet-black)]">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-[var(--color-ocean-steel)]/50 bg-[var(--color-pure-white)] p-4 text-[var(--color-jet-black)] shadow-inner outline-none focus:border-[var(--color-deep-slate)]"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-sm font-bold text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl accent-gradient-bg py-4 font-black text-[var(--color-pure-white)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[var(--color-deep-slate)]/20"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
}
