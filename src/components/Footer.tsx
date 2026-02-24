"use client";

import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Footer = () => {
    const { data, loading } = usePortfolioData();

    // Section visibility
    const rawVis = data?.hero?.section_visibility;
    const visibility = typeof rawVis === 'string' ? JSON.parse(rawVis) : (rawVis || {});
    const isVisible = (section: string) => visibility[section] !== false;

    // Contact info from DB
    const contact = data?.contact || {};
    const email = contact.email || '';
    const linkedin = contact.linkedin || '';

    // Build quick links based on visible sections that also have data
    const quickLinks = [
        ...(isVisible('academics') && data?.education?.length > 0 ? [{ name: 'Academics', href: '#academics' }] : []),
        ...(isVisible('experience') && data?.experience?.length > 0 ? [{ name: 'Experience', href: '#experience' }] : []),
        ...(isVisible('research') && data?.research?.length > 0 ? [{ name: 'Research', href: '#research' }] : []),
        ...(isVisible('awards') && data?.awards?.length > 0 ? [{ name: 'Awards', href: '#awards' }] : []),
        ...(isVisible('extracurriculars') && data?.extracurriculars?.length > 0 ? [{ name: 'Activities', href: '#volunteering' }] : []),
    ];

    const heroName = data?.hero?.name || 'Nafisa Alam';

    return (
        <footer
            id="contact"
            className="relative mt-20 overflow-hidden py-28"
            style={{ background: 'var(--foreground)' }}
        >
            {/* Dot Pattern Texture */}
            <div className="pointer-events-none absolute inset-0 dot-pattern" />

            {/* Radial Glow */}
            <div
                className="pointer-events-none absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(54,86,95,0.15), transparent 70%)' }}
            />

            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                >
                    <div className="grid gap-16 md:grid-cols-2">
                        {/* Left Column */}
                        <div>
                            {/* Section Label */}
                            <div
                                className="mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2"
                                style={{
                                    borderColor: 'rgba(226,240,240,0.20)',
                                    background: 'rgba(226,240,240,0.05)',
                                }}
                            >
                                <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: '#E2F0F0' }} />
                                <span
                                    className="text-xs uppercase tracking-[0.15em]"
                                    style={{ fontFamily: 'var(--font-jetbrains)', color: '#E2F0F0' }}
                                >
                                    Get in Touch
                                </span>
                            </div>

                            <h2
                                className="mb-6 text-3xl md:text-[3.25rem] leading-[1.15]"
                                style={{ fontFamily: 'var(--font-calistoga)', color: '#FFFFFF' }}
                            >
                                Let&apos;s{' '}
                                <span
                                    style={{
                                        background: 'linear-gradient(to right, #5F8190, #E2F0F0)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                    }}
                                >
                                    Connect
                                </span>
                            </h2>

                            <p className="mb-10 max-w-sm text-base leading-relaxed" style={{ color: 'rgba(226,240,240,0.7)' }}>
                                I&apos;m always open to discussing research collaborations, medical insights, or professional opportunities.
                            </p>

                            {/* Contact Links */}
                            <div className="flex flex-col gap-4">
                                {email && (
                                    <a
                                        href={`mailto:${email}`}
                                        className="group flex items-center gap-4 transition-colors duration-200"
                                        style={{ color: 'rgba(226,240,240,0.8)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(226,240,240,0.8)'}
                                    >
                                        <div
                                            className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200"
                                            style={{
                                                background: 'rgba(226,240,240,0.05)',
                                                borderColor: 'rgba(226,240,240,0.15)',
                                            }}
                                        >
                                            <Mail size={18} />
                                        </div>
                                        <span className="font-medium">{email}</span>
                                    </a>
                                )}
                                {linkedin && (
                                    <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 transition-colors duration-200"
                                        style={{ color: 'rgba(226,240,240,0.8)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(226,240,240,0.8)'}
                                    >
                                        <div
                                            className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200"
                                            style={{
                                                background: 'rgba(226,240,240,0.05)',
                                                borderColor: 'rgba(226,240,240,0.15)',
                                            }}
                                        >
                                            <Linkedin size={18} />
                                        </div>
                                        <span className="font-medium">LinkedIn Profile</span>
                                    </a>
                                )}
                                {!email && !linkedin && (
                                    <p className="text-sm" style={{ color: 'rgba(226,240,240,0.4)' }}>
                                        Add your contact info in the admin panel to display links here.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Quick Links Card */}
                        <div
                            className="relative overflow-hidden rounded-2xl border p-8"
                            style={{
                                background: 'rgba(226,240,240,0.03)',
                                borderColor: 'rgba(226,240,240,0.10)',
                            }}
                        >
                            <h3
                                className="mb-8 text-xl font-semibold"
                                style={{ color: '#FFFFFF' }}
                            >
                                Quick Links
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {quickLinks.length > 0 ? quickLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                                        style={{ color: 'rgba(226,240,240,0.7)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#FFFFFF';
                                            e.currentTarget.style.background = 'rgba(226,240,240,0.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'rgba(226,240,240,0.7)';
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                                    </a>
                                )) : (
                                    <p className="col-span-2 text-sm" style={{ color: 'rgba(226,240,240,0.4)' }}>
                                        Add content to sections via the admin panel to see quick links here.
                                    </p>
                                )}
                            </div>

                            <div
                                className="mt-16 border-t pt-6 text-sm font-medium"
                                style={{
                                    borderColor: 'rgba(226,240,240,0.10)',
                                    color: 'rgba(226,240,240,0.4)',
                                }}
                            >
                                © {new Date().getFullYear()} {heroName}. All rights reserved.
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};
