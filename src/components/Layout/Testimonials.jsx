import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, image, rating, text, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] rounded-2xl p-8 border border-white/10 hover:border-green-500/20 transition-all"
    >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                        }`}
                />
            ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-300 leading-relaxed mb-6 italic">
            "{text}"
        </p>

        {/* User Info */}
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="text-white font-semibold">{name}</h4>
                <p className="text-gray-400 text-sm">{role}</p>
            </div>
        </div>
    </motion.div>
);

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Rahul Sharma',
            role: 'Software Engineer at Google',
            rating: 5,
            text: 'CodeAsh helped me crack my dream job! The problem sets are challenging and the AI interview prep is a game-changer.',
            delay: 0
        },
        {
            name: 'Priya Patel',
            role: 'Full Stack Developer',
            rating: 5,
            text: 'The contest feature is amazing! I love competing with other developers and the leaderboard keeps me motivated.',
            delay: 0.1
        },
        {
            name: 'Arjun Singh',
            role: 'CS Student at IIT',
            rating: 5,
            text: 'Best platform for DSA practice. The streak dashboard keeps me consistent and the community is super helpful!',
            delay: 0.2
        }
    ];

    return (
        <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#0B0F19] to-[#111827]">
            {/* Background glow */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/8 blur-[120px] rounded-full pointer-events-none"
            />

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
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            Users Say
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Real stories from developers who transformed their careers with CodeAsh
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            name={testimonial.name}
                            role={testimonial.role}
                            rating={testimonial.rating}
                            text={testimonial.text}
                            delay={testimonial.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
