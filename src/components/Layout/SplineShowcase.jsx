import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const SplineShowcase = () => {
    const SPLINE_URL = "https://prod.spline.design/xq76dqjPIr1K9AoL/scene.splinecode";

    return (
        <section className="w-full py-24 px-6 md:px-16 flex flex-col items-center justify-center relative min-h-[80vh]">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                    Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">3D Visualization</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Experience our advanced algorithm visualization engine. Interact with the scene below.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full max-w-6xl h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm relative"
            >
                <Spline scene={SPLINE_URL} className="w-full h-full" />

                {/* Overlay hint */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full border border-white/10 text-xs text-gray-400 pointer-events-none">
                    Click & Drag to Interact
                </div>
            </motion.div>
        </section>
    );
};

export default SplineShowcase;
