import { useState } from 'react';
import FocusCarousel from './components/FocusCarousel.jsx';
import Sidebar from './components/Sidebar.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import Topbar from './components/Topbar.jsx';
import { TaskProvider } from './state/TaskContext.jsx';

function DashboardShell() {
  const [notice, setNotice] = useState('');

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
              onClick={() =>
                setNotice('Create-task form will be connected in Phase 4.')
              }
            >
              New task
            </button>
          </header>

          <FocusCarousel />
          <StatsGrid />
        </main>
      </div>
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
