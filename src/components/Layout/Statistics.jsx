import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Code, Trophy, Zap } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatCard = ({ icon: Icon, value, suffix, label, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="relative group"
    >
        <div className="relative bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`} />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Counter */}
            <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={value} suffix={suffix} />
            </div>

            {/* Label */}
            <p className="text-gray-400 text-sm">{label}</p>

            {/* Glow effect */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity`} />
        </div>
    </motion.div>
);

const Statistics = () => {
    const stats = [
        {
            icon: Users,
            value: 50000,
            suffix: '+',
            label: 'Active Users',
            color: 'from-blue-500 to-cyan-600',
            delay: 0
        },
        {
            icon: Code,
            value: 1200,
            suffix: '+',
            label: 'Coding Problems',
            color: 'from-green-500 to-emerald-600',
            delay: 0.1
        },
        {
            icon: Trophy,
            value: 500,
            suffix: '+',
            label: 'Contests Held',
            color: 'from-yellow-500 to-orange-600',
            delay: 0.2
        },
        {
            icon: Zap,
            value: 98,
            suffix: '%',
            label: 'Success Rate',
            color: 'from-violet-500 to-purple-600',
            delay: 0.3
        }
    ];

    return (
        <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#111827] to-[#0B0F19]">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-green-400 text-sm uppercase tracking-widest font-semibold mb-4 block">
                        Our Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Trusted by{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            Thousands
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join our growing community of developers mastering their coding skills
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            color={stat.color}
                            delay={stat.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
