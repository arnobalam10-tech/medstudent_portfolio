"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Academics', href: '#academics' },
    { name: 'Experience', href: '#experience' },
    { name: 'Research', href: '#research' },
    { name: 'Awards', href: '#awards' },
    { name: 'Activities', href: '#volunteering' },
    { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
            >
                <div className="container mx-auto px-6">
                    <div
                        className={`mx-auto max-w-5xl rounded-2xl border px-6 py-3 transition-all duration-500 ${scrolled
                                ? 'bg-[var(--card)]/90 backdrop-blur-xl'
                                : 'bg-transparent border-transparent'
                            }`}
                        style={{
                            borderColor: scrolled ? 'var(--border)' : 'transparent',
                            boxShadow: scrolled ? 'var(--shadow-lg)' : 'none',
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="text-lg tracking-tight"
                                style={{
                                    fontFamily: 'var(--font-calistoga)',
                                    color: 'var(--foreground)',
                                }}
                            >
                                Nafisa Alam
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden items-center gap-1 md:flex">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200"
                                        style={{ color: 'var(--muted-foreground)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--muted)';
                                            e.currentTarget.style.color = 'var(--foreground)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--muted-foreground)';
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
                                style={{ color: 'var(--foreground)' }}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[var(--foreground)]/50 backdrop-blur-sm md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mx-6 mt-24 rounded-2xl border p-6"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--border)',
                                boxShadow: 'var(--shadow-xl)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="rounded-xl px-4 py-3 text-base font-medium transition-colors"
                                        style={{ color: 'var(--foreground)' }}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
