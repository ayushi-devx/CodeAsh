import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2, Zap, X } from 'lucide-react';
import axios from 'axios';
import BattleArena from './BattleArena';

const RandomMatch = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState('Medium');
  const [searching, setSearching] = useState(false);
  const [matched, setMatched] = useState(false);
  const [battleData, setBattleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    if (searching) {
      // Poll for match every 2 seconds
      interval = setInterval(checkMatch, 2000);
    }
    return () => clearInterval(interval);
  }, [searching]);

  const findMatch = async () => {
    try {
      setSearching(true);
      setError(null);
      const token = localStorage.getItem('codeash_token');

      const response = await axios.post(
        'http://localhost:5000/api/battles/match/find',
        { difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.matched) {
        setMatched(true);
        setBattleData(response.data.data);
        setSearching(false);
      }
    } catch (error) {
      console.error('Find match error:', error);
      setError(error.response?.data?.message || 'Failed to find match');
      setSearching(false);
    }
  };

  const checkMatch = async () => {
    try {
      const token = localStorage.getItem('codeash_token');
      const response = await axios.post(
        'http://localhost:5000/api/battles/match/find',
        { difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.matched) {
        setMatched(true);
        setBattleData(response.data.data);
        setSearching(false);
      }
    } catch (error) {
      console.error('Check match error:', error);
    }
  };

  const cancelSearch = async () => {
    try {
      const token = localStorage.getItem('codeash_token');
      await axios.post(
        'http://localhost:5000/api/battles/match/cancel',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearching(false);
    } catch (error) {
      console.error('Cancel error:', error);
    }
  };

  if (matched && battleData) {
    return <BattleArena battleData={battleData} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Random Match</h1>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl"
        >
          {!searching ? (
            <>
              {/* Difficulty Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">
                  Select Difficulty
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Easy', 'Medium', 'Hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`py-4 rounded-xl font-semibold transition-all ${
                        difficulty === diff
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-8">
                <h3 className="font-semibold mb-3">How it works:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Random difficulty problems (Easy, Medium, Hard)</li>
                  <li>• Dynamic time limits based on difficulty</li>
                  <li>• ELO-based rating system</li>
                  <li>• Real-time multiplayer coding</li>
                </ul>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-400">
                  {error}
                </div>
              )}

              {/* Find Match Button */}
              <button
                onClick={findMatch}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Find Match
              </button>
            </>
          ) : (
            // Searching State
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Searching for opponent...</h2>
              <p className="text-gray-400 mb-8">
                Difficulty: <span className="text-purple-400 font-semibold">{difficulty}</span>
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>

              <button
                onClick={cancelSearch}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 font-semibold transition-all flex items-center gap-2 mx-auto"
              >
                <X className="w-5 h-5" />
                Cancel Search
              </button>
            </div>
          )}
        </motion.div>

        {/* Your Stats */}
        <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="font-semibold mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">1200</div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-sm text-gray-400">Wins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-sm text-gray-400">Played</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMatch;
