const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
  secret: 'dogSecret',
  resave: false,
  saveUninitialized: true
}));
(async () => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
    console.log('Connected to DogWalkService database');
    app.use((req, res, next) => {
      req.db = db;
      next();
    });
// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;