import { useTasks } from '../state/TaskContext.jsx';
import { ChevronDownIcon, CloseIcon, SearchIcon } from './Icons.jsx';

const STATUS_TABS = [
  { value: 'All', label: 'All tasks' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Completed', label: 'Completed' },
];

const PRIORITY_OPTIONS = [
  { value: 'All', label: 'Priority: All' },
  { value: 'High', label: 'Priority: High' },
  { value: 'Medium', label: 'Priority: Medium' },
  { value: 'Low', label: 'Priority: Low' },
];

export default function FilterBar() {
  const {
    filters,
    stats,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
  } = useTasks();

  return (
    <div className="filter-bar" role="region" aria-label="Task filters">
      <div className="filter-bar__tabs" role="tablist" aria-label="Filter tasks by status">
        {STATUS_TABS.map((tab) => {
          const isActive = filters.status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-tab${isActive ? ' filter-tab--active' : ''}`}
              onClick={() => setStatusFilter(tab.value)}
            >
              <span>{tab.label}</span>
              {tab.value === 'All' && (
                <span className="filter-tab__count">{stats.total}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="filter-bar__controls">
        <div className="search-field">
          <span className="search-field__icon" aria-hidden="true">
            <SearchIcon size={16} />
          </span>
          <label htmlFor="task-search-input" className="sr-only">
            Search tasks by title
          </label>
          <input
            id="task-search-input"
            type="search"
            className="search-field__input"
            aria-label="Search tasks by title"
            placeholder="Find a task..."
            value={filters.search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
          />
          {filters.search && (
            <button
              type="button"
              className="search-field__clear"
              aria-label="Clear search"
              onClick={() => setSearch('')}
            >
              <CloseIcon size={13} />
            </button>
          )}
        </div>

        <div className="priority-select">
          <label htmlFor="task-priority-filter" className="sr-only">
            Filter tasks by priority
          </label>
          <select
            id="task-priority-filter"
            className="priority-select__control"
            aria-label="Filter tasks by priority"
            value={filters.priority}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="priority-select__chevron" aria-hidden="true">
            <ChevronDownIcon size={15} />
          </span>
        </div>
      </div>
    </div>
  );
}
