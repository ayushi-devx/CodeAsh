import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Code, 
  Database, 
  Layers, 
  BarChart, 
  Cloud, 
  Smartphone, 
  Brain,
  Target,
  ChevronRight,
  Sparkles,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import RoleSelection from './RoleSelection';
import ExperienceSelection from './ExperienceSelection';
import InterviewRoom from './InterviewRoom';

const InterviewLanding = () => {
  const [step, setStep] = useState('landing'); // landing, role, experience, interview
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Questions',
      description: 'Adaptive questions tailored to your role and experience level'
    },
    {
      icon: Clock,
      title: 'Real-Time Evaluation',
      description: 'Instant feedback on your answers with detailed insights'
    },
    {
      icon: Award,
      title: 'Comprehensive Report',
      description: 'Detailed analysis with strengths, improvements, and recommendations'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement across multiple interview sessions'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('experience');
  };

  const handleExperienceSelect = (experience) => {
    setSelectedExperience(experience);
    setStep('interview');
  };

  const handleBack = () => {
    if (step === 'experience') {
      setStep('role');
      setSelectedExperience(null);
    } else if (step === 'role') {
      setStep('landing');
      setSelectedRole(null);
    }
  };

  if (step === 'interview') {
    return (
      <InterviewRoom 
        role={selectedRole}
        experienceLevel={selectedExperience}
        onBack={handleBack}
      />
    );
  }

  if (step === 'experience') {
    return (
      <ExperienceSelection 
        role={selectedRole}
        onSelect={handleExperienceSelect}
        onBack={handleBack}
      />
    );
  }

  if (step === 'role') {
    return (
      <RoleSelection 
        onSelect={handleRoleSelect}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">AI-Powered Interview Practice</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              AI Interview Assistant
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Practice technical interviews with AI-powered questions, real-time feedback, 
              and comprehensive evaluation to ace your next interview
            </p>

            <motion.button
              onClick={() => setStep('role')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              Start Interview Practice
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose Your Role',
                  description: 'Select from 8 different tech roles including Frontend, Backend, Full Stack, and more'
                },
                {
                  step: '02',
                  title: 'Set Experience Level',
                  description: 'Pick your experience level from Entry to Staff/Principal for tailored questions'
                },
                {
                  step: '03',
                  title: 'Practice & Improve',
                  description: 'Answer 10 AI-generated questions and receive instant feedback with detailed reports'
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-purple-500/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-block p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Interview?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Join thousands of developers who have improved their interview skills with our AI-powered platform
              </p>
              <motion.button
                onClick={() => setStep('role')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
              >
                Get Started Now
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewLanding;
