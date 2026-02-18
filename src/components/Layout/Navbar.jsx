import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full flex items-center justify-between py-6 px-8 md:px-16 absolute top-0 left-0 z-40"
        >
            <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold text-xl">&gt;_</span>
                <span className="text-white font-bold text-xl tracking-tight">CodeAsh</span>
            </div>

            <div className="flex items-center gap-8 text-gray-400 text-sm font-medium">
                <a href="#" className="hover:text-white transition-colors">Problems</a>
                <a href="#" className="hover:text-white transition-colors">DSA Visualizer</a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
