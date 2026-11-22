import { useCallback, useRef, useState } from 'react';
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx';
import FocusCarousel from './components/FocusCarousel.jsx';
import MobileNav from './components/MobileNav.jsx';
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

  const formReturnFocusRef = useRef(null);
  const deleteReturnFocusRef = useRef(null);

  const handleOpenCreate = useCallback((event) => {
    formReturnFocusRef.current = event?.currentTarget || document.activeElement;
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((task, triggerEl) => {
    formReturnFocusRef.current = triggerEl || document.activeElement;
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  const handleFormSubmit = useCallback(
    (formData) => {
      if (editingTask) {
        updateTask(formData);
      } else {
        addTask(formData);
      }
      handleCloseForm();
    },
    [editingTask, updateTask, addTask, handleCloseForm]
  );

  const handleRequestDelete = useCallback((task, triggerEl) => {
    deleteReturnFocusRef.current = triggerEl || document.activeElement;
    setTaskToDelete(task);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setTaskToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    (taskId) => {
      deleteTask(taskId);
      setTaskToDelete(null);
    },
    [deleteTask]
  );

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
              <h1 className="dashboard-hero__title">
                Your work,
                <br className="hero-mobile-br" /> in focus.
              </h1>
              <p className="dashboard-hero__subtitle dashboard-hero__subtitle--desktop">
                Plan your day, stay organized, and celebrate small wins.
              </p>
              <p className="dashboard-hero__subtitle dashboard-hero__subtitle--mobile">
                Stay organized and keep moving forward.
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
            onRequestDelete={handleRequestDelete}
          />
        </main>
      </div>

      <MobileNav onPlaceholderSelect={setNotice} />

      <TaskFormModal
        isOpen={isFormOpen}
        editingTask={editingTask}
        returnFocusRef={formReturnFocusRef}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmModal
        task={taskToDelete}
        returnFocusRef={deleteReturnFocusRef}
        onCancel={handleCancelDelete}
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
