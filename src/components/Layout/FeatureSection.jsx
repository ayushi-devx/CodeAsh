import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const FeatureItem = ({ text }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 bg-green-500/20 p-1 rounded-sm">
            <Check className="w-3 h-3 text-green-400" />
        </div>
        <span className="text-gray-300 text-sm md:text-base">{text}</span>
    </div>
);

// Neural Network Particle Visualization
const NeuralNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;
        const connectionDistance = 150;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.3;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

const FeatureSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative w-full min-h-screen flex items-center px-6 md:px-16 py-20 overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute left-0 top-0 w-1/2 h-full bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col gap-5"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="inline-flex items-center gap-2 self-start bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-400 text-xs font-semibold tracking-wide uppercase">Must-Try Feature</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-4xl md:text-6xl font-sans font-bold text-white leading-[1.15]"
                    >
                        Visualize <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">DSA</span> Like Never Before
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-gray-400 text-base md:text-lg max-w-md"
                    >
                        Experience step-by-step algorithm visualizations designed to help you understand Arrays, Graphs, Trees and more.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="space-y-2 pt-2"
                    >
                        <FeatureItem text="See how arrays, stacks and trees evolve in real-time" />
                        <FeatureItem text="Control animation speed, beautifully each step" />
                        <FeatureItem text="Integrated pseudocode with high-level clarity" />
                        <FeatureItem text="Ideal for beginners and interview prep" />
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="mt-4 self-start bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    >
                        Launch Visualizer Now →
                    </motion.button>
                </motion.div>

                {/* Right Content - Neural Network Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative hidden md:block h-[500px]"
                >
                    {/* Neural Network Canvas Container */}
                    <div className="relative w-full h-full bg-[#0f0f13] border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_40px_-5px_rgba(34,197,94,0.2)]">
                        <NeuralNetwork />

                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

                        {/* Center glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
                    </div>

                    {/* Decorative Blob */}
                    <div className="absolute -z-10 top-20 -left-20 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]" />
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
