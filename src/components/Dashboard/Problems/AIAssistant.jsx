import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Loader2, Code, MessageCircle, Lightbulb } from 'lucide-react';
import axios from 'axios';

const AIAssistant = ({ problem, userCode, onClose }) => {
  const [activeTab, setActiveTab] = useState('chat'); // chat, explain, hints
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [hints, setHints] = useState('');

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('codeash_token');
      const response = await axios.post(
        'http://localhost:5000/api/ai/chat',
        {
          message: input,
          problemContext: problem ? {
            title: problem.title,
            description: problem.description
          } : null,
          conversationHistory: messages
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = { role: 'assistant', content: response.data.data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainCode = async () => {
    if (!userCode) {
      setExplanation('Please write some code first!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('codeash_token');
      const response = await axios.post(
        'http://localhost:5000/api/ai/explain-code',
        {
          code: userCode,
          language: 'javascript',
          problemTitle: problem?.title || 'Code'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExplanation(response.data.data.explanation);
    } catch (error) {
      console.error('Explain error:', error);
      setExplanation('Error generating explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetHints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('codeash_token');
      const response = await axios.post(
        'http://localhost:5000/api/ai/hints',
        {
          problemTitle: problem?.title,
          problemDescription: problem?.description,
          userCode: userCode || ''
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHints(response.data.data.hints);
    } catch (error) {
      console.error('Hints error:', error);
      setHints('Error generating hints. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-[#1a1a1a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Chat
        </button>
        <button
          onClick={() => {
            setActiveTab('explain');
            if (!explanation) handleExplainCode();
          }}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'explain'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Explain
        </button>
        <button
          onClick={() => {
            setActiveTab('hints');
            if (!hints) handleGetHints();
          }}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'hints'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2" />
          Hints
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400/50" />
                <p>Ask me anything about this problem!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-500/20 ml-8'
                    : 'bg-white/5 mr-8'
                }`}
              >
                <p className="text-sm text-white whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'explain' && (
          <div className="prose prose-invert max-w-none">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              </div>
            ) : explanation ? (
              <div className="text-sm text-gray-300 whitespace-pre-wrap">{explanation}</div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Code className="w-12 h-12 mx-auto mb-4 text-purple-400/50" />
                <p>Write some code and I'll explain it!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="prose prose-invert max-w-none">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              </div>
            ) : hints ? (
              <div className="text-sm text-gray-300 whitespace-pre-wrap">{hints}</div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-purple-400/50" />
                <p>Get hints to solve this problem!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input (only for chat) */}
      {activeTab === 'chat' && (
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChat()}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
              disabled={loading}
            />
            <button
              onClick={handleChat}
              disabled={loading || !input.trim()}
              className="p-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIAssistant;
