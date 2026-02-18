import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Trophy, Gamepad2, MessageSquare, Flame, Video } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-start gap-4 py-6"
        >
            {/* Side Glow Effect on Hover */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scaleY: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-green-500 to-transparent rounded-full"
                style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
                }}
            />

            {/* Icon Container with Float Animation */}
            <motion.div
                animate={{
                    y: [0, -3, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                }}
                className="flex-shrink-0 w-12 h-12 rounded-full border border-green-500/30 bg-green-500/5 flex items-center justify-center"
                style={{
                    boxShadow: isHovered
                        ? '0 0 25px rgba(34, 197, 94, 0.4)'
                        : '0 0 15px rgba(34, 197, 94, 0.2)'
                }}
            >
                <Icon className="w-5 h-5 text-green-400" />
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 pl-2">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-green-400 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);
    const VISIBLE_COUNT = 2;
    const ROTATION_INTERVAL = 4000; // 4 seconds

    const features = [
        {
            icon: Code2,
            title: 'Problems',
            description: 'Topic-wise coding challenges with detailed test cases, attempt tracking, and solutions.',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: Trophy,
            title: 'Contests',
            description: 'Compete in timed coding contests. View leaderboards and track your performance.',
            color: 'from-yellow-500 to-orange-600'
        },
        {
            icon: Gamepad2,
            title: 'Game Rooms',
            description: 'Create or join rooms for 1v1 coding battles with random opponents.',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: MessageSquare,
            title: 'ChatnCode',
            description: 'Discord-like chat platform to discuss problems and collaborate.',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: Flame,
            title: 'Streak Dashboard',
            description: 'Track daily progress and visualize your coding consistency.',
            color: 'from-red-500 to-orange-600'
        },
        {
            icon: Video,
            title: 'AI Interview Prep',
            description: 'Practice with an AI interviewer through video-based questions.',
            color: 'from-violet-500 to-purple-600'
        }
    ];

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleStartIndex((prev) => (prev + VISIBLE_COUNT) % features.length);
        }, ROTATION_INTERVAL);

        return () => clearInterval(interval);
    }, [features.length]);

    // Get visible features
    const getVisibleFeatures = () => {
        const visible = [];
        for (let i = 0; i < VISIBLE_COUNT; i++) {
            const index = (visibleStartIndex + i) % features.length;
            visible.push({ ...features[index], key: `${index}-${visibleStartIndex}` });
        }
        return visible;
    };

    const visibleFeatures = getVisibleFeatures();

    return (
        <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#0B0F19] to-[#111827]">
            {/* Animated Background Glow */}
            <motion.div
                animate={{
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/8 blur-[120px] rounded-full pointer-events-none"
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
                    <span className="text-green-400 text-sm uppercase tracking-widest font-semibold mb-4 block">
                        Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Powerful Features for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            Real Growth
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need to master coding, compete with peers, and ace technical interviews.
                    </p>
                </motion.div>

                {/* Compact Features Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-2xl mx-auto rounded-2xl border border-green-500/20 bg-gradient-to-br from-[#0B0F19]/60 to-[#111827]/60 backdrop-blur-sm p-8"
                    style={{
                        boxShadow: '0 0 30px rgba(34, 197, 94, 0.1)'
                    }}
                >
                    {/* Features Carousel */}
                    <div className="relative h-[280px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={visibleStartIndex}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                {visibleFeatures.map((feature, index) => (
                                    <FeatureCard
                                        key={feature.key}
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                        color={feature.color}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center gap-2 mt-6 pt-6 border-t border-white/5">
                        {Array.from({ length: Math.ceil(features.length / VISIBLE_COUNT) }).map((_, index) => {
                            const startIdx = index * VISIBLE_COUNT;
                            const isActive = visibleStartIndex === startIdx;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setVisibleStartIndex(startIdx)}
                                    className={`h-1.5 rounded-full transition-all ${isActive
                                        ? 'w-8 bg-green-500'
                                        : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                                        }`}
                                />
                            );
                        })}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 mb-6">
                        Ready to solve real-world problems and level up your skills?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/20 transition-all"
                    >
                        Get Started Free
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
