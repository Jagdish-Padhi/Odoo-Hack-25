import dotenv from 'dotenv';
dotenv.config();

import pool from './database/connect.js';
import { app } from './app.js';

// Testing DB connection
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      dbTime: result.rows[0],
    });
  } catch (err) {
    console.log("When visiting on URL /health: " , err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

const PORT = process.env.PORT || 5000;

// starting server...
app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.log("PostgreSQL connection error: ", err);
  }
});
