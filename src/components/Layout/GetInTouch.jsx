import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import ConnectingScreen from './ConnectingScreen';
import axios from 'axios';

const GetInTouch = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isConnecting, setIsConnecting] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    const messages = [
        "Hello,",
        "Welcome to CodeAsh",
        "Be a part of our community"
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form submitted!', formData);
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        console.log('Validation passed, showing connecting screen...');
        setIsConnecting(true);

        try {
            // Call backend API
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                firstName: formData.firstName,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                // Save token and user data
                localStorage.setItem('codeash_token', response.data.data.token);
                localStorage.setItem('codeash_user', JSON.stringify({
                    firstName: response.data.data.firstName,
                    email: response.data.data.email,
                    loginTime: new Date().toISOString()
                }));
                
                // Show connecting screen
                setTimeout(() => {
                    setIsConnecting(false);
                    window.location.href = '/dashboard';
                }, 3500);
            }
        } catch (error) {
            setIsConnecting(false);
            console.error('Registration error:', error);
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google sign in clicked');
        alert('Google Sign-In coming soon! Please use email signup for now.');
    };

    const handleConnectingComplete = () => {
        setIsConnecting(false);
        setAccountCreated(true);
        
        // Save user data to localStorage
        const userData = {
            firstName: formData.firstName,
            email: formData.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('codeash_user', JSON.stringify(userData));
        
        // Redirect to dashboard
        console.log('Connection complete! Redirecting to dashboard...');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {/* Show connecting screen when form is submitted */}
            {isConnecting && (
                <>
                    {console.log('Rendering ConnectingScreen, isConnecting:', isConnecting)}
                    <ConnectingScreen onComplete={handleConnectingComplete} />
                </>
            )}

            <section className="relative w-full py-20 px-6 md:px-12 overflow-hidden">
            <motion.div
                animate={{ x: ['-10%', '10%', '-10%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/8 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="flex items-center gap-1">
                                <span className="text-green-400 text-4xl font-bold leading-none">&gt;</span>
                                <span className="text-green-400 text-4xl font-bold leading-none">_</span>
                            </div>
                            <h3 className="text-white font-bold text-3xl tracking-wide">CodeAsh</h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                                Create Your Account
                            </h2>
                            <p className="text-gray-400 text-sm">Join our community of coders</p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                    placeholder="John"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25"
                            >
                                Create Account
                            </motion.button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-[#0b0b0f] text-gray-400">or</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full px-6 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg text-white font-medium hover:border-green-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                                    <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                                    <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                                    <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <p className="text-center text-gray-400 text-sm mt-4">
                                Already have an account?{' '}
                                <a href="#" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                                    Log in
                                </a>
                            </p>
                        </motion.form>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a] border border-white/5"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

                        <div className="relative z-10 h-full p-8 grid grid-cols-3 gap-4">
                            {[...Array(9)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                    className="bg-[#1a1a1a]/30 backdrop-blur-sm rounded-xl border border-white/5 hover:border-green-500/20 transition-all duration-300"
                                />
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTextIndex}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-center px-8"
                                >
                                    <h3 className="text-white text-3xl md:text-4xl font-bold drop-shadow-2xl">
                                        {messages[currentTextIndex]}
                                    </h3>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
        </>
    );
};

export default GetInTouch;
