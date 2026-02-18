import React from 'react';
import { motion } from 'framer-motion';
import { Check, Terminal } from 'lucide-react';

const FeatureItem = ({ text }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 bg-green-500/20 p-1 rounded-sm">
            <Check className="w-3 h-3 text-green-400" />
        </div>
        <span className="text-gray-300 text-sm md:text-base">{text}</span>
    </div>
);

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center px-6 md:px-16 pt-20 overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col gap-5"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 self-start bg-white/5 border border-white/10 rounded-full px-3 py-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-400 text-xs font-semibold tracking-wide uppercase">Latest Updates</span>
                        <span className="text-gray-500 text-xs px-2 border-l border-white/10">New algorithms added</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-white leading-[1.15]">
                        Master Data <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            Structures &
                        </span> <br />
                        Algorithms
                    </h1>

                    <p className="text-gray-400 text-base md:text-lg max-w-md">
                        Practice, visualize, and master coding challenges with our premium interactive learning platform.
                    </p>

                    <div className="space-y-2 pt-2">
                        <FeatureItem text="Track your Progress" />
                        <FeatureItem text="Visualize algorithms with step-by-step animations" />
                        <FeatureItem text="AI Chatbot for debugging and problem solving" />
                        <FeatureItem text="100% Free — No paywalls, no subscriptions" />
                        <FeatureItem text="Fully Open Source — Contribute on GitHub!" />
                    </div>
                </motion.div>

                {/* Right Content - Visual Code Snippet + Spline Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative hidden md:block"
                >
                    {/* Code Snippet Card */}
                    <div className="bg-[#0f0f13] border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_40px_-5px_rgba(34,197,94,0.2)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        {/* Title Bar */}
                        <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="ml-4 text-xs text-gray-500 font-mono">two_sum.py</span>
                        </div>

                        {/* Code */}
                        <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
                            <div className="text-gray-500 mb-4">
                                # Two Sum Problem <br />
                                # Given an array of integers, return indices
                            </div>

                            <div>
                                <span className="text-purple-400">def</span> <span className="text-yellow-200">twoSum</span>(nums, target):
                            </div>
                            <div className="pl-4">
                                hashmap = {'{}'}
                            </div>
                            <div className="pl-4">
                                <span className="text-purple-400">for</span> i, num <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(nums):
                            </div>
                            <div className="pl-8">
                                complement = target - num
                            </div>
                            <div className="pl-8">
                                <span className="text-purple-400">if</span> complement <span className="text-purple-400">in</span> hashmap:
                            </div>
                            <div className="pl-12">
                                <span className="text-purple-400">return</span> [hashmap[complement], i]
                            </div>
                            <div className="pl-8">
                                hashmap[num] = i
                            </div>

                            <div className="mt-4 text-gray-500">
                                # Test <br />
                                nums = [2, 7, 11, 15], target = 9 <br />
                                Output: [0, 1]
                            </div>
                        </div>
                    </div>

                    {/* Decorative Blob */}
                    <div className="absolute -z-10 top-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
