import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from './DashboardNavbar';
import ProblemsContainer from './Problems/ProblemsContainer';
import ChatnCode from './ChatnCode/ChatnCode';
import StreakDashboard from './Streak/StreakDashboard';
import InterviewLanding from './Interview/InterviewLanding';
import GameMode from './Battle/GameMode';
import TypingRaceLobby from './TypingRace/TypingRaceLobby';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('problems');

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('codeash_user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if no user data
            window.location.href = '/';
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
                <div className="text-green-400 text-xl font-mono">Loading...</div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'problems':
                return <ProblemsContainer />;
            case 'contest':
                return <TypingRaceLobby />;
            case 'gameroom':
                return <GameMode />;
            case 'chatncode':
                return <ChatnCode />;
            case 'streak':
                return <StreakDashboard />;
            case 'interview':
                return <InterviewLanding />;
            default:
                return <ProblemsContainer />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            <DashboardNavbar user={user} activeSection={activeSection} onSectionChange={setActiveSection} />

            {/* Main Content */}
            <div className="relative z-10 pt-20">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
