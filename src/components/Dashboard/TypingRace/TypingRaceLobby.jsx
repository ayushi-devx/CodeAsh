import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, Users, Trophy, Keyboard, Target } from 'lucide-react';
import CreateRace from './CreateRace';
import JoinRace from './JoinRace';

const TypingRaceLobby = ({ onBack }) => {
  const [mode, setMode] = useState(null); // null, 'solo'

  if (mode === 'solo') {
    return <CreateRace onBack={() => setMode(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Code Typing Race</h1>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
            <Keyboard className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Test Your Typing Speed!
          </h2>
          <p className="text-xl text-gray-400">
            Type code snippets as fast as you can. Improve your coding speed!
          </p>
        </motion.div>

        {/* Solo Mode Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setMode('solo')}
            className="group relative p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl cursor-pointer hover:border-green-500/50 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative text-center">
              <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-10 h-10 text-green-400" />
              </div>

              <h3 className="text-3xl font-bold mb-4">Start Typing Race</h3>
              <p className="text-gray-400 mb-6">
                Practice your typing speed with code snippets
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl">
                  <Keyboard className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">4 Languages</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">3 Difficulties</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <Trophy className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Track WPM</p>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all text-lg">
                Start Race
              </button>
            </div>
          </motion.div>
        </div>

        {/* How to Play */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-white/5 border border-white/10 rounded-3xl"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            How to Play
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                1. Setup
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Select language (JS/Python/C++/Java)</li>
                <li>• Choose difficulty level</li>
                <li>• Click Start Race</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                2. Type
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Type the code snippet exactly</li>
                <li>• Watch your WPM & accuracy</li>
                <li>• Try to beat your best time</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">
                3. Improve
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• View your stats</li>
                <li>• Track your progress</li>
                <li>• Practice more!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TypingRaceLobby;
