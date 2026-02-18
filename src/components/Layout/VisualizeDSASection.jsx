import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const VisualizeDSASection = () => {
    return (
        <section className="w-full py-24 px-6 md:px-16 relative overflow-hidden">
            {/* Starry Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f] via-[#1a1a2e] to-[#0b0b0f]">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${2 + Math.random() * 3}s infinite`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                        <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Must-Try Feature</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        Visualize <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">DSA</span> Like Never Before
                    </h2>

                    <p className="text-gray-400 text-lg">
                        Experience step-by-step algorithm visualizations designed to help you understand Arrays, Graphs, Trees and more.
                    </p>

                    <div className="space-y-3 pt-4">
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">See how arrays, stacks and trees evolve in real-time</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">Control animation speed, beautifully each step</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">Integrated pseudocode with high-level clarity</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">Ideal for beginners and interview prep</span>
                        </div>
                    </div>

                    <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Launch Visualizer Now →
                    </button>
                </motion.div>

                {/* Right - Brain Visual Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] flex items-center justify-center"
                >
                    {/* Brain-like gradient orb */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-pink-500/20 rounded-full blur-[100px]" />
                        <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-green-400/30 via-blue-500/30 to-purple-500/30 rounded-full blur-[80px] animate-pulse" />

                        {/* Particle effect simulation */}
                        <div className="relative w-[300px] h-[300px] rounded-full border border-white/10 flex items-center justify-center">
                            <div className="text-white/50 text-sm">Brain Visualization</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
        </section>
    );
};

export default VisualizeDSASection;
