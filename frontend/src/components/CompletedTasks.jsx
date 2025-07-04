import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const API = 'http://localhost:5050';

function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompletedTasks = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${API}/tasks/completed`); // updated URL here
    setCompletedTasks(res.data);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch completed tasks:", err);
    setError("Failed to load completed tasks");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="page">
      <main className="main">
        <h2 className="page-title">✅ Completed Tasks</h2>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="loading">Loading completed tasks...</p>
        ) : (
          <div className="task-list">
            {completedTasks.length === 0 ? (
              <p className="no-tasks">No completed tasks yet.</p>
            ) : (
              completedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDone={() => {}} // no action on done for completed tasks
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default CompletedTasks;
