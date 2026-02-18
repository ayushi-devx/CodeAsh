import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplineAvatar from './SplineAvatar';

const IntroSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    // 0: Initial Dark
    // 1: Avatar Scale In (0.5s)
    // 2: Audio Start (0.8s) -> implicitly handled by effect
    // 3: Audio End (1.8s)
    // 4: Logo Appear (2.0s)
    // 5: Glow Pulse (2.8s)
    // 6: Fade Out / Move Aside (3.5s)
    // 7: Main UI Reveal (4.0s)

    const audioRef = useRef(null);

    useEffect(() => {
        const timeline = [
            { time: 500, action: () => setStep(1) }, // Avatar Scale In starts
            {
                time: 1200, action: () => {             // Audio starts a bit later, letting the avatar settle
                    setStep(2);
                    if (audioRef.current) {
                        audioRef.current.volume = 0.5;
                        audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
                    }
                }
            },
            { time: 2500, action: () => setStep(3) }, // Logo Appears slower
            { time: 3500, action: () => setStep(4) }, // Glow Pulse
            { time: 5000, action: () => setStep(5) }, // Move Aside (give time to read logo)
            {
                time: 6000, action: () => {             // Main UI Reveal
                    setStep(6);
                    setTimeout(onComplete, 1500); // Allow longer overlap for smooth transition
                }
            },
        ];

        const timeouts = timeline.map(item => setTimeout(item.action, item.time));
        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-[#0b0b0f] overflow-hidden flex items-center justify-center">
            {/* Audio Element */}
            <audio ref={audioRef} src="/sounds/welcome.mp3" preload="auto" />

            {/* Spline Avatar Layer */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: step >= 1 ? 1 : 0.8,
                    opacity: step >= 1 ? 1 : 0,
                    x: step >= 5 ? '25%' : '0%', // Move slightly more aside
                    filter: step >= 5 ? 'blur(8px)' : 'blur(0px)', // Stronger blur for depth
                }}
                transition={{ duration: 2.0, ease: "easeInOut" }} // Slower movement
            >
                <SplineAvatar />
            </motion.div>

            {/* 3D Logo / Text Layer */}
            <AnimatePresence>
                {step >= 3 && step < 6 && (
                    <motion.div
                        className="z-20 flex flex-col items-center mix-blend-screen"
                        initial={{ opacity: 0, y: 30, scale: 0.95, letterSpacing: "0em" }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            letterSpacing: "0.05em", // Subtle expansion
                            textShadow: step >= 4 ? "0 0 30px rgba(74, 222, 128, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)" : "none" // Green glow
                        }}
                        exit={{ opacity: 0, scale: 1.1, blur: 15, transition: { duration: 1.2 } }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-300 via-green-500 to-green-800 font-heading">
                            CODEASH
                        </h1>
                        <motion.div
                            className="mt-6 h-0.5 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                            animate={{ width: ["0%", "100%", "40%"], opacity: [0, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay Effects - Clean Black Theme */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#0b0b0f] z-30" />
        </div>
    );
};

export default IntroSequence;
