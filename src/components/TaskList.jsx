import { useTasks } from '../state/TaskContext.jsx';
import FilterBar from './FilterBar.jsx';
import { PlusIcon } from './Icons.jsx';
import TaskRow from './TaskRow.jsx';

export default function TaskList({
  onOpenCreate,
  onEditTask,
  onRequestDelete,
}) {
  const {
    tasks,
    filteredTasks,
    filters,
    activeView,
    setView,
    setTaskStatus,
    resetFilters,
  } = useTasks();

  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.status !== 'All' ||
    filters.priority !== 'All';

  const visibleTasks = filteredTasks;

  const handleViewAllTasks = () => {
    resetFilters();
    setView(activeView === 'tasks' && !hasActiveFilters ? 'overview' : 'tasks');
  };

  const viewAllLabel =
    activeView === 'tasks' && !hasActiveFilters
      ? 'Back to overview'
      : 'View all tasks';

  return (
    <section className="tasks-section" aria-labelledby="my-tasks-heading">
      <div className="tasks-section__header">
        <div>
          <h2 id="my-tasks-heading" className="tasks-section__title">
            My tasks
          </h2>
          <p className="tasks-section__subtitle tasks-section__subtitle--desktop">
            Manage and track everything in one place.
          </p>
          <p className="tasks-section__subtitle tasks-section__subtitle--mobile">
            Your priorities for this week
          </p>
        </div>

        <div className="tasks-section__actions">
          <button
            type="button"
            className="btn-soft tasks-section__view-all"
            onClick={handleViewAllTasks}
          >
            {viewAllLabel}
          </button>

          <button
            type="button"
            className="btn-icon-primary tasks-section__mobile-add"
            aria-label="Create new task"
            onClick={onOpenCreate}
          >
            <PlusIcon size={20} />
          </button>
        </div>
      </div>

      <FilterBar />

      {visibleTasks.length > 0 ? (
        <ul className="task-list" aria-label="Task list">
          {visibleTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onStatusChange={setTaskStatus}
              onEdit={onEditTask}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="task-empty" role="status">
          <p className="task-empty__title">
            {tasks.length === 0 ? 'No tasks yet' : 'No matching tasks found'}
          </p>
          <p className="task-empty__copy">
            {tasks.length === 0
              ? 'Create your first task to start organizing your day.'
              : 'Try adjusting your search query, status tab, or priority filter.'}
          </p>
          <div className="task-empty__actions">
            {hasActiveFilters ? (
              <button
                type="button"
                className="btn-soft"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenCreate}
              >
                Create task
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
