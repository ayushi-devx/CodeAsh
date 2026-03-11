import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle,
  XCircle,
  Clock,
  BarChart,
  Download,
  Share2,
  Home,
  Loader2,
  Star,
  Target
} from 'lucide-react';
import axios from 'axios';

const FinalReport = ({ interviewId, onBack }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [interviewId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('codeash_token');
      
      const response = await axios.get(
        `http://localhost:5000/api/interviews/${interviewId}/report`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setReport(response.data.data);
      }
    } catch (error) {
      console.error('Fetch report error:', error);
      setError(error.response?.data?.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Generating your report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-6">
        <div className="max-w-md w-full p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const totalTime = Math.floor((new Date(report.endTime) - new Date(report.startTime)) / 1000 / 60);

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Interview Completed</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interview Report
          </h1>
          <p className="text-xl text-gray-400">
            {report.role} • {report.experienceLevel}
          </p>
        </motion.div>

        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Score */}
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(report.overallScore)}`}>
                {Math.round(report.overallScore)}
              </div>
              <div className="text-2xl font-semibold text-gray-400 mb-2">
                Grade: {getScoreGrade(report.overallScore)}
              </div>
              <p className="text-sm text-gray-500">Overall Score</p>
            </div>

            {/* Questions */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-blue-400">
                {report.answeredQuestions}/{report.totalQuestions}
              </div>
              <div className="text-2xl font-semibold text-gray-400 mb-2">
                Questions
              </div>
              <p className="text-sm text-gray-500">Answered</p>
            </div>

            {/* Time */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-purple-400">
                {totalTime}
              </div>
              <div className="text-2xl font-semibold text-gray-400 mb-2">
                Minutes
              </div>
              <p className="text-sm text-gray-500">Total Time</p>
            </div>
          </div>
        </motion.div>

        {/* Strengths & Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Strengths */}
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {report.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3">
              {report.improvements?.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold">Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {report.recommendations?.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <Star className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{recommendation}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Question-by-Question Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Question Breakdown</h2>
          <div className="space-y-4">
            {report.questions?.map((q, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm font-semibold">
                        Q{q.questionNumber}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        q.score >= 7 
                          ? 'bg-green-500/20 text-green-400' 
                          : q.score >= 5
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {q.score}/10
                      </span>
                      {q.timeSpent && (
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.floor(q.timeSpent / 60)}:{(q.timeSpent % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mb-3">{q.question}</h4>
                  </div>
                </div>

                {q.feedback && (
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                    <p className="text-sm text-gray-300">{q.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalReport;
