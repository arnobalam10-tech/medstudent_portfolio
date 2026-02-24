import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 0.7, delay, ease: easeOut }}
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-[var(--card)] p-8 transition-all duration-300",
                "hover:-translate-y-1",
                className
            )}
            style={{
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-md)',
            }}
            whileHover={{
                boxShadow: 'var(--shadow-xl)',
            }}
        >
            {/* Hover gradient overlay */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: 'linear-gradient(to bottom right, rgba(54,86,95,0.03), transparent)',
                }}
            />
            {children}
        </motion.div>
    );
};
