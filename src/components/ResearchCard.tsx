"use client";

import { GlassCard } from "./GlassCard";
import { ExternalLink, FileText, FlaskConical, Presentation } from "lucide-react";

interface ResearchCardProps {
    title: string;
    type: 'published' | 'ongoing' | 'presentation';
    link?: string;
    status?: string;
    description: string;
}

export const ResearchCard = ({ title, type, link, status, description }: ResearchCardProps) => {
    const iconMap = {
        published: <FileText size={20} />,
        ongoing: <FlaskConical size={20} />,
        presentation: <Presentation size={20} />,
    };

    return (
        <GlassCard className="flex flex-col h-full group">
            {/* Top Row: Icon + Status */}
            <div className="mb-5 flex items-center justify-between">
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ background: 'linear-gradient(135deg, #36565F, #5F8190)' }}
                >
                    {iconMap[type]}
                </div>
                {status && (
                    <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider text-white"
                        style={{
                            background: 'linear-gradient(135deg, #36565F, #5F8190)',
                            fontFamily: 'var(--font-jetbrains)',
                        }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
                        {status}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3
                className="mb-3 text-lg font-semibold leading-tight tracking-[-0.01em] transition-colors duration-200"
                style={{ color: 'var(--foreground)' }}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                className="mb-6 flex-1 text-sm leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
            >
                {description}
            </p>

            {/* Link */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-max items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
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
        </GlassCard>
    );
};
