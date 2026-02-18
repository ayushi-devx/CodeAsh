import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        Product: [
            { name: 'Features', href: '#features' },
            { name: 'Problems', href: '#problems' },
            { name: 'Contests', href: '#contests' },
            { name: 'Pricing', href: '#pricing' }
        ],
        Company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#careers' },
            { name: 'Blog', href: '#blog' },
            { name: 'Contact', href: '#contact' }
        ],
        Resources: [
            { name: 'Documentation', href: '#docs' },
            { name: 'Tutorials', href: '#tutorials' },
            { name: 'Community', href: '#community' },
            { name: 'Support', href: '#support' }
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Cookie Policy', href: '#cookies' },
            { name: 'Disclaimer', href: '#disclaimer' }
        ]
    };

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '#', label: 'Email' }
    ];

    return (
        <footer className="relative w-full bg-gradient-to-b from-[#111827] to-[#0B0F19] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Code<span className="text-green-400">Ash</span>
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Empowering developers to master coding through interactive challenges, contests, and AI-powered learning.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 flex items-center justify-center transition-all group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        >
                            <h4 className="text-white font-semibold mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border-t border-white/5 pt-8 mb-8"
                >
                    <div className="max-w-md">
                        <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest updates and coding tips.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        © 2026 CodeAsh. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by developers, for developers.
                    </p>
                    <p className="text-gray-500 text-xs">
                        All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
