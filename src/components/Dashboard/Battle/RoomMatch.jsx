import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Copy, Check, Users, Loader2 } from 'lucide-react';
import axios from 'axios';
import BattleArena from './BattleArena';

const RoomMatch = ({ onBack }) => {
  const [mode, setMode] = useState('select'); // 'select', 'create', 'join', 'waiting'
  const [difficulty, setDifficulty] = useState('Medium');
  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [battleData, setBattleData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('codeash_token');

      const response = await axios.post(
        'http://localhost:5000/api/battles/room/create',
        { difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRoomCode(response.data.data.roomCode);
        setBattleData(response.data.data);
        setMode('waiting');
      }
    } catch (error) {
      console.error('Create room error:', error);
      setError(error.response?.data?.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('codeash_token');

      const response = await axios.post(
        'http://localhost:5000/api/battles/room/join',
        { roomCode: inputCode.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBattleData(response.data.data);
        
        // If 2 players, go to battle
        if (response.data.data.status === 'ready') {
          setMode('battle');
        } else {
          setMode('waiting');
        }
      }
    } catch (error) {
      console.error('Join room error:', error);
      setError(error.response?.data?.message || 'Failed to join room');
    } finally {
      setLoading(false);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mode === 'battle' && battleData) {
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
          <h1 className="text-3xl font-bold">Room Match</h1>
        </div>

        {/* Mode Selection */}
        {mode === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">Choose an option</h2>

              <div className="space-y-4">
                <button
                  onClick={() => setMode('create')}
                  className="w-full p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Create Room</h3>
                      <p className="text-sm text-white/80">Start a new battle room</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('join')}
                  className="w-full p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Join Room</h3>
                      <p className="text-sm text-gray-400">Enter a room code</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Create Room */}
        {mode === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6">Create Room</h2>

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
                onClick={() => setMode('select')}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
              >
                Back
              </button>
              <button
                onClick={createRoom}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Room'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Join Room */}
        {mode === 'join' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6">Join Room</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-4">
                Enter Room Code
              </label>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-2xl font-bold tracking-widest placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all uppercase"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setMode('select')}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
              >
                Back
              </button>
              <button
                onClick={joinRoom}
                disabled={loading || inputCode.length !== 6}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Room'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Waiting for Opponent */}
        {mode === 'waiting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl text-center"
          >
            <Loader2 className="w-16 h-16 text-green-400 animate-spin mx-auto mb-6" />
            
            <h2 className="text-2xl font-bold mb-4">Waiting for opponent...</h2>
            
            {roomCode && (
              <div className="mb-8">
                <p className="text-gray-400 mb-4">Share this code with your friend:</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl">
                    <span className="text-4xl font-bold tracking-widest">{roomCode}</span>
                  </div>
                  <button
                    onClick={copyRoomCode}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    {copied ? (
                      <Check className="w-6 h-6 text-green-400" />
                    ) : (
                      <Copy className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
              <p className="text-sm text-gray-300">
                Difficulty: <span className="text-green-400 font-semibold">{difficulty}</span>
              </p>
            </div>

            <button
              onClick={onBack}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 font-semibold transition-all"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomMatch;
