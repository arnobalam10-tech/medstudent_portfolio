"use client";

import { GlassCard } from "./GlassCard";
import { Briefcase, GraduationCap } from "lucide-react";

interface ExperienceCardProps {
    title: string;
    organization: string;
    dateRange: string;
    description?: string;
    type: 'work' | 'education';
}

export const ExperienceCard = ({ title, organization, dateRange, description, type }: ExperienceCardProps) => {
    return (
        <GlassCard className="group relative">
            <div className="flex items-start gap-5">
                {/* Gradient Icon */}
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #36565F, #5F8190)', boxShadow: 'var(--shadow-accent)' }}
                >
                    {type === 'work' ? <Briefcase size={22} /> : <GraduationCap size={22} />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <h3
                            className="text-lg font-semibold tracking-[-0.01em]"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {title}
                        </h3>
                        <span
                            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                                background: 'var(--muted)',
                                color: 'var(--accent)',
                                fontFamily: 'var(--font-jetbrains)',
                            }}
                        >
                            {dateRange}
                        </span>
                    </div>
                    <p className="mb-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                        {organization}
                    </p>
                    {description && (
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};
