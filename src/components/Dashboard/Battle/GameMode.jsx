import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Trophy, Clock, Target, Swords } from 'lucide-react';
import RandomMatch from './RandomMatch';
import RoomMatch from './RoomMatch';

const GameMode = () => {
  const [selectedMode, setSelectedMode] = useState(null);

  if (selectedMode === 'random') {
    return <RandomMatch onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === 'room') {
    return <RoomMatch onBack={() => setSelectedMode(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
            <Swords className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Game Mode
          </h1>
          <p className="text-xl text-gray-400">
            Challenge other programmers in real-time coding battles
          </p>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Random Match */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedMode('random')}
            className="group relative p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl cursor-pointer hover:border-purple-500/50 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>

              <h2 className="text-3xl font-bold mb-4">Random Match</h2>
              <p className="text-gray-400 mb-6">
                Get matched with another player instantly
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Random difficulty problems (Easy, Medium, Hard)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Dynamic time limits based on difficulty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span>ELO-based rating system</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Swords className="w-4 h-4 text-purple-400" />
                  <span>Real-time multiplayer coding</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all">
                Find Match
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                Your rating: <span className="text-purple-400 font-semibold">1200</span>
              </div>
            </div>
          </motion.div>

          {/* Room Match */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedMode('room')}
            className="group relative p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl cursor-pointer hover:border-green-500/50 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-green-400" />
              </div>

              <h2 className="text-3xl font-bold mb-4">Room Match</h2>
              <p className="text-gray-400 mb-6">
                Create or join a room to play with friends
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Choose difficulty level</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Customizable time limits</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>Private rooms with codes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Trophy className="w-4 h-4 text-green-400" />
                  <span>Practice with friends</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                Create/Join Room
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                Play with friends
              </div>
            </div>
          </motion.div>
        </div>

        {/* Game Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-white/5 border border-white/10 rounded-3xl"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Game Rules & Guidelines
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                ✅ Winning Conditions
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• First to solve the problem wins</li>
                <li>• If no one solves: most test cases passed wins</li>
                <li>• Equal test cases: draw</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                🏆 ELO Rating System
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Chess-style ELO calculation</li>
                <li>• K-factor: 32 for dynamic rating changes</li>
                <li>• Rating changes based on opponent strength</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameMode;
