const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');
const { GoogleGenAI } = require('@google/genai');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('join_tracking', (donationId) => {
    socket.join(`tracking_${donationId}`);
    console.log(`Socket ${socket.id} joined tracking room tracking_${donationId}`);
  });

  socket.on('update_location', (data) => {
    // data should contain { donationId, lat, lng }
    io.to(`tracking_${data.donationId}`).emit('location_update', data);
  });

  socket.on('join_chat', (donationId) => {
    socket.join(`chat_${donationId}`);
    console.log(`Socket ${socket.id} joined chat room chat_${donationId}`);
  });

  socket.on('send_message', async (data) => {
    // data: { donationId, senderName, senderRole, text }
    let translatedText = null;

    try {
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_api_key_here') {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Translate the following text to English. If it is already in English, or if it is just a name/greeting that doesn't need translation, return exactly the original text. Only return the translated text without any quotes or extra formatting:\n\n${data.text}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt
        });
        
        if (response.text) {
          translatedText = response.text.trim();
          // If translation is identical or very similar (case/punctuation), ignore it to avoid clutter
          if (translatedText.toLowerCase().replace(/[^a-z0-9]/g, '') === data.text.toLowerCase().replace(/[^a-z0-9]/g, '')) {
            translatedText = null;
          }
        }
      }
    } catch (err) {
      console.error('Translation failed:', err.message);
    }

    try {
      const message = new Message({
        donation: data.donationId,
        senderName: data.senderName,
        senderRole: data.senderRole,
        text: data.text,
        translatedText: translatedText
      });
      await message.save();

      io.to(`chat_${data.donationId}`).emit('new_message', {
        id: message._id,
        senderName: message.senderName,
        senderRole: message.senderRole,
        text: message.text,
        translatedText: message.translatedText,
        timestamp: message.createdAt
      });
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Body parser
app.use(express.json({ limit: '10mb' }));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
