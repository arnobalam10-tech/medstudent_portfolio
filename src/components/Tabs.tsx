"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabsProps {
    tabs: { id: string; label: string; content: React.ReactNode }[];
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Tabs = ({ tabs }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full">
            {/* Tab Bar */}
            <div
                className="mb-12 inline-flex gap-1.5 rounded-2xl p-1.5"
                style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
                        style={{
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #36565F, #5F8190)'
                                : 'transparent',
                            color: activeTab === tab.id ? '#FFFFFF' : 'var(--muted-foreground)',
                            boxShadow: activeTab === tab.id ? 'var(--shadow-accent)' : 'none',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                >
                    {tabs.find((tab) => tab.id === activeTab)?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
