import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Play, 
  Send, 
  Clock, 
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Trophy,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import io from 'socket.io-client';

const BattleArena = ({ battleData, onBack }) => {
  const [code, setCode] = useState('// Write your solution here\n');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [opponentStatus, setOpponentStatus] = useState('waiting');
  const [battleStatus, setBattleStatus] = useState('ready');
  const [winner, setWinner] = useState(null);
  const [ratingChange, setRatingChange] = useState(null);
  
  const socketRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.io
    socketRef.current = io('http://localhost:5000');
    const socket = socketRef.current;

    const userId = JSON.parse(localStorage.getItem('codeash_user'))?._id;

    // Join battle room
    socket.emit('battle:join', {
      battleId: battleData.battleId,
      userId
    });

    // Listen for events
    socket.on('battle:player-joined', () => {
      console.log('Opponent joined!');
    });

    socket.on('battle:started', () => {
      setBattleStatus('in-progress');
      startTimer();
    });

    socket.on('battle:opponent-progress', (data) => {
      setOpponentStatus('coding');
    });

    socket.on('battle:opponent-tested', (data) => {
      setOpponentStatus(`tested: ${data.testsPassed}/${data.totalTests}`);
    });

    socket.on('battle:opponent-submitted', () => {
      setOpponentStatus('submitted');
    });

    socket.on('battle:completed', (data) => {
      setBattleStatus('completed');
      setWinner(data.winner);
      setRatingChange(data.ratingChanges);
      stopTimer();
    });

    // Start battle
    startBattle();

    return () => {
      socket.disconnect();
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startBattle = async () => {
    try {
      const token = localStorage.getItem('codeash_token');
      await axios.post(
        `http://localhost:5000/api/battles/${battleData.battleId}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Start battle error:', error);
    }
  };

  const runCode = async () => {
    try {
      setRunning(true);
      setOutput('Running tests...\n');

      const token = localStorage.getItem('codeash_token');
      const response = await axios.post(
        'http://localhost:5000/api/submissions/run',
        {
          problemId: battleData.problem._id,
          code,
          language
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const results = response.data.data;
        setTestResults(results);
        
        const passed = results.results.filter(r => r.passed).length;
        const total = results.results.length;
        
        setOutput(`Tests: ${passed}/${total} passed\n\n${
          results.results.map((r, i) => 
            `Test ${i + 1}: ${r.passed ? '✓ PASS' : '✗ FAIL'}`
          ).join('\n')
        }`);

        // Notify opponent
        socketRef.current.emit('battle:test-run', {
          battleId: battleData.battleId,
          userId: JSON.parse(localStorage.getItem('codeash_user'))?._id,
          testsPassed: passed,
          totalTests: total
        });
      }
    } catch (error) {
      console.error('Run error:', error);
      setOutput('Error running code: ' + error.message);
    } finally {
      setRunning(false);
    }
  };

  const submitSolution = async () => {
    if (!testResults) {
      alert('Please run tests first!');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('codeash_token');
      const userId = JSON.parse(localStorage.getItem('codeash_user'))?._id;

      const passed = testResults.results.filter(r => r.passed).length;
      const total = testResults.results.length;

      const response = await axios.post(
        `http://localhost:5000/api/battles/${battleData.battleId}/submit`,
        {
          code,
          language,
          testsPassed: passed,
          totalTests: total
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Notify opponent
        socketRef.current.emit('battle:submit', {
          battleId: battleData.battleId,
          userId
        });

        if (response.data.data.isCompleted) {
          // Battle completed
          const battle = response.data.data.battle;
          socketRef.current.emit('battle:complete', {
            battleId: battleData.battleId,
            winner: battle.winner
          });
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting solution');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (battleStatus === 'completed' && winner) {
    const userId = JSON.parse(localStorage.getItem('codeash_user'))?._id;
    const isWinner = winner === userId;

    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full p-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl text-center"
        >
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isWinner ? 'bg-gradient-to-br from-yellow-400 to-orange-400' : 'bg-gray-600'
          }`}>
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-bold mb-4">
            {isWinner ? '🎉 Victory!' : '😔 Defeat'}
          </h1>
          
          <p className="text-2xl text-gray-400 mb-8">
            {isWinner ? 'Congratulations! You solved the problem first!' : 'Better luck next time!'}
          </p>

          {ratingChange && (
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold mb-4">Rating Change</h3>
              <div className={`text-5xl font-bold mb-2 ${
                ratingChange.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {ratingChange.change > 0 ? '+' : ''}{ratingChange.change}
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <span>{ratingChange.old}</span>
                {ratingChange.change > 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
                <span className="text-white font-bold">{ratingChange.new}</span>
              </div>
            </div>
          )}

          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Back to Home
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
              <h2 className="text-lg font-semibold">Battle Arena</h2>
            </div>

            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
              </div>

              {/* Opponent Status */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-sm">{opponentStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left - Problem */}
        <div className="w-1/2 border-r border-white/10 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-4">{battleData.problem.title}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
              battleData.problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              battleData.problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {battleData.problem.difficulty}
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-wrap">{battleData.problem.description}</p>
          </div>

          {battleData.problem.examples && battleData.problem.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Examples</h3>
              {battleData.problem.examples.map((example, i) => (
                <div key={i} className="mb-4 p-4 bg-white/5 rounded-xl">
                  <div className="mb-2">
                    <span className="text-gray-400">Input:</span>
                    <pre className="text-white mt-1">{example.input}</pre>
                  </div>
                  <div>
                    <span className="text-gray-400">Output:</span>
                    <pre className="text-white mt-1">{example.output}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Language Selector */}
          <div className="p-4 border-b border-white/10 flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            <div className="flex-1" />

            <button
              onClick={runCode}
              disabled={running}
              className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Tests
                </>
              )}
            </button>

            <button
              onClick={submitSolution}
              disabled={submitting || !testResults}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="60%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          {/* Output */}
          <div className="h-40 border-t border-white/10 p-4 bg-[#1a1a1a] overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Output:</h3>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {output || 'Run tests to see output...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
