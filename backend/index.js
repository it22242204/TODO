
import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

// CORS configuration for frontend access
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));      // Enable CORS
app.use(express.json());         // Parse incoming JSON

// Routes

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  try {
    await pool.query(
      'INSERT INTO task (title, description, completed) VALUES (?, ?, false)',
      [title, description]
    );
    res.status(201).send('Task created');
  } catch (error) {
    console.error('Failed to create task:', error);
    res.status(500).send('Server error');
  }
});

// Get the 5 most recent incomplete tasks
app.get('/tasks', async (req, res) => {
  try {
    const [tasks] = await pool.query(
      'SELECT * FROM task WHERE completed = false ORDER BY id DESC LIMIT 5'
    );
    res.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).send('Server error');
  }
});

// Mark a task as completed
app.put('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'UPDATE task SET completed = true WHERE id = ?',
      [id]
    );
    res.status(200).send('Task marked as completed');
  } catch (error) {
    console.error('Failed to mark task as completed:', error);
    res.status(500).send('Server error');
  }
});

// Get all completed tasks
app.get('/tasks/completed', async (req, res) => {
  try {
    const [tasks] = await pool.query(
      'SELECT * FROM task WHERE completed = true ORDER BY id DESC'
    );
    res.json(tasks);
  } catch (error) {
    console.error('Failed to fetch completed tasks:', error);
    res.status(500).send('Server error');
  }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM task WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send('Task not found');
    }

    res.status(204).send(); // Successfully deleted
  } catch (error) {
    console.error('Failed to delete task:', error);
    res.status(500).send('Server error');
  }
});

// Server startup

app.listen(5000, () => {
  console.log('🚀 Backend server is running at http://localhost:5000');
});

export default app;

