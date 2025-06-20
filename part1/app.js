const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 8080;

app.use(express.json());

let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
    console.log('✅ Connected to DogWalkService database');
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
})();

// /api/dogs route
app.get('/api/dogs', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT d.name AS dog_name, d.size, u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
