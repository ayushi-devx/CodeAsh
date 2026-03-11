import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Calendar, Flame, Trophy, Target, TrendingUp, Award } from 'lucide-react';

const StreakDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('codeash_token');
      console.log('Fetching user data with token:', token ? 'Token exists' : 'No token');
      
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('User data received:', response.data);
      setUserData(response.data.data);
      generateHeatmapData(response.data.data.submissions || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateHeatmapData = (submissions) => {
    if (!submissions || !Array.isArray(submissions)) {
      console.log('No submissions data available');
      setHeatmapData([]);
      return;
    }

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    const submissionsByDate = {};
    submissions.forEach(sub => {
      if (sub && sub.submittedAt) {
        const date = new Date(sub.submittedAt).toDateString();
        submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
      }
    });

    const weeks = [];
    let currentWeek = [];
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateStr = date.toDateString();
      const count = submissionsByDate[dateStr] || 0;
      
      currentWeek.push({
        date: date,
        count: count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 8 ? 3 : 4
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    console.log('Heatmap generated:', weeks.length, 'weeks');
    setHeatmapData(weeks);
  };

  const getHeatmapColor = (level) => {
    const colors = {
      0: 'bg-gray-800/30',
      1: 'bg-green-900/50',
      2: 'bg-green-700/70',
      3: 'bg-green-500',
      4: 'bg-green-400'
    };
    return colors[level] || colors[0];
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short' }));
    }
    return months;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const stats = {
    currentStreak: userData?.currentStreak || 0,
    longestStreak: userData?.longestStreak || 0,
    totalActiveDays: userData?.submissions?.filter((sub, index, self) => 
      index === self.findIndex(s => 
        new Date(s.submittedAt).toDateString() === new Date(sub.submittedAt).toDateString()
      )
    ).length || 0,
    totalSolved: userData?.solvedProblems?.length || 0,
    totalSubmissions: userData?.totalSubmissions || 0,
    acceptanceRate: userData?.totalSubmissions > 0 
      ? ((userData?.acceptedSubmissions / userData?.totalSubmissions) * 100).toFixed(1)
      : 0
  };

  const solvedByDifficulty = {
    easy: userData?.solvedProblems?.filter(p => p.difficulty === 'Easy').length || 0,
    medium: userData?.solvedProblems?.filter(p => p.difficulty === 'Medium').length || 0,
    hard: userData?.solvedProblems?.filter(p => p.difficulty === 'Hard').length || 0
  };

  const totalProblems = { easy: 100, medium: 150, hard: 80 };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-bold">
              {userData?.firstName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData?.firstName}</h1>
              <p className="text-gray-400">{userData?.email}</p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Solved Problems Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Solved Problems</h2>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>

              {/* Circular Progress */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-800"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(stats.totalSolved / 330) * 439.6} 439.6`}
                      className="text-green-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">{stats.totalSolved}</div>
                    <div className="text-sm text-gray-400">Solved</div>
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Easy</span>
                    <span className="text-sm font-medium">
                      <span className="text-green-400">{solvedByDifficulty.easy}</span>
                      <span className="text-gray-500">/{totalProblems.easy}</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(solvedByDifficulty.easy / totalProblems.easy) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Medium</span>
                    <span className="text-sm font-medium">
                      <span className="text-yellow-400">{solvedByDifficulty.medium}</span>
                      <span className="text-gray-500">/{totalProblems.medium}</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${(solvedByDifficulty.medium / totalProblems.medium) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Hard</span>
                    <span className="text-sm font-medium">
                      <span className="text-red-400">{solvedByDifficulty.hard}</span>
                      <span className="text-gray-500">/{totalProblems.hard}</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${(solvedByDifficulty.hard / totalProblems.hard) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submission Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Submissions</h2>
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold">{stats.totalSubmissions}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Accepted</span>
                  <span className="text-2xl font-bold text-green-400">
                    {userData?.acceptedSubmissions || 0}
                  </span>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Acceptance Rate</span>
                    <span className="text-xl font-bold">{stats.acceptanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${stats.acceptanceRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Activity & Streaks */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Streak Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6"
              >
                <Flame className="w-8 h-8 text-orange-500 mb-4" />
                <div className="text-4xl font-bold mb-1">{stats.currentStreak}</div>
                <div className="text-sm text-gray-300">Day Streak</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6"
              >
                <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
                <div className="text-4xl font-bold mb-1">{stats.longestStreak}</div>
                <div className="text-sm text-gray-300">Max Streak</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6"
              >
                <Calendar className="w-8 h-8 text-green-500 mb-4" />
                <div className="text-4xl font-bold mb-1">{stats.totalActiveDays}</div>
                <div className="text-sm text-gray-300">Active Days</div>
              </motion.div>
            </div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {stats.totalSubmissions} submissions in the last year
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded ${getHeatmapColor(level)}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {/* Month labels */}
                  <div className="flex gap-[2px] mb-2 ml-8">
                    {getMonthLabels().map((month, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-500"
                        style={{ width: `${100 / 12}%` }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>

                  {/* Heatmap Grid */}
                  <div className="flex gap-[2px]">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[2px] text-xs text-gray-500 pr-2">
                      <div className="h-[10px]">Mon</div>
                      <div className="h-[10px]"></div>
                      <div className="h-[10px]">Wed</div>
                      <div className="h-[10px]"></div>
                      <div className="h-[10px]">Fri</div>
                      <div className="h-[10px]"></div>
                      <div className="h-[10px]">Sun</div>
                    </div>

                    {/* Grid */}
                    <div className="flex gap-[2px]">
                      {heatmapData.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px]">
                          {week.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`w-[10px] h-[10px] rounded-sm ${getHeatmapColor(day.level)} hover:ring-2 hover:ring-green-400 transition-all cursor-pointer`}
                              title={`${day.date.toLocaleDateString()}: ${day.count} submissions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Language Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Languages</h2>
                <Award className="w-6 h-6 text-purple-500" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(userData?.languageStats || {})
                  .filter(([_, count]) => count > 0)
                  .map(([lang, count]) => (
                    <div key={lang} className="p-4 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold mb-1">{count}</div>
                      <div className="text-sm text-gray-400 capitalize">{lang}</div>
                    </div>
                  ))}
                {Object.keys(userData?.languageStats || {}).filter(k => userData.languageStats[k] > 0).length === 0 && (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No submissions yet
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakDashboard;
