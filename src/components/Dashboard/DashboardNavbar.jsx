import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code2, 
    Trophy, 
    Gamepad2, 
    MessageSquareCode, 
    Flame, 
    Briefcase,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Bell,
    Search
} from 'lucide-react';

const DashboardNavbar = ({ user, activeSection, onSectionChange }) => {
    const [activeTab, setActiveTab] = useState(activeSection || 'problems');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    const navItems = [
        { id: 'problems', label: 'Problems', icon: Code2 },
        { id: 'contest', label: 'Typing Race', icon: Trophy },
        { id: 'gameroom', label: 'Game Room', icon: Gamepad2 },
        { id: 'chatncode', label: 'ChatnCode', icon: MessageSquareCode },
        { id: 'streak', label: 'Streak Dashboard', icon: Flame },
        { id: 'interview', label: 'AI Interview Prep', icon: Briefcase }
    ];

    const notifications = [
        { id: 1, text: 'New contest starting in 2 hours', time: '10m ago', unread: true },
        { id: 2, text: 'You solved 5 problems today!', time: '1h ago', unread: true },
        { id: 3, text: 'Your streak is at 7 days', time: '2h ago', unread: false }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('codeash_user');
        window.location.href = '/';
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' 
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-[1600px] mx-auto px-6 py-4">
                <div className="flex items-center justify-between gap-8">
                    
                    {/* Logo */}
                    <motion.div 
                        className="flex items-center gap-3 cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-center gap-1">
                            <span className="text-green-400 text-2xl font-bold leading-none group-hover:text-green-300 transition-colors">&gt;</span>
                            <span className="text-green-400 text-2xl font-bold leading-none group-hover:text-green-300 transition-colors">_</span>
                        </div>
                        <span className="text-white font-bold text-xl tracking-wide">CodeAsh</span>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-md">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search problems, contests..."
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 rounded-xl text-white text-sm placeholder-gray-500 focus:border-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className="hidden xl:flex items-center gap-1 bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-1.5 border border-white/5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        if (onSectionChange) onSectionChange(item.id);
                                    }}
                                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                        isActive 
                                            ? 'text-white' 
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{item.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Right Side - Notifications & Profile */}
                    <div className="flex items-center gap-3">
                        
                        {/* Notifications */}
                        <div className="relative" ref={notifRef}>
                            <motion.button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2.5 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 rounded-xl hover:border-green-500/30 transition-all group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bell className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            </motion.button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-80 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/5">
                                            <h3 className="text-white font-semibold">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                                                        notif.unread ? 'bg-green-500/5' : ''
                                                    }`}
                                                >
                                                    <p className="text-white text-sm">{notif.text}</p>
                                                    <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <motion.button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 px-3 py-2 bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 rounded-xl hover:border-green-500/30 transition-all group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden md:block text-white text-sm font-medium">
                                    {user?.firstName || 'User'}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold">{user?.firstName || 'User'}</p>
                                                    <p className="text-gray-400 text-xs">{user?.email || 'user@example.com'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                                                <User className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                                                <span className="text-sm">My Profile</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                                                <Settings className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                                                <span className="text-sm">Settings</span>
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-white/5">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all group"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm">Logout</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default DashboardNavbar;
