"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/GlassCard';
import { Plus, Trash2, Save } from 'lucide-react';

interface AwardsFormProps {
    initialData?: any[];
    onUpdate: () => void;
}

export const AwardsManager = ({ initialData = [], onUpdate }: AwardsFormProps) => {
    const [items, setItems] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setItems([...items, { title: '', type: 'Certification', year: '', description: '' }]);
    };

    const handleSave = async (index: number) => {
        setLoading(true);
        const item = items[index];

        let result;
        if (item.id) {
            result = await supabase.from('awards').update(item).eq('id', item.id);
        } else {
            result = await supabase.from('awards').insert(item);
        }

        if (!result.error) onUpdate();
        setLoading(false);
    };

    const handleDelete = async (id: string, index: number) => {
        if (id) {
            await supabase.from('awards').delete().eq('id', id);
        }
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onUpdate();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--color-jet-black)]">Manage Awards</h3>
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
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Title</label>
                            <input
                                value={item.title}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].title = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Type</label>
                            <select
                                value={item.type}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].type = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                            >
                                <option value="License">License</option>
                                <option value="Certification">Certification</option>
                                <option value="Scholarship">Scholarship</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Year</label>
                            <input
                                value={item.year}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].year = e.target.value;
                                    setItems(newItems);
                                }}
                                className="w-full rounded-lg bg-[var(--color-pure-white)] p-3 text-[var(--color-jet-black)] border border-[var(--color-ocean-steel)]/30 outline-none focus:border-[var(--color-deep-slate)]"
                                placeholder="YYYY"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold uppercase text-[var(--color-deep-slate)]">Description</label>
                            <textarea
                                value={item.description}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx].description = e.target.value;
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
                            className="flex items-center gap-2 rounded-lg accent-gradient-bg px-4 py-2 text-sm font-bold text-[var(--color-pure-white)] shadow-md shadow-[var(--color-deep-slate)]/10 hover:opacity-90 transition-opacity"
                        >
                            <Save size={16} /> {item.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
