import React, { useState } from "react";
import "./TaskModal.css";

const TaskModal = ({ task, onClose, onSubmit }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), status });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{task ? "Edit Task" : "New Task"}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title..."
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-status" className="form-label">
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
