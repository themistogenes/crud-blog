const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./config');
const app = express();

// Routes
const postsRoutes = require('./routes/api/posts');

// CORS Middleware
app.use(cors());

// BodyParser Middleware
app.use(express.json());

// Connet to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// User routes
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));