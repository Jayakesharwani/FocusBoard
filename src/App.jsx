import { useState } from 'react';
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx';
import FocusCarousel from './components/FocusCarousel.jsx';
import Sidebar from './components/Sidebar.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import TaskFormModal from './components/TaskFormModal.jsx';
import TaskList from './components/TaskList.jsx';
import Topbar from './components/Topbar.jsx';
import { TaskProvider, useTasks } from './state/TaskContext.jsx';

function DashboardShell() {
  const { addTask, updateTask, deleteTask } = useTasks();

  const [notice, setNotice] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      updateTask(formData);
    } else {
      addTask(formData);
    }
    handleCloseForm();
  };

  const handleConfirmDelete = (taskId) => {
    deleteTask(taskId);
    setTaskToDelete(null);
  };

  return (
    <div className="app-shell">
      <Sidebar onPlaceholderSelect={setNotice} />

      <div className="app-shell__main">
        <Topbar onPlaceholderSelect={setNotice} />

        <main className="dashboard-content">
          {notice && (
            <div className="placeholder-notice" role="status" aria-live="polite">
              <span>{notice}</span>
              <button
                type="button"
                className="placeholder-notice__dismiss"
                onClick={() => setNotice('')}
                aria-label="Dismiss notice"
              >
                Dismiss
              </button>
            </div>
          )}

          <header className="dashboard-hero">
            <div className="dashboard-hero__copy">
              <h1 className="dashboard-hero__title">Your work, in focus.</h1>
              <p className="dashboard-hero__subtitle">
                Plan your day, stay organized, and celebrate small wins.
              </p>
            </div>

            <button
              type="button"
              className="btn-primary dashboard-hero__cta"
              onClick={handleOpenCreate}
            >
              New task
            </button>
          </header>

          <FocusCarousel />
          <StatsGrid />
          <TaskList
            onOpenCreate={handleOpenCreate}
            onEditTask={handleOpenEdit}
            onRequestDelete={setTaskToDelete}
          />
        </main>
      </div>

      <TaskFormModal
        isOpen={isFormOpen}
        editingTask={editingTask}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <DashboardShell />
    </TaskProvider>
  );
}
