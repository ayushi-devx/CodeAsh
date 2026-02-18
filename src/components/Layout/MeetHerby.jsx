import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const FeatureItem = ({ text }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 bg-green-500/20 p-1 rounded-sm">
            <Check className="w-4 h-4 text-green-400" />
        </div>
        <span className="text-gray-300 text-base">{text}</span>
    </div>
);

const MeetHerby = () => {
    return (
        <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Meet Herby
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Your personal AI assistant to explain, debug, and solve DSA problems
                        — integrated directly into each challenge!
                    </p>

                    <div className="space-y-4 pt-2">
                        <FeatureItem text="Get approach & explanation in plain English" />
                        <FeatureItem text="Understand time & space complexity instantly" />
                        <FeatureItem text="Supports all problems and languages" />
                    </div>

                    <div className="pt-6">
                        <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-green-500/20 transition-all transform hover:scale-105 active:scale-95">
                            Try Herby Now
                        </button>
                    </div>
                </motion.div>

                {/* Right Content - Robot 3D Model */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[500px] w-full bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm"
                    style={{
                        boxShadow: '0 0 60px -10px rgba(34, 197, 94, 0.15)'
                    }}
                >
                    {/* Hide Spline watermark */}
                    <style>{`
                        #spline-watermark,
                        [class*="watermark"],
                        [class*="logo"],
                        a[href*="spline"] {
                            display: none !important;
                            opacity: 0 !important;
                            visibility: hidden !important;
                        }
                    `}</style>
                    <Spline scene="https://prod.spline.design/3yyr6r5HnA5GqfV5/scene.splinecode" />
                </motion.div>

            </div>
        </section>
    );
};

export default MeetHerby;
