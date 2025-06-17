const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();


app.use(cors({
  origin: 'https://educase-assignment1-7x5i.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected');
    
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });
