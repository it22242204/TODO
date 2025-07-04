import PropTypes from 'prop-types';
import './TaskCard.css';

function TaskCard({ task, onDone, onDelete }) {
  return (
    <article
      className={`task-card ${task.completed ? 'completed' : ''}`}
      data-testid={`task-card-${task.id}`}
      aria-labelledby={`task-title-${task.id}`}
    >
      <div className="task-header">
        <h4 className="task-title" id={`task-title-${task.id}`}>
          {task.title}
        </h4>
        <span
          className={`status-badge ${task.completed ? 'done' : 'pending'}`}
          aria-label={`Status: ${task.completed ? 'Done' : 'Pending'}`}
        >
          {task.completed ? 'Done ✅' : 'Pending ⏳'}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <button
          onClick={onDone}
          disabled={task.completed}
          className="task-btn task-btn-done"
          aria-label={task.completed ? 'Task already completed' : 'Mark task as done'}
          data-testid={`done-button-${task.id}`}
        >
          Mark Done
        </button>
        <button
          onClick={onDelete}
          className="task-btn task-btn-delete"
          aria-label="Delete task"
          data-testid={`delete-button-${task.id}`}
        >
          Delete ❌
        </button>
      </div>
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;