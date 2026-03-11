import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  Award, 
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Mic,
  Video,
  FileText,
  BarChart
} from 'lucide-react';

const ExperienceSelection = ({ role, onSelect, onBack }) => {
  const experienceLevels = [
    {
      id: 'entry',
      name: 'Entry Level',
      years: '0-1 years',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: '🌱',
      description: 'Perfect for fresh graduates and career switchers',
      focus: ['Fundamentals', 'Basic concepts', 'Simple problems', 'Learning mindset']
    },
    {
      id: 'junior',
      name: 'Junior',
      years: '2-3 years',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: '🎯',
      description: 'For developers with some professional experience',
      focus: ['Core concepts', 'Best practices', 'Code quality', 'Team collaboration']
    },
    {
      id: 'mid',
      name: 'Mid-Level',
      years: '4-6 years',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: '🚀',
      description: 'Experienced developers ready for bigger challenges',
      focus: ['System design', 'Architecture', 'Performance', 'Mentoring']
    },
    {
      id: 'senior',
      name: 'Senior',
      years: '7+ years',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      icon: '⭐',
      description: 'Senior engineers with deep technical expertise',
      focus: ['Complex systems', 'Leadership', 'Strategy', 'Innovation']
    },
    {
      id: 'staff',
      name: 'Staff/Principal',
      years: '10+ years',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      icon: '👑',
      description: 'Technical leaders and principal engineers',
      focus: ['Technical vision', 'Cross-team impact', 'Industry expertise', 'Thought leadership']
    }
  ];

  const enhancedFeatures = [
    {
      icon: Sparkles,
      title: 'AI-Generated Questions',
      description: '10 adaptive technical questions tailored to your level'
    },
    {
      icon: Clock,
      title: 'Real-Time Evaluation',
      description: 'Instant feedback and scoring on each answer'
    },
    {
      icon: FileText,
      title: 'Detailed Feedback',
      description: 'Comprehensive analysis of your responses'
    },
    {
      icon: BarChart,
      title: 'Performance Report',
      description: 'Final report with strengths and recommendations'
    }
  ];

  const tips = [
    'Take your time to think through each question',
    'Explain your thought process clearly',
    'Use specific examples from your experience',
    'Ask clarifying questions when needed'
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-sm text-purple-300">Step 2 of 2</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Select Your Experience Level
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
              Choose your experience level for {role}
            </p>
            <p className="text-sm text-gray-500">
              Questions will be tailored to match your expertise
            </p>
          </motion.div>
        </div>

        {/* Experience Levels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
        >
          {experienceLevels.map((level, index) => (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => onSelect(level.name)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 ${level.bgColor} backdrop-blur-sm border ${level.borderColor} rounded-2xl text-center hover:bg-white/10 transition-all group relative overflow-hidden`}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Icon */}
              <div className="relative text-4xl mb-3 group-hover:scale-110 transition-transform">
                {level.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
                  {level.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{level.years}</p>
                <p className="text-xs text-gray-500 mb-4">{level.description}</p>

                {/* Focus Areas */}
                <div className="space-y-1">
                  {level.focus.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkmark on Hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-6 h-6 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center`}>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enhancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Tips for Success */}
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Tips for Success</h3>
            </div>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Format */}
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Interview Format</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 font-semibold">10</span>
                </div>
                <span>Technical questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <span>~30-45 minutes total</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart className="w-4 h-4 text-blue-400" />
                </div>
                <span>Instant scoring & feedback</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-400" />
                </div>
                <span>Comprehensive final report</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ready to Start */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl">
              Selected: <span className="text-white font-semibold">{role}</span>
            </p>
            <p className="text-sm text-gray-500">
              Choose your experience level above to begin the interview
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceSelection;
