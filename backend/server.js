import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import problemRoutes from './routes/problemRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import battleRoutes from './routes/battleRoutes.js';
import typingRaceRoutes from './routes/typingRaceRoutes.js';
import Chat from './models/Chat.js';
import User from './models/User.js';
import Battle from './models/Battle.js';
import TypingRace from './models/TypingRace.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/typing-race', typingRaceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CodeAsh API is running' });
});

// Socket.io - ChatnCode
const onlineUsers = new Map(); // userId -> socketId
const typingUsers = new Map(); // chatId -> Set of userIds

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins with their ID
  socket.on('user:join', async (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.userId = userId;
    
    // Broadcast online status to all users
    io.emit('users:online', Array.from(onlineUsers.keys()));
    
    console.log(`User ${userId} is now online`);
  });

  // Send message
  socket.on('message:send', async (data) => {
    try {
      const { chatId, senderId, senderName, content, type, language } = data;
      
      // Find or create chat
      let chat = await Chat.findById(chatId);
      if (!chat) {
        chat = new Chat({
          participants: data.participants,
          messages: []
        });
      }
      
      // Add message
      const message = {
        senderId,
        senderName,
        content,
        type: type || 'text',
        language,
        timestamp: new Date()
      };
      
      chat.messages.push(message);
      chat.lastMessage = new Date();
      await chat.save();
      
      // Send to all participants
      chat.participants.forEach(participantId => {
        const socketId = onlineUsers.get(participantId.toString());
        if (socketId) {
          io.to(socketId).emit('message:receive', {
            chatId: chat._id,
            message: chat.messages[chat.messages.length - 1]
          });
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Typing indicator
  socket.on('typing:start', (data) => {
    const { chatId, userId, userName } = data;
    
    if (!typingUsers.has(chatId)) {
      typingUsers.set(chatId, new Set());
    }
    typingUsers.get(chatId).add(userId);
    
    // Notify other users in chat
    socket.broadcast.emit('typing:update', {
      chatId,
      userId,
      userName,
      isTyping: true
    });
  });

  socket.on('typing:stop', (data) => {
    const { chatId, userId } = data;
    
    if (typingUsers.has(chatId)) {
      typingUsers.get(chatId).delete(userId);
    }
    
    socket.broadcast.emit('typing:update', {
      chatId,
      userId,
      isTyping: false
    });
  });

  // Get chat history
  socket.on('chat:load', async (data) => {
    try {
      const { chatId } = data;
      const chat = await Chat.findById(chatId);
      
      if (chat) {
        socket.emit('chat:history', {
          chatId,
          messages: chat.messages
        });
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  });

  // ========== BATTLE ARENA EVENTS ==========
  
  // Join battle room
  socket.on('battle:join', async (data) => {
    try {
      const { battleId, userId } = data;
      socket.join(`battle:${battleId}`);
      socket.battleId = battleId;
      
      // Notify other player
      socket.to(`battle:${battleId}`).emit('battle:player-joined', { userId });
      
      console.log(`User ${userId} joined battle ${battleId}`);
    } catch (error) {
      console.error('Error joining battle:', error);
    }
  });

  // Battle ready
  socket.on('battle:ready', async (data) => {
    try {
      const { battleId, userId } = data;
      
      // Notify other player
      socket.to(`battle:${battleId}`).emit('battle:player-ready', { userId });
    } catch (error) {
      console.error('Error battle ready:', error);
    }
  });

  // Battle started
  socket.on('battle:start', async (data) => {
    try {
      const { battleId } = data;
      
      // Notify all players in battle
      io.to(`battle:${battleId}`).emit('battle:started', {
        startTime: Date.now()
      });
      
      console.log(`Battle ${battleId} started`);
    } catch (error) {
      console.error('Error starting battle:', error);
    }
  });

  // Code update (real-time)
  socket.on('battle:code-update', async (data) => {
    try {
      const { battleId, userId, linesWritten } = data;
      
      // Notify other player about progress
      socket.to(`battle:${battleId}`).emit('battle:opponent-progress', {
        userId,
        linesWritten
      });
    } catch (error) {
      console.error('Error code update:', error);
    }
  });

  // Test run
  socket.on('battle:test-run', async (data) => {
    try {
      const { battleId, userId, testsPassed, totalTests } = data;
      
      // Notify other player
      socket.to(`battle:${battleId}`).emit('battle:opponent-tested', {
        userId,
        testsPassed,
        totalTests
      });
    } catch (error) {
      console.error('Error test run:', error);
    }
  });

  // Solution submitted
  socket.on('battle:submit', async (data) => {
    try {
      const { battleId, userId } = data;
      
      // Notify other player
      socket.to(`battle:${battleId}`).emit('battle:opponent-submitted', {
        userId,
        submittedAt: Date.now()
      });
      
      console.log(`User ${userId} submitted solution in battle ${battleId}`);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  });

  // Battle completed
  socket.on('battle:complete', async (data) => {
    try {
      const { battleId, winner, ratingChanges } = data;
      
      // Notify all players
      io.to(`battle:${battleId}`).emit('battle:completed', {
        winner,
        ratingChanges,
        endTime: Date.now()
      });
      
      console.log(`Battle ${battleId} completed. Winner: ${winner}`);
    } catch (error) {
      console.error('Error completing battle:', error);
    }
  });

  // Leave battle
  socket.on('battle:leave', async (data) => {
    try {
      const { battleId, userId } = data;
      
      socket.leave(`battle:${battleId}`);
      
      // Notify other player
      socket.to(`battle:${battleId}`).emit('battle:player-left', { userId });
      
      console.log(`User ${userId} left battle ${battleId}`);
    } catch (error) {
      console.error('Error leaving battle:', error);
    }
  });

  // ========== END BATTLE EVENTS ==========

  // ========== TYPING RACE EVENTS ==========
  
  // Join typing race
  socket.on('race:join', async (data) => {
    try {
      const { raceId, userId } = data;
      socket.join(`race:${raceId}`);
      socket.raceId = raceId;
      
      // Notify other players
      socket.to(`race:${raceId}`).emit('race:player-joined', { userId });
      
      console.log(`User ${userId} joined race ${raceId}`);
    } catch (error) {
      console.error('Error joining race:', error);
    }
  });

  // Race countdown started
  socket.on('race:countdown', async (data) => {
    try {
      const { raceId } = data;
      
      // Notify all players
      io.to(`race:${raceId}`).emit('race:countdown-started', {
        startTime: Date.now()
      });
      
      console.log(`Race ${raceId} countdown started`);
    } catch (error) {
      console.error('Error race countdown:', error);
    }
  });

  // Race started
  socket.on('race:start', async (data) => {
    try {
      const { raceId } = data;
      
      // Update race status
      const race = await TypingRace.findById(raceId);
      if (race) {
        race.status = 'racing';
        race.startTime = new Date();
        await race.save();
      }
      
      // Notify all players
      io.to(`race:${raceId}`).emit('race:started', {
        startTime: Date.now()
      });
      
      console.log(`Race ${raceId} started`);
    } catch (error) {
      console.error('Error starting race:', error);
    }
  });

  // Typing progress update
  socket.on('race:progress', async (data) => {
    try {
      const { raceId, userId, currentPosition, wpm, accuracy, progress } = data;
      
      // Notify other players
      socket.to(`race:${raceId}`).emit('race:player-progress', {
        userId,
        currentPosition,
        wpm,
        accuracy,
        progress
      });
    } catch (error) {
      console.error('Error race progress:', error);
    }
  });

  // Player finished
  socket.on('race:finish', async (data) => {
    try {
      const { raceId, userId, timeTaken, wpm, accuracy } = data;
      
      // Notify other players
      socket.to(`race:${raceId}`).emit('race:player-finished', {
        userId,
        timeTaken,
        wpm,
        accuracy,
        finishedAt: Date.now()
      });
      
      console.log(`User ${userId} finished race ${raceId} in ${timeTaken}s`);
    } catch (error) {
      console.error('Error finishing race:', error);
    }
  });

  // Race completed
  socket.on('race:complete', async (data) => {
    try {
      const { raceId, winner, results } = data;
      
      // Notify all players
      io.to(`race:${raceId}`).emit('race:completed', {
        winner,
        results,
        endTime: Date.now()
      });
      
      console.log(`Race ${raceId} completed. Winner: ${winner}`);
    } catch (error) {
      console.error('Error completing race:', error);
    }
  });

  // Leave race
  socket.on('race:leave', async (data) => {
    try {
      const { raceId, userId } = data;
      
      socket.leave(`race:${raceId}`);
      
      // Notify other players
      socket.to(`race:${raceId}`).emit('race:player-left', { userId });
      
      console.log(`User ${userId} left race ${raceId}`);
    } catch (error) {
      console.error('Error leaving race:', error);
    }
  });

  // ========== END TYPING RACE EVENTS ==========

  // ========== END BATTLE EVENTS ==========

  // Disconnect
  socket.on('disconnect', () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      
      // Broadcast updated online users
      io.emit('users:online', Array.from(onlineUsers.keys()));
      
      // If in battle, notify opponent
      if (socket.battleId) {
        socket.to(`battle:${socket.battleId}`).emit('battle:player-disconnected', {
          userId: socket.userId
        });
      }
      
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`💬 Socket.io ready for ChatnCode`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

export default app;
