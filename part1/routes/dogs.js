const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get('/dogs', async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT d.name AS dog_name, d.size, u.username AS owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
      `);
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching dogs:', err);
      res.status(500).json({ error: 'Failed to fetch dogs' });
    }
  });
  return router;
};