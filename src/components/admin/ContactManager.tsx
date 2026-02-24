"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/GlassCard';
import { Save } from 'lucide-react';

interface ContactFormProps {
    initialData?: any;
    onUpdate: () => void;
}

export const ContactManager = ({ initialData, onUpdate }: ContactFormProps) => {
    const [data, setData] = useState(initialData || { email: '', linkedin: '', twitter: '' });
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        let result;
        if (data.id) {
            result = await supabase.from('contact_info').update(data).eq('id', data.id);
        } else {
            result = await supabase.from('contact_info').insert(data);
        }

        if (!result.error) onUpdate();
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--color-jet-black)]">Manage Contact Information</h3>
            </div>

            <GlassCard className="relative">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Email Address</label>
                        <input
                            value={data.email || ''}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">LinkedIn Profile URL</label>
                        <input
                            value={data.linkedin || ''}
                            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                            className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Twitter / X Profile URL</label>
                        <input
                            value={data.twitter || ''}
                            onChange={(e) => setData({ ...data, twitter: e.target.value })}
                            className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            placeholder="https://twitter.com/..."
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg accent-gradient-bg px-6 py-3 text-sm font-bold text-[var(--color-pure-white)] shadow-md shadow-[var(--color-deep-slate)]/10 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};
