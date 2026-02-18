import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Review Card Component with continuous scrolling animation
const ReviewCard = ({ name, role, review, rating, direction = 'up' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative bg-[#0d0d0f]/70 backdrop-blur-md rounded-lg p-3 border border-white/5 hover:border-green-500/30 transition-all duration-300 overflow-hidden group mb-3 flex-shrink-0"
        >
            {/* Cursor follow glow effect */}
            {isHovered && (
                <div
                    className="absolute w-32 h-32 bg-green-500/20 rounded-full blur-2xl pointer-events-none transition-all duration-200"
                    style={{
                        left: mousePosition.x - 64,
                        top: mousePosition.y - 64,
                    }}
                />
            )}

            {/* Card Content */}
            <div className="relative z-10">
                {/* Header with Avatar and Info */}
                <div className="flex items-start gap-2 mb-2">
                    {/* Profile Image */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                        {name.charAt(0)}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-xs mb-0.5">{name}</h4>
                        <p className="text-gray-400 text-[10px]">{role}</p>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-0.5 mb-2">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-green-400 text-green-400" />
                    ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-[11px] leading-relaxed">
                    "{review}"
                </p>
            </div>
        </div>
    );
};

const AchievementsSection = () => {
    // User reviews and comments
    const reviews = [
        { name: 'Ashish Dubey', role: 'Microsoft Intern', review: 'CodeAsh helped me crack Microsoft! The DSA problems are top-notch.', rating: 5 },
        { name: 'Priya Sharma', role: 'Google SDE', review: 'Best platform for competitive programming. The AI hints are amazing!', rating: 5 },
        { name: 'Rahul Verma', role: 'Amazon Developer', review: 'From zero to hero in 6 months. Made DSA fun and easy.', rating: 5 },
        { name: 'Sneha Patel', role: 'Flipkart Engineer', review: 'Community support is incredible. Got my dream job!', rating: 5 },
        { name: 'Rohan Kumar', role: 'Bosch Engineer', review: 'Interactive visualizations helped me understand algorithms.', rating: 5 },
        { name: 'Ananya Singh', role: 'TCS Digital', review: 'Weekly contests keep me motivated. Improved my speed!', rating: 5 },
        { name: 'Vikram Joshi', role: 'Infosys Specialist', review: 'My go-to platform for interview prep. Highly recommended!', rating: 5 },
        { name: 'Neha Gupta', role: 'Wipro Developer', review: 'Perfect difficulty progression for beginners like me.', rating: 5 },
        { name: 'Arjun Mehta', role: 'Paytm SDE', review: 'Practiced 500+ problems and got placed. Worth it!', rating: 5 },
        { name: 'Kavya Reddy', role: 'Oracle Developer', review: 'Crystal clear explanations. Finally understood DP!', rating: 5 },
        { name: 'Siddharth Rao', role: 'Accenture Engineer', review: 'Transformed my coding journey completely!', rating: 5 },
        { name: 'Ishita Kapoor', role: 'Cognizant SDE', review: 'Clean UI and smooth experience. Learning is fun!', rating: 5 },
    ];

    // Create 3 sets for continuous loop
    const column1Reviews = [reviews[0], reviews[3], reviews[6], reviews[9]];
    const column2Reviews = [reviews[1], reviews[4], reviews[7], reviews[10]];
    const column3Reviews = [reviews[2], reviews[5], reviews[8], reviews[11]];

    return (
        <section className="relative w-full py-24 px-6 md:px-12 overflow-hidden">
            {/* Animated background glow - subtle horizontal movement */}
            <motion.div
                animate={{
                    x: ['-10%', '10%', '-10%'],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/8 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Container with Neon Border */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative rounded-[36px] border border-green-500/30 bg-gradient-to-br from-[#0B0F19] to-[#111827] backdrop-blur-sm overflow-hidden"
                    style={{
                        padding: 'clamp(25px, 5vw, 50px)',
                        boxShadow: '0 0 60px rgba(34, 197, 94, 0.12), inset 0 0 80px rgba(34, 197, 94, 0.03)'
                    }}
                >
                    {/* Breathing Border Glow Animation */}
                    <motion.div
                        animate={{
                            opacity: [0.4, 0.7, 0.4],
                            boxShadow: [
                                '0 0 20px rgba(34, 197, 94, 0.2)',
                                '0 0 40px rgba(34, 197, 94, 0.35)',
                                '0 0 20px rgba(34, 197, 94, 0.2)'
                            ]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-[36px] border border-green-500/40 pointer-events-none"
                    />

                    {/* Inner subtle radial gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* Content Grid - Left: Reviews, Right: CodeAsh Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                        {/* LEFT SIDE - Continuous Scrolling Reviews (3 Columns) */}
                        <div className="grid grid-cols-3 gap-2 h-[350px] overflow-hidden relative">
                            {/* Gradient fade at top and bottom */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0B0F19] to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111827] to-transparent z-10 pointer-events-none" />

                            {/* Column 1 - Moving Up */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        y: [0, -100 * column1Reviews.length * 2]
                                    }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="space-y-0"
                                >
                                    {[...column1Reviews, ...column1Reviews, ...column1Reviews].map((review, index) => (
                                        <ReviewCard
                                            key={`col1-${index}`}
                                            name={review.name}
                                            role={review.role}
                                            review={review.review}
                                            rating={review.rating}
                                            direction="up"
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Column 2 - Moving Down */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        y: [-100 * column2Reviews.length, 0]
                                    }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="space-y-0"
                                >
                                    {[...column2Reviews, ...column2Reviews, ...column2Reviews].map((review, index) => (
                                        <ReviewCard
                                            key={`col2-${index}`}
                                            name={review.name}
                                            role={review.role}
                                            review={review.review}
                                            rating={review.rating}
                                            direction="down"
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Column 3 - Moving Up */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        y: [0, -100 * column3Reviews.length * 2]
                                    }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="space-y-0"
                                >
                                    {[...column3Reviews, ...column3Reviews, ...column3Reviews].map((review, index) => (
                                        <ReviewCard
                                            key={`col3-${index}`}
                                            name={review.name}
                                            role={review.role}
                                            review={review.review}
                                            rating={review.rating}
                                            direction="up"
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - CodeAsh Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="space-y-6"
                        >
                            {/* CodeAsh Logo and Label */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4"
                            >
                                {/* Terminal Logo */}
                                <div className="flex items-center gap-2">
                                    <div className="text-green-400 text-4xl font-bold leading-none">
                                        &gt;_
                                    </div>
                                    <h3 className="text-white font-bold text-3xl tracking-tight">
                                        CodeAsh
                                    </h3>
                                </div>
                            </motion.div>

                            {/* Section Label */}
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35 }}
                                className="inline-block text-green-400 text-xs uppercase tracking-[0.15em] font-semibold"
                            >
                                What Users Say
                            </motion.span>

                            {/* Main Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl md:text-4xl font-bold text-white leading-tight"
                            >
                                Trusted by{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
                                    50,000+ Developers
                                </span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-400 text-base leading-relaxed"
                            >
                                CodeAsh is revolutionizing how developers learn DSA. With interactive problems, AI-powered hints, and a supportive community, we're helping thousands land their dream jobs at top tech companies.
                            </motion.p>

                            {/* Statistics Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="bg-[#0d0d0f]/50 rounded-lg p-4 border border-green-500/10">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        50K<span className="text-green-400">+</span>
                                    </div>
                                    <p className="text-gray-400 text-xs">Active Users</p>
                                </div>
                                <div className="bg-[#0d0d0f]/50 rounded-lg p-4 border border-green-500/10">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        1,200<span className="text-green-400">+</span>
                                    </div>
                                    <p className="text-gray-400 text-xs">DSA Problems</p>
                                </div>
                                <div className="bg-[#0d0d0f]/50 rounded-lg p-4 border border-green-500/10">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        500<span className="text-green-400">+</span>
                                    </div>
                                    <p className="text-gray-400 text-xs">Weekly Contests</p>
                                </div>
                                <div className="bg-[#0d0d0f]/50 rounded-lg p-4 border border-green-500/10">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        98<span className="text-green-400">%</span>
                                    </div>
                                    <p className="text-gray-400 text-xs">Success Rate</p>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="px-7 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 text-sm"
                            >
                                Start Your Journey
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;
