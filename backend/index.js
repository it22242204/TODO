import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

// ✅ Correct CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

// ✅ Handle preflight OPTIONS requests
// app.options('/*', cors(corsOptions));

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Create new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    await pool.query(
      'INSERT INTO task (title, description, completed) VALUES (?, ?, false)',
      [title, description]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Get incomplete tasks
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM task WHERE completed = false ORDER BY id DESC LIMIT 5'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Mark task as completed
app.put('/tasks/:id/complete', async (req, res) => {
  try {
    await pool.query(
      'UPDATE task SET completed = true WHERE id = ?',
      [req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Server error');
  }
});
// Get completed tasks
app.get('/tasks/completed', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM task WHERE completed = true ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching completed tasks:', err);
    res.status(500).send('Server error');
  }
});
// Delete task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM task WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send('Task not found');
    }

    res.sendStatus(204); // No content, successfully deleted
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log('🚀 Backend running on port 5000');
});
