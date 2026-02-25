"use client";

import { GlassCard } from "./GlassCard";
import { motion } from "framer-motion";

interface VolunteeringItemProps {
    title: string;
    organization?: string;
    category?: string;
    description: string;
    image?: string;
    image_url?: string;
    index?: number;
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VolunteeringShowcase = ({ items }: { items: VolunteeringItemProps[] }) => {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: easeOut }}
                    className={idx === 0 ? "lg:col-span-2" : ""}
                >
                    <div
                        className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                        style={{
                            background: 'var(--card)',
                            borderColor: 'var(--border)',
                            boxShadow: 'var(--shadow-md)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-xl)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                    >
                        <div className="p-8">

                            <h3
                                className="mb-2 text-xl font-semibold leading-tight tracking-[-0.01em] transition-colors duration-200"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {item.title}
                            </h3>
                            <p className="mb-3 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                                {item.organization}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Accent Bar */}
                        <div
                            className="h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ background: 'linear-gradient(to right, #36565F, #5F8190)' }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
