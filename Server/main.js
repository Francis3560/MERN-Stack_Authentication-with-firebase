const express = require('express');
const cors = require('cors');
const connectDB = require('../Server/src/database');
const authRoutes = require('../Server/src/router/authRoutes');  

const app = express();

// Middleware
app.use(express.json());  
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
