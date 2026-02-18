import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const SocialLinks = () => {
    // Social Link Component
    const SocialLink = ({ icon: Icon, href, label, username }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        const linkRef = useRef(null);

        const handleMouseMove = (e) => {
            if (!linkRef.current) return;
            const rect = linkRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x, y });
        };

        return (
            <motion.a
                ref={linkRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex flex-col items-center gap-4 p-8 bg-[#0d0d0f]/70 backdrop-blur-md rounded-2xl border border-white/5 hover:border-green-500/30 transition-all duration-300 overflow-hidden group"
            >
                {/* Cursor follow glow */}
                {isHovered && (
                    <div
                        className="absolute w-40 h-40 bg-green-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-200"
                        style={{
                            left: mousePosition.x - 80,
                            top: mousePosition.y - 80,
                        }}
                    />
                )}

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-green-400" />
                </div>

                {/* Text */}
                <div className="relative z-10 text-center">
                    <p className="text-white font-semibold text-lg mb-1">{label}</p>
                    <p className="text-gray-400 text-sm">{username}</p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
        );
    };

    return (
        <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden">
            {/* Animated background glow */}
            <motion.div
                animate={{
                    x: ['10%', '-10%', '10%'],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/8 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-green-400 text-sm uppercase tracking-[0.2em] font-semibold mb-4">
                        Connect With Me
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Let's{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
                            Stay Connected
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        Have questions or want to collaborate? Reach out through any of these channels!
                    </p>
                </motion.div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SocialLink
                        icon={Linkedin}
                        href="https://www.linkedin.com/in/ayushi-soni-35-/"
                        label="LinkedIn"
                        username="ayushi-soni-35"
                    />
                    <SocialLink
                        icon={Github}
                        href="https://github.com/ayushi-devx"
                        label="GitHub"
                        username="ayushi-devx"
                    />
                    <SocialLink
                        icon={Mail}
                        href="mailto:ayushisonisvs2004@gmail.com"
                        label="Email"
                        username="ayushisonisvs2004@gmail.com"
                    />
                </div>
            </div>
        </section>
    );
};

export default SocialLinks;
