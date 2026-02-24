"use client";

import { GlassCard } from "./GlassCard";
import { ExternalLink, FileText, FlaskConical, Presentation } from "lucide-react";

interface ResearchCardProps {
    title: string;
    type: 'published' | 'ongoing' | 'presentation';
    link?: string;
    status?: string;
    description: string;
    datePublished?: string;
}

export const ResearchCard = ({ title, type, link, status, description, datePublished }: ResearchCardProps) => {
    const iconMap = {
        published: <FileText size={22} />,
        ongoing: <FlaskConical size={22} />,
        presentation: <Presentation size={22} />,
    };

    return (
        <GlassCard className="group relative">
            <div className="flex items-start gap-5">
                {/* Gradient Icon */}
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #36565F, #5F8190)', boxShadow: 'var(--shadow-accent)' }}
                >
                    {iconMap[type]}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <h3
                            className="text-lg font-semibold tracking-[-0.01em]"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                            {status && (
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #36565F, #5F8190)',
                                        fontFamily: 'var(--font-jetbrains)',
                                    }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
                                    {status}
                                </span>
                            )}
                            {datePublished && (
                                <span
                                    className="rounded-full px-3 py-1 text-xs font-medium"
                                    style={{
                                        background: 'var(--muted)',
                                        color: 'var(--accent)',
                                        fontFamily: 'var(--font-jetbrains)',
                                    }}
                                >
                                    {datePublished}
                                </span>
                            )}
                        </div>
                    </div>
                    {description && (
                        <p className="mb-2 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                            {description}
                        </p>
                    )}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-max items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                            style={{
                                background: 'var(--muted)',
                                color: 'var(--accent)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #36565F, #5F8190)';
                                e.currentTarget.style.color = '#FFFFFF';
                                e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--muted)';
                                e.currentTarget.style.color = 'var(--accent)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            View Project <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};
