import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Layers, 
  BarChart, 
  Cloud, 
  Smartphone, 
  Brain,
  Target,
  ChevronLeft,
  Check
} from 'lucide-react';

const RoleSelection = ({ onSelect, onBack }) => {
  const roles = [
    {
      id: 'frontend',
      name: 'Frontend Developer',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      description: 'React, Vue, Angular',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX']
    },
    {
      id: 'backend',
      name: 'Backend Developer',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      description: 'APIs, Databases, Server',
      skills: ['Node.js', 'APIs', 'Databases', 'Security']
    },
    {
      id: 'fullstack',
      name: 'Full Stack Developer',
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      description: 'Frontend + Backend',
      skills: ['React', 'Node.js', 'Databases', 'DevOps']
    },
    {
      id: 'datascience',
      name: 'Data Scientist',
      icon: BarChart,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      description: 'ML, AI, Analytics',
      skills: ['Python', 'ML', 'Statistics', 'Visualization']
    },
    {
      id: 'devops',
      name: 'DevOps Engineer',
      icon: Cloud,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      description: 'CI/CD, Cloud, Docker',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
    },
    {
      id: 'mobile',
      name: 'Mobile Developer',
      icon: Smartphone,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      description: 'iOS, Android, React Native',
      skills: ['Swift', 'Kotlin', 'React Native', 'Flutter']
    },
    {
      id: 'ml',
      name: 'Machine Learning Engineer',
      icon: Brain,
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      description: 'AI, Deep Learning, Models',
      skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision']
    },
    {
      id: 'product',
      name: 'Product Manager',
      icon: Target,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      description: 'Strategy, Roadmaps, Analytics',
      skills: ['Strategy', 'Analytics', 'Communication', 'Leadership']
    }
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
              <span className="text-sm text-purple-300">Step 1 of 2</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Target Role
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select the role you're preparing for to get tailored interview questions
            </p>
          </motion.div>
        </div>

        {/* Roles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => onSelect(role.name)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 ${role.bgColor} backdrop-blur-sm border ${role.borderColor} rounded-2xl text-left hover:bg-white/10 transition-all group relative overflow-hidden`}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Icon */}
              <div className={`relative w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <role.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  {role.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{role.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {role.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-8 h-8 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center`}>
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Questions</h3>
              <p className="text-gray-400">
                Our AI generates role-specific questions covering technical concepts, problem-solving, 
                system design, and best practices relevant to your chosen role.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
