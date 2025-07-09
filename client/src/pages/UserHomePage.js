import React, { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import "./UserHomePage.css";

const UserHomePage = () => {
  const [auth] = useAuth();
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/task/tasks", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Open modal for creating new task
  const handleCreateClick = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  // Open modal for editing existing task
  const handleEditClick = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  // Handle task creation or update
  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        // Update existing task
        await axios.put(
          `http://localhost:8000/task/tasks/${editingTask._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        toast.success("Task updated successfully");
      } else {
        // Create new task
        await axios.post("http://localhost:8000/task/tasks", formData, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        toast.success("Task created successfully");
      }
      setModalVisible(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    }
  };

  // Handle task deletion
  const handleDelete = async (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/task/tasks/${task._id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      if (response.data.success) {
        toast.success("Task deleted successfully");
        loadTasks();
      } else {
        toast.error(response.data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Filter tasks based on status
  const getFilteredTasks = () => {
    if (filterStatus === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === filterStatus);
  };

  // Get status icon based on task status
  const getStatusIcon = (status) => {
    if (status === "completed") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    }
    if (status === "pending") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    }
    return null;
  };

  // Calculate task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    return { total, completed, pending };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  return (
    <Layout onCreateTask={handleCreateClick}>
      <div className="homepage-container">
        <div className="homepage-header">
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome, {auth?.user?.name || "User"}!
            </h1>
            <p className="welcome-subtitle">Manage your tasks efficiently</p>
          </div>

          <div className="stats-container">
            <div className="stat-card total">
              <div className="stat-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11h6m-6 4h6m2 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>

            <div className="stat-card completed">
              <div className="stat-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>

            <div className="stat-card pending">
              <div className="stat-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-container">
            <label htmlFor="statusFilter" className="filter-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="tasks-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner-large"></div>
              <p className="loading-text">Loading your tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11h6m-6 4h6m2 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="empty-title">No tasks found</h3>
              <p className="empty-subtitle">
                {filterStatus === "all"
                  ? "Create your first task to get started!"
                  : `No ${filterStatus} tasks found. Try a different filter.`}
              </p>
              {filterStatus === "all" && (
                <button
                  onClick={handleCreateClick}
                  className="create-first-task-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14m7-7H5" />
                  </svg>
                  Create Your First Task
                </button>
              )}
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <div key={task._id} className={`task-card ${task.status}`}>
                  <div className="task-header">
                    <div className={`task-status-badge ${task.status}`}>
                      <div className="status-icon">
                        {getStatusIcon(task.status)}
                      </div>
                      <span className="status-text">{task.status}</span>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="action-btn edit-btn"
                        title="Edit task"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(task)}
                        className="action-btn delete-btn"
                        title="Delete task"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          <path d="M10 11v6m4-6v6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                  </div>

                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="task-date">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {formatDate(task.createdAt || Date.now())}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {modalVisible && (
          <TaskModal
            task={editingTask}
            onClose={() => setModalVisible(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserHomePage;
