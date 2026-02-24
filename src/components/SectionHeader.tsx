"use client";

import { motion } from 'framer-motion';

interface SectionHeaderProps {
    label: string;
    title: string;
    highlightWord?: string;
    subtitle?: string;
    className?: string;
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SectionHeader = ({ label, title, highlightWord, subtitle, className }: SectionHeaderProps) => {
    const renderTitle = () => {
        if (!highlightWord) return title;
        const parts = title.split(highlightWord);
        return (
            <>
                {parts[0]}
                <span className="gradient-text">{highlightWord}</span>
                {parts[1] || ''}
            </>
        );
    };

    return (
        <motion.div
            className={`mb-16 ${className || ''}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut }}
        >
            {/* Section Label Badge */}
            <div
                className="mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2"
                style={{
                    borderColor: 'rgba(54,86,95,0.30)',
                    background: 'rgba(226,240,240,0.6)',
                }}
            >
                <span
                    className="h-2 w-2 rounded-full animate-pulse-dot"
                    style={{ background: 'var(--accent)' }}
                />
                <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{
                        fontFamily: 'var(--font-jetbrains)',
                        color: 'var(--accent)',
                    }}
                >
                    {label}
                </span>
            </div>

            {/* Headline */}
            <h2
                className="text-3xl md:text-[3.25rem] leading-[1.15] tracking-normal"
                style={{
                    fontFamily: 'var(--font-calistoga)',
                    color: 'var(--foreground)',
                }}
            >
                {renderTitle()}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className="mt-5 max-w-2xl text-lg leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};
