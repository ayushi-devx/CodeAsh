import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import RaceArena from './RaceArena';

const JoinRace = ({ onBack }) => {
  const [inputCode, setInputCode] = useState('');
  const [raceData, setRaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const joinRace = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('codeash_token');

      const response = await axios.post(
        'http://localhost:5000/api/typing-race/join',
        { roomCode: inputCode.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRaceData(response.data.data);
      }
    } catch (error) {
      console.error('Join race error:', error);
      setError(error.response?.data?.message || 'Failed to join race');
    } finally {
      setLoading(false);
    }
  };

  if (raceData) {
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
          <h1 className="text-3xl font-bold">Join Race</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl"
        >
          <h2 className="text-2xl font-bold mb-6">Enter Room Code</h2>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-4">
              6-Character Code
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-2xl font-bold tracking-widest placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
            />
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
              onClick={joinRace}
              disabled={loading || inputCode.length !== 6}
              className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Race'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinRace;
