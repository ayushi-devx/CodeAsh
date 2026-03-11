import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Copy, Check, Loader2 } from 'lucide-react';
import axios from 'axios';
import RaceArena from './RaceArena';

const CreateRace = ({ onBack }) => {
  const [language, setLanguage] = useState('javascript');
  const [difficulty, setDifficulty] = useState('Easy');
  const [roomCode, setRoomCode] = useState('');
  const [raceData, setRaceData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('setup'); // 'setup', 'waiting', 'racing'

  const createRace = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('codeash_token');

      const response = await axios.post(
        'http://localhost:5000/api/typing-race/create',
        { language, difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRoomCode(response.data.data.roomCode);
        setRaceData(response.data.data);
        // Directly go to racing mode for single player
        setMode('racing');
      }
    } catch (error) {
      console.error('Create race error:', error);
      setError(error.response?.data?.message || 'Failed to create race');
    } finally {
      setLoading(false);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mode === 'racing' && raceData) {
    return <RaceArena raceData={raceData} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Start Typing Race</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl"
        >
          <h2 className="text-2xl font-bold mb-6">Choose Your Settings</h2>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-4">
              Select Language
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['javascript', 'python', 'cpp', 'java'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-4 rounded-xl font-semibold transition-all capitalize ${
                    language === lang
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
            >
              Back
            </button>
            <button
              onClick={createRace}
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Starting...
                </>
              ) : (
                'Start Race'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateRace;
