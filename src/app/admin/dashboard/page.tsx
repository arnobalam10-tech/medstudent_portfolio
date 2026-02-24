"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/SectionHeader';
import { GlassCard } from '@/components/GlassCard';
import { AcademicManager } from '@/components/admin/AcademicManager';
import { ExperienceManager } from '@/components/admin/ExperienceManager';
import { ResearchManager } from '@/components/admin/ResearchManager';
import { AwardsManager } from '@/components/admin/AwardsManager';
import { ExtracurricularsManager } from '@/components/admin/ExtracurricularsManager';
import { HeroManager } from '@/components/admin/HeroManager';
import { ContactManager } from '@/components/admin/ContactManager';
import { LayoutDashboard, FileText, Briefcase, GraduationCap, Award, Settings, LogOut, Loader2, HeartHandshake, Mail } from 'lucide-react';

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [activeSection, setActiveSection] = useState('Academics');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login');
            } else {
                setUser(user);
                fetchData();
            }
        };
        checkUser();
    }, [router]);

    async function fetchData() {
        setLoading(true);
        const { data: education } = await supabase.from('education').select('*').order('order_index');
        const { data: experience } = await supabase.from('experience').select('*').order('order_index');
        const { data: research } = await supabase.from('research').select('*').order('order_index');
        const { data: awards } = await supabase.from('awards').select('*').order('order_index');
        const { data: extracurriculars } = await supabase.from('extracurriculars').select('*').order('order_index');
        const { data: contactData } = await supabase.from('contact_info').select('*').limit(1);
        const { data: heroData } = await supabase.from('hero_settings').select('*').limit(1);

        setData({
            education: education || [],
            experience: experience || [],
            research: research || [],
            awards: awards || [],
            extracurriculars: extracurriculars || [],
            contact: contactData && contactData.length > 0 ? contactData[0] : { email: '', linkedin: '', twitter: '' },
            hero: heroData && heroData.length > 0 ? heroData[0] : null
        });
        setLoading(false);
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 pb-20" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
            <div className="container mx-auto max-w-6xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <SectionHeader label="Admin" title="Admin Dashboard" subtitle="Manage your portfolio content in real-time." className="mb-0" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/20"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid gap-8 md:grid-cols-4">
                    <aside className="space-y-2 md:col-span-1">
                        {[
                            { name: 'Hero', icon: <LayoutDashboard size={18} /> },
                            { name: 'Academics', icon: <GraduationCap size={18} /> },
                            { name: 'Experience', icon: <Briefcase size={18} /> },
                            { name: 'Research', icon: <FileText size={18} /> },
                            { name: 'Awards', icon: <Award size={18} /> },
                            { name: 'Extracurriculars', icon: <HeartHandshake size={18} /> },
                            { name: 'Contact', icon: <Mail size={18} /> },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveSection(item.name)}
                                className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-semibold transition-all"
                                style={activeSection === item.name
                                    ? { background: 'linear-gradient(135deg, #36565F, #5F8190)', color: '#FFFFFF', boxShadow: 'var(--shadow-accent)' }
                                    : { background: 'var(--card)', color: 'var(--muted-foreground)' }
                                }
                            >
                                {item.icon} {item.name}
                            </button>
                        ))}
                    </aside>

                    <main className="md:col-span-3">
                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="animate-spin text-blue-500" size={32} />
                            </div>
                        ) : (
                            <>
                                {activeSection === 'Academics' && (
                                    <AcademicManager initialData={data.education} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Experience' && (
                                    <ExperienceManager initialData={data.experience} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Research' && (
                                    <ResearchManager initialData={data.research} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Awards' && (
                                    <AwardsManager initialData={data.awards} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Extracurriculars' && (
                                    <ExtracurricularsManager initialData={data.extracurriculars} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Contact' && (
                                    <ContactManager initialData={data.contact} onUpdate={fetchData} />
                                )}
                                {activeSection === 'Hero' && (
                                    <HeroManager initialData={data.hero} onUpdate={fetchData} />
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
