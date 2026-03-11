import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { 
  Send, 
  Code2, 
  Users, 
  Circle,
  X,
  Smile
} from 'lucide-react';

const ChatnCode = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('codeash_user') || '{}');

  // Initialize Socket.io
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join with user ID
    if (currentUser._id) {
      newSocket.emit('user:join', currentUser._id);
    }

    // Listen for online users
    newSocket.on('users:online', (users) => {
      setOnlineUsers(users.filter(id => id !== currentUser._id));
    });

    // Listen for messages
    newSocket.on('message:receive', (data) => {
      setMessages(prev => [...prev, data.message]);
    });

    // Listen for typing
    newSocket.on('typing:update', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => new Set([...prev, data.userId]));
      } else {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
      }
    });

    return () => newSocket.close();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!isTyping && selectedUser) {
      setIsTyping(true);
      socket?.emit('typing:start', {
        chatId: getChatId(currentUser._id, selectedUser),
        userId: currentUser._id,
        userName: currentUser.name
      });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('typing:stop', {
        chatId: getChatId(currentUser._id, selectedUser),
        userId: currentUser._id
      });
    }, 1000);
  };

  // Get chat ID (consistent for both users)
  const getChatId = (user1, user2) => {
    return [user1, user2].sort().join('_');
  };

  // Send message
  const sendMessage = () => {
    if (!messageInput.trim() || !selectedUser || !socket) return;

    const message = {
      chatId: getChatId(currentUser._id, selectedUser),
      senderId: currentUser._id,
      senderName: currentUser.name,
      content: messageInput,
      type: 'text',
      participants: [currentUser._id, selectedUser]
    };

    socket.emit('message:send', message);
    setMessages(prev => [...prev, {
      senderId: currentUser._id,
      senderName: currentUser.name,
      content: messageInput,
      type: 'text',
      timestamp: new Date()
    }]);
    setMessageInput('');
    setIsTyping(false);
  };

  // Send code
  const sendCode = () => {
    if (!codeInput.trim() || !selectedUser || !socket) return;

    const message = {
      chatId: getChatId(currentUser._id, selectedUser),
      senderId: currentUser._id,
      senderName: currentUser.name,
      content: codeInput,
      type: 'code',
      language: codeLanguage,
      participants: [currentUser._id, selectedUser]
    };

    socket.emit('message:send', message);
    setMessages(prev => [...prev, {
      senderId: currentUser._id,
      senderName: currentUser.name,
      content: codeInput,
      type: 'code',
      language: codeLanguage,
      timestamp: new Date()
    }]);
    setCodeInput('');
    setShowCodeInput(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            ChatnCode
          </h1>
          <p className="text-gray-400 mt-1">Connect and code with other developers</p>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Online Users Sidebar */}
          <div className="col-span-3 bg-[#1a1a1a] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <h2 className="font-semibold">Online Users ({onlineUsers.length})</h2>
            </div>
            
            <div className="space-y-2">
              {onlineUsers.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">
                  No users online
                </p>
              ) : (
                onlineUsers.map(userId => (
                  <button
                    key={userId}
                    onClick={() => setSelectedUser(userId)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedUser === userId
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold">
                          {userId.slice(0, 2).toUpperCase()}
                        </div>
                        <Circle className="w-3 h-3 text-green-400 fill-green-400 absolute bottom-0 right-0" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">User {userId.slice(-4)}</p>
                        <p className="text-xs text-green-400">Online</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-9 bg-[#1a1a1a] rounded-xl border border-white/5 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold">
                      {selectedUser.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">User {selectedUser.slice(-4)}</p>
                      <p className="text-xs text-green-400">Online</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => {
                    const isOwn = msg.senderId === currentUser._id;
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          {!isOwn && (
                            <span className="text-xs text-gray-400 px-2">{msg.senderName}</span>
                          )}
                          <div className={`rounded-2xl p-3 ${
                            msg.type === 'code'
                              ? 'bg-[#0f0f0f] border border-white/10'
                              : isOwn
                                ? 'bg-green-500/20 border border-green-500/30'
                                : 'bg-white/5 border border-white/10'
                          }`}>
                            {msg.type === 'code' ? (
                              <div>
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                  <Code2 className="w-4 h-4 text-green-400" />
                                  <span className="text-xs text-gray-400">{msg.language}</span>
                                </div>
                                <pre className="text-sm font-mono overflow-x-auto">
                                  <code>{msg.content}</code>
                                </pre>
                              </div>
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 px-2">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Typing Indicator */}
                  {typingUsers.size > 0 && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span>typing...</span>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Code Input Modal */}
                <AnimatePresence>
                  {showCodeInput && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[600px] bg-[#0f0f0f] border border-white/10 rounded-xl p-4 shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-green-400" />
                          <h3 className="font-semibold">Share Code</h3>
                        </div>
                        <button
                          onClick={() => setShowCodeInput(false)}
                          className="p-1 hover:bg-white/5 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <select
                        value={codeLanguage}
                        onChange={(e) => setCodeLanguage(e.target.value)}
                        className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                      </select>
                      
                      <textarea
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        placeholder="Paste your code here..."
                        className="w-full h-40 px-3 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-sm resize-none"
                      />
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => setShowCodeInput(false)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={sendCode}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm transition-colors"
                        >
                          Send Code
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCodeInput(true)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      title="Share code"
                    >
                      <Code2 className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => {
                        setMessageInput(e.target.value);
                        handleTyping();
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                    />
                    
                    <button
                      onClick={sendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Select a user to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatnCode;