import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Send, 
  Clock, 
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Award,
  TrendingUp,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Bot
} from 'lucide-react';
import axios from 'axios';
import FinalReport from './FinalReport';

const InterviewRoom = ({ role, experienceLevel, onBack }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  // Video states
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // Start interview
  useEffect(() => {
    startInterview();
    return () => {
      // Cleanup video stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Toggle video
  const toggleVideo = async () => {
    try {
      if (!videoEnabled) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: audioEnabled 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setVideoEnabled(true);
      } else {
        if (stream) {
          stream.getVideoTracks().forEach(track => track.stop());
        }
        setVideoEnabled(false);
        setStream(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const startInterview = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('codeash_token');
      
      const response = await axios.post(
        'http://localhost:5000/api/interviews/start',
        { role, experienceLevel },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setInterviewId(response.data.data.interviewId);
        setCurrentQuestion(response.data.data.currentQuestion);
        setQuestionNumber(1);
        setTotalQuestions(response.data.data.totalQuestions);
        setQuestionStartTime(Date.now());
      }
    } catch (error) {
      console.error('Start interview error:', error);
      setError(error.response?.data?.message || 'Failed to start interview');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);
      const token = localStorage.getItem('codeash_token');
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      const response = await axios.post(
        `http://localhost:5000/api/interviews/${interviewId}/answer`,
        { answer, timeSpent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const { evaluation, isCompleted: completed, nextQuestion } = response.data.data;
        
        // Show feedback
        setFeedback(evaluation);

        // Wait 3 seconds then move to next question or show report
        setTimeout(() => {
          if (completed) {
            setIsCompleted(true);
            setShowReport(true);
          } else if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
            setQuestionNumber(prev => prev + 1);
            setAnswer('');
            setFeedback(null);
            setQuestionStartTime(Date.now());
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Submit answer error:', error);
      setError(error.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (showReport) {
    return <FinalReport interviewId={interviewId} onBack={onBack} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Generating your interview questions...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-6">
        <div className="max-w-md w-full p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
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
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div>
                <h2 className="text-lg font-semibold">{role}</h2>
                <p className="text-sm text-gray-400">{experienceLevel}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Progress */}
              <div className="text-right">
                <div className="text-sm text-gray-400">Progress</div>
                <div className="text-lg font-semibold">
                  {questionNumber} / {totalQuestions}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Side - AI Interviewer */}
        <div className="w-1/2 border-r border-white/10 flex flex-col">
          {/* AI Avatar/Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Interviewer</h3>
                <p className="text-sm text-gray-400">Powered by Gemini AI</p>
              </div>
            </div>
          </div>

          {/* Question Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {feedback ? (
                // Feedback Display
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-2xl border ${
                    feedback.score >= 7 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : feedback.score >= 5
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-red-500/10 border-red-500/20'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      {feedback.score >= 7 ? (
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      ) : (
                        <AlertCircle className="w-10 h-10 text-yellow-400" />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold">Score: {feedback.score}/10</h3>
                        <p className="text-gray-400">
                          {feedback.score >= 7 ? 'Great answer!' : feedback.score >= 5 ? 'Good effort!' : 'Keep practicing!'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-300">Feedback:</h4>
                        <p className="text-gray-200">{feedback.feedback}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    <p>Loading next question...</p>
                  </div>
                </motion.div>
              ) : (
                // Question Display
                <motion.div
                  key={`question-${questionNumber}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <span className="text-purple-300 font-semibold">
                          Question {questionNumber}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold leading-relaxed mb-4">
                      {currentQuestion?.question}
                    </h2>

                    {currentQuestion?.expectedTopics && currentQuestion.expectedTopics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {currentQuestion.expectedTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-green-400" />
                      Tips for a Great Answer
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Explain your thought process</li>
                      <li>• Use specific examples</li>
                      <li>• Mention trade-offs</li>
                      <li>• Be clear and concise</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Candidate Video & Answer */}
        <div className="w-1/2 flex flex-col">
          {/* Video Section */}
          <div className="p-6 border-b border-white/10">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
              {videoEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <VideoOff className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500">Camera Off</p>
                  </div>
                </div>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-colors ${
                    videoEnabled 
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-red-500/80 hover:bg-red-500'
                  }`}
                >
                  {videoEnabled ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <VideoOff className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full transition-colors ${
                    audioEnabled 
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-red-500/80 hover:bg-red-500'
                  }`}
                >
                  {audioEnabled ? (
                    <Mic className="w-5 h-5 text-white" />
                  ) : (
                    <MicOff className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Answer Section */}
          <div className="flex-1 p-6 flex flex-col">
            <label className="block flex-1 flex flex-col">
              <span className="text-lg font-semibold mb-3 block">Your Answer</span>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here... Be detailed and explain your thought process."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                disabled={submitting || !!feedback}
              />
            </label>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-400">
                {answer.length} characters
              </div>

              <button
                onClick={handleSubmitAnswer}
                disabled={submitting || !answer.trim() || !!feedback}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
