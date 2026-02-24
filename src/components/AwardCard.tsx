"use client";

import { GlassCard } from "./GlassCard";
import { Award, ShieldCheck, ExternalLink } from "lucide-react";

interface AwardCardProps {
    title: string;
    type: 'license' | 'scholarship';
    year: string;
    description: string;
    link?: string;
}

export const AwardCard = ({ title, type, year, description, link }: AwardCardProps) => {
    return (
        <GlassCard className="group">
            <div className="flex items-start gap-5">
                {/* Gradient Icon */}
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: 'linear-gradient(135deg, #36565F, #5F8190)',
                        boxShadow: 'var(--shadow-accent)',
                    }}
                >
                    {type === 'license' ? <ShieldCheck size={22} /> : <Award size={22} />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3
                            className="text-lg font-semibold tracking-[-0.01em] transition-colors duration-200"
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
                            {year}
                        </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                        {description}
                    </p>
                    {link && (
                        <a
                            href={link}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                            style={{ color: 'var(--accent)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
                        >
                            Verify <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};
