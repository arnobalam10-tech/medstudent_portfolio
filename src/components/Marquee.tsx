"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
    items: string[];
    speed?: number;
}

export const Marquee = ({ items, speed = 25 }: MarqueeProps) => {
    return (
        <div
            className="relative flex w-full overflow-hidden py-5"
            style={{ background: 'linear-gradient(135deg, #36565F, #5F8190)' }}
        >
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1200] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                    <span key={idx} className="flex items-center">
                        <span
                            className="mx-8 text-lg font-semibold tracking-widest uppercase sm:text-xl md:text-2xl"
                            style={{ color: '#FFFFFF', fontFamily: 'var(--font-jetbrains)' }}
                        >
                            {item}
                        </span>
                        <span
                            className="text-sm"
                            style={{ color: 'rgba(226,240,240,0.5)' }}
                        >
                            ✦
                        </span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
