"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroProps {
    heroData?: any;
}

export default function Hero({ heroData }: HeroProps) {
    // Default values
    const greeting = heroData?.greeting || 'Hi, There!';
    const name = heroData?.name || 'Nafisa Alam';
    const subtitle = heroData?.subtitle || 'Medical student, researcher, and clinical enthusiast dedicated to bridging the gap between innovative research and patient care.';
    const badgeText = heroData?.badge_text || 'MBBS Candidate · Class of 2026';
    const profileImageUrl = heroData?.profile_image_url || '';
    const ctaPrimaryText = heroData?.cta_primary_text || 'View Research';
    const ctaPrimaryLink = heroData?.cta_primary_link || '#research';
    const ctaSecondaryText = heroData?.cta_secondary_text || 'Contact Me';
    const ctaSecondaryLink = heroData?.cta_secondary_link || '#contact';
    const socialFacebook = heroData?.social_facebook || '';
    const socialInstagram = heroData?.social_instagram || '';
    const socialTwitter = heroData?.social_twitter || '';
    const socialLinkedin = heroData?.social_linkedin || '';

    // Split name for gradient effect on last word
    const nameParts = name.split(' ');
    const firstName = nameParts.slice(0, -1).join(' ');
    const lastName = nameParts[nameParts.length - 1];

    const socials = [
        { icon: <Facebook size={18} />, url: socialFacebook },
        { icon: <Instagram size={18} />, url: socialInstagram },
        { icon: <Twitter size={18} />, url: socialTwitter },
        { icon: <Linkedin size={18} />, url: socialLinkedin },
    ].filter(s => s.url);

    return (
        <section className="hero-dark-bg relative min-h-screen overflow-hidden">
            {/* Background decorations */}
            <div
                className="pointer-events-none absolute top-0 right-0 h-full w-1/2"
                style={{
                    background: 'radial-gradient(ellipse at 70% 50%, rgba(54,86,95,0.15), transparent 70%)',
                }}
            />
            <div
                className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(95,129,144,0.08), transparent 70%)',
                }}
            />
            {/* Subtle dot pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(226,240,240,0.03) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="container relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-24 pb-16">
                <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: easeOut }}
                        className="order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <div
                            className="mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2"
                            style={{
                                borderColor: 'rgba(95,129,144,0.3)',
                                background: 'rgba(54,86,95,0.15)',
                            }}
                        >
                            <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: '#5F8190' }} />
                            <span
                                className="text-xs uppercase tracking-[0.15em]"
                                style={{ fontFamily: 'var(--font-jetbrains)', color: '#5F8190' }}
                            >
                                {badgeText}
                            </span>
                        </div>

                        {/* Greeting */}
                        <p
                            className="mb-3 text-lg font-medium"
                            style={{ color: 'rgba(226,240,240,0.7)' }}
                        >
                            {greeting}
                        </p>

                        {/* Name */}
                        <h1
                            className="mb-6 text-[2.5rem] md:text-5xl lg:text-[4.5rem] leading-[1.08] tracking-[-0.02em]"
                            style={{ fontFamily: 'var(--font-calistoga)', color: '#FFFFFF' }}
                        >
                            I&apos;m{' '}
                            <span className="hero-gradient-text">{firstName ? `${firstName} ` : ''}{lastName}</span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="mb-8 max-w-lg text-base leading-[1.75] md:text-lg"
                            style={{ color: 'rgba(226,240,240,0.55)' }}
                        >
                            {subtitle}
                        </p>

                        {/* Social Links */}
                        {socials.length > 0 && (
                            <div className="mb-8 flex items-center gap-4">
                                {socials.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
                                        style={{
                                            borderColor: 'rgba(95,129,144,0.3)',
                                            color: 'rgba(226,240,240,0.6)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#5F8190';
                                            e.currentTarget.style.color = '#FFFFFF';
                                            e.currentTarget.style.background = 'rgba(54,86,95,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(95,129,144,0.3)';
                                            e.currentTarget.style.color = 'rgba(226,240,240,0.6)';
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={ctaPrimaryLink}
                                className="group inline-flex h-13 items-center gap-2 rounded-xl px-8 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                                style={{
                                    background: 'linear-gradient(to right, #36565F, #5F8190)',
                                    boxShadow: '0 4px 14px rgba(54, 86, 95, 0.4)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(54, 86, 95, 0.5)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 14px rgba(54, 86, 95, 0.4)'}
                            >
                                {ctaPrimaryText}
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                            <a
                                href={ctaSecondaryLink}
                                className="inline-flex h-13 items-center rounded-xl border px-8 font-medium transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    borderColor: 'rgba(95,129,144,0.3)',
                                    color: 'rgba(226,240,240,0.7)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(54,86,95,0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(95,129,144,0.5)';
                                    e.currentTarget.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(95,129,144,0.3)';
                                    e.currentTarget.style.color = 'rgba(226,240,240,0.7)';
                                }}
                            >
                                {ctaSecondaryText}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
                        className="relative order-1 flex items-center justify-center lg:order-2"
                    >
                        {profileImageUrl ? (
                            <div className="relative">
                                {/* Glow behind image */}
                                <div
                                    className="absolute inset-0 -z-10 translate-y-4 scale-90 rounded-full blur-3xl"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(54,86,95,0.35), rgba(95,129,144,0.15), transparent 70%)',
                                    }}
                                />
                                {/* Gradient arc behind the photo */}
                                <div
                                    className="absolute -inset-4 -z-10 rounded-full"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(54,86,95,0.2), rgba(95,129,144,0.1), transparent 60%)',
                                    }}
                                />
                                <Image
                                    src={profileImageUrl}
                                    alt={name}
                                    width={520}
                                    height={620}
                                    className="hero-profile-image relative z-10 h-auto max-h-[75vh] w-full max-w-[420px] object-contain drop-shadow-2xl lg:max-w-[480px]"
                                    priority
                                />
                            </div>
                        ) : (
                            /* Default placeholder when no image uploaded */
                            <div className="relative flex h-[400px] w-[350px] items-center justify-center lg:h-[500px] lg:w-[420px]">
                                {/* Rotating ring */}
                                <div
                                    className="absolute h-[85%] w-[85%] rounded-full border-2 border-dashed animate-spin-slow"
                                    style={{ borderColor: 'rgba(95,129,144,0.15)' }}
                                />
                                {/* Inner glow */}
                                <div
                                    className="absolute h-[55%] w-[55%] rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(54,86,95,0.15), rgba(95,129,144,0.05))',
                                    }}
                                />
                                {/* Silhouette icon */}
                                <div
                                    className="flex h-32 w-32 items-center justify-center rounded-full"
                                    style={{ background: 'rgba(54,86,95,0.2)' }}
                                >
                                    <svg
                                        width="60" height="60" viewBox="0 0 24 24" fill="none"
                                        stroke="rgba(226,240,240,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
