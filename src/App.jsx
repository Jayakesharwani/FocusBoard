import { TaskProvider } from './state/TaskContext.jsx';

export default function App() {
  return (
    <TaskProvider>
      <main className="phase1-shell">
        <section className="phase1-card" aria-label="FocusBoard bootstrap status">
          <h1>FocusBoard</h1>
          <p>Phase 2 state layer, derived statistics, filters, and persistence ready.</p>
        </section>
      </main>
    </TaskProvider>
  );
}
