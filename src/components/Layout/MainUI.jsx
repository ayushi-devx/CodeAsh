import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import MeetHerby from './MeetHerby';
import ProblemPreview from './ProblemPreview';
import FeaturesSection from './FeaturesSection';
import AchievementsSection from './AchievementsSection';
import GetInTouch from './GetInTouch';
import SocialLinks from './SocialLinks';
import Footer from './Footer';

const MainUI = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-foreground flex flex-col relative overflow-x-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="relative z-10 w-full flex flex-col"
            >
                <Navbar />
                <Hero />
                <MeetHerby />
                <ProblemPreview />
                <FeaturesSection />
                <AchievementsSection />
                <GetInTouch />
                <SocialLinks />
                <Footer />
            </motion.div>
        </div>
    );
};

export default MainUI;
