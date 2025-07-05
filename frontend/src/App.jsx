import React from 'react';import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskCard from './components/TaskCard';
import CompletedTasks from './components/CompletedTasks';
import './App.css';

const API = 'http://localhost:5050';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data.slice(0, 5)); // Limit to 5 most recent tasks
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/tasks`, form);
      setForm({ title: '', description: '' });
      setError(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      setError("Failed to add task");
    }
  };

  const markAsDone = async (id) => {
    try {
      await axios.put(`${API}/tasks/${id}/complete`);
      setError(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to mark task as done:", err);
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      setError(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task");
    }
  };

  return (
    <Router>
      <div className="page">
        <header className="header">
          <div className="container header-container">
            <h1 className="logo" aria-label="Pro Todo Manager">
              📝 <span className="logo-text">Pro Todo Manager</span>
            </h1>
            <nav className="nav-links" aria-label="Primary navigation">
              <Link to="/" className="nav-link" tabIndex={0}>Active Tasks</Link>
              <Link to="/completed" className="nav-link" tabIndex={0}>Completed Tasks</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={
              <div className="split-container">
                {error && <p className="error">{error}</p>}
                <div className="form-column">
                  <h2 className="page-title" id="form-title">Add New Task</h2>
                  <form onSubmit={handleSubmit} className="task-form" aria-labelledby="form-title">
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                      className="input"
                      aria-label="Task title"
                    />
                    <textarea
                      placeholder="Task Description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                      className="input textarea"
                      aria-label="Task description"
                    />
                    <button type="submit" className="btn">Add Task</button>
                  </form>
                </div>
                <div className="tasks-column">
                  <h2 className="page-title">Recent Tasks</h2>
                  <div className="task-list">
                    {loading ? (
                      <p className="loading">Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                      <p className="no-tasks">No tasks available. Add some!</p>
                    ) : (
                      tasks.map(task => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onDone={() => markAsDone(task.id)} 
                          onDelete={() => deleteTask(task.id)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            } />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container footer-container">
            <p className="footer-text">
              © {new Date().getFullYear()} Pro Todo Manager. All rights reserved.
            </p>
            <p className="footer-subtext">
              Developed by Asho. Built with React & Express.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;