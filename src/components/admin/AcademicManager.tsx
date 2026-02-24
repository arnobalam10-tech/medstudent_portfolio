"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/GlassCard';
import { Plus, Trash2, Save } from 'lucide-react';

interface AcademicFormProps {
    initialData?: any[];
    onUpdate: () => void;
}

export const AcademicManager = ({ initialData = [], onUpdate }: AcademicFormProps) => {
    const [items, setItems] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setItems([...items, { institution: '', degree: '', graduation_year: '', details: '' }]);
    };

    const handleSave = async (index: number) => {
        setLoading(true);
        const item = items[index];

        let result;
        if (item.id) {
            result = await supabase.from('education').update(item).eq('id', item.id);
        } else {
            result = await supabase.from('education').insert(item);
        }

        if (!result.error) onUpdate();
        setLoading(false);
    };

    const handleDelete = async (id: string, index: number) => {
        if (id) {
            await supabase.from('education').delete().eq('id', id);
        }
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onUpdate();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--color-jet-black)]">Manage Academics</h3>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-xl accent-gradient-bg px-4 py-2 text-sm font-bold text-[var(--color-pure-white)] shadow-md shadow-[var(--color-deep-slate)]/20 transition-transform hover:scale-105"
                >
                    <Plus size={16} /> Add Entry
                </button>
            </div>

            {items.map((item, idx) => (
                <GlassCard key={idx} className="relative">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Institution</label>
                            <input
                                value={item.institution}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].institution = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Degree</label>
                            <input
                                value={item.degree}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].degree = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Details</label>
                            <textarea
                                value={item.details}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].details = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full h-24 rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            onClick={() => handleDelete(item.id, idx)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button
                            onClick={() => handleSave(idx)}
                            className="flex items-center gap-2 rounded-lg accent-gradient-bg px-4 py-2 text-sm font-bold text-[var(--color-pure-white)] hover:opacity-90 shadow-md shadow-[var(--color-deep-slate)]/10"
                        >
                            <Save size={16} /> {item.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
