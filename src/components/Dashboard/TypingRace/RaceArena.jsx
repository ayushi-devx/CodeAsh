import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, Zap, Target } from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';

const RaceArena = ({ raceData, onBack }) => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [raceStatus, setRaceStatus] = useState('countdown'); // 'countdown', 'racing', 'finished'
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [opponents, setOpponents] = useState([]);
  const [winner, setWinner] = useState(null);
  const [rank, setRank] = useState(null);
  
  const socketRef = useRef(null);
  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.io
    socketRef.current = io('http://localhost:5000');
    const socket = socketRef.current;

    const userId = JSON.parse(localStorage.getItem('codeash_user'))?._id;

    // Join race room
    socket.emit('race:join', {
      raceId: raceData.raceId,
      userId
    });

    // Get code snippet
    fetchRaceDetails();

    // Listen for events
    socket.on('race:player-joined', (data) => {
      console.log('Player joined:', data);
    });

    socket.on('race:countdown-started', () => {
      startCountdown();
    });

    socket.on('race:started', () => {
      setRaceStatus('racing');
      setStartTime(Date.now());
      startTimeRef.current = Date.now();
      inputRef.current?.focus();
    });

    socket.on('race:player-progress', (data) => {
      updateOpponentProgress(data);
    });

    socket.on('race:player-finished', (data) => {
      console.log('Player finished:', data);
    });

    socket.on('race:completed', (data) => {
      setWinner(data.winner);
      setRaceStatus('finished');
    });

    // Start countdown after 2 seconds
    setTimeout(() => {
      startCountdown();
    }, 2000);

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchRaceDetails = async () => {
    try {
      const token = localStorage.getItem('codeash_token');
      const response = await axios.get(
        `http://localhost:5000/api/typing-race/${raceData.raceId}/status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCodeSnippet(response.data.data.codeSnippet);
      }
    } catch (error) {
      console.error('Fetch race details error:', error);
    }
  };

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        // Emit race start
        socketRef.current.emit('race:start', {
          raceId: raceData.raceId
        });
      }
    }, 1000);
  };

  const updateOpponentProgress = (data) => {
    setOpponents(prev => {
      const existing = prev.find(o => o.userId === data.userId);
      if (existing) {
        return prev.map(o => o.userId === data.userId ? { ...o, ...data } : o);
      }
      return [...prev, data];
    });
  };

  const handleInputChange = (e) => {
    if (raceStatus !== 'racing') return;

    const input = e.target.value;
    setUserInput(input);

    const pos = input.length;
    setCurrentPosition(pos);

    // Calculate errors
    let errorCount = 0;
    for (let i = 0; i < pos; i++) {
      if (input[i] !== codeSnippet[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Calculate accuracy
    const acc = pos > 0 ? Math.round(((pos - errorCount) / pos) * 100) : 100;
    setAccuracy(acc);

    // Calculate progress
    const prog = Math.round((pos / codeSnippet.length) * 100);
    setProgress(prog);

    // Calculate WPM
    if (startTimeRef.current) {
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // minutes
      const wordsTyped = input.split(' ').length;
      const calculatedWpm = Math.round(wordsTyped / timeElapsed);
      setWpm(calculatedWpm);
    }

    // Emit progress
    socketRef.current.emit('race:progress', {
      raceId: raceData.raceId,
      userId: JSON.parse(localStorage.getItem('codeash_user'))?._id,
      currentPosition: pos,
      wpm: wpm,
      accuracy: acc,
      progress: prog
    });

    // Check if finished
    if (input === codeSnippet) {
      finishRace();
    }
  };

  const finishRace = async () => {
    const endTime = Date.now();
    setFinishTime(endTime);
    setRaceStatus('finished');

    const timeTaken = Math.floor((endTime - startTimeRef.current) / 1000);

    try {
      const token = localStorage.getItem('codeash_token');
      const userId = JSON.parse(localStorage.getItem('codeash_user'))?._id;

      // Emit finish event
      socketRef.current.emit('race:finish', {
        raceId: raceData.raceId,
        userId,
        timeTaken,
        wpm,
        accuracy
      });

      // Call API to finish
      const response = await axios.post(
        `http://localhost:5000/api/typing-race/${raceData.raceId}/finish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRank(response.data.data.rank);

        if (response.data.data.isCompleted) {
          socketRef.current.emit('race:complete', {
            raceId: raceData.raceId,
            winner: response.data.data.race.winner
          });
        }
      }
    } catch (error) {
      console.error('Finish race error:', error);
    }
  };

  if (raceStatus === 'countdown') {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold mb-4">
            {countdown > 0 ? countdown : 'GO!'}
          </h1>
          <p className="text-2xl text-gray-400">Get ready to type...</p>
        </motion.div>
      </div>
    );
  }

  if (raceStatus === 'finished') {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full p-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl text-center"
        >
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-400">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-bold mb-4">
            🎉 Complete!
          </h1>
          
          <p className="text-2xl text-gray-400 mb-8">
            Great job! Keep practicing to improve your speed!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-sm text-gray-400 mb-2">WPM</p>
              <p className="text-3xl font-bold text-green-400">{wpm}</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-sm text-gray-400 mb-2">Accuracy</p>
              <p className="text-3xl font-bold text-blue-400">{accuracy}%</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-sm text-gray-400 mb-2">Time</p>
              <p className="text-3xl font-bold text-purple-400">
                {finishTime && startTimeRef.current 
                  ? Math.floor((finishTime - startTimeRef.current) / 1000) 
                  : 0}s
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">Typing Race</h2>
            </div>

            <div className="flex items-center gap-6">
              {/* WPM */}
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-bold">{wpm} WPM</span>
              </div>

              {/* Accuracy */}
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-xl font-bold">{accuracy}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Your Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-400">Your Progress</span>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
        </div>

        {/* Code Display */}
        <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Type this code:</h3>
          <pre className="text-lg font-mono leading-relaxed whitespace-pre-wrap">
            <span className="text-green-400">{userInput}</span>
            <span className="text-gray-400">{codeSnippet.slice(currentPosition)}</span>
          </pre>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Your input:</h3>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            className="w-full h-40 px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-lg font-mono resize-none focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
            placeholder="Start typing..."
            autoFocus
          />
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Position: {currentPosition} / {codeSnippet.length}
            </span>
            <span className="text-red-400">
              Errors: {errors}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceArena;
