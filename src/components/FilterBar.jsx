import { useEffect, useRef, useState } from 'react';
import { useTasks } from '../state/TaskContext.jsx';
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  SearchIcon,
} from './Icons.jsx';

const STATUS_TABS = [
  { value: 'All', label: 'All tasks' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Completed', label: 'Completed' },
];

const PRIORITY_OPTIONS = [
  { value: 'All', label: 'Priority: All', shortLabel: 'All priorities' },
  { value: 'High', label: 'Priority: High', shortLabel: 'High' },
  { value: 'Medium', label: 'Priority: Medium', shortLabel: 'Medium' },
  { value: 'Low', label: 'Priority: Low', shortLabel: 'Low' },
];

export default function FilterBar() {
  const {
    filters,
    stats,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
  } = useTasks();

  const [mobilePriorityOpen, setMobilePriorityOpen] = useState(false);
  const mobilePriorityRef = useRef(null);
  const mobilePriorityTriggerRef = useRef(null);

  useEffect(() => {
    if (!mobilePriorityOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        mobilePriorityRef.current &&
        !mobilePriorityRef.current.contains(event.target)
      ) {
        setMobilePriorityOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobilePriorityOpen(false);
        mobilePriorityTriggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobilePriorityOpen]);

  const handleMobileMenuKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }
    const items = mobilePriorityRef.current?.querySelectorAll('[role="menuitemradio"]');
    if (!items || items.length === 0) return;

    event.preventDefault();
    const list = Array.from(items);
    const currentIndex = list.indexOf(document.activeElement);
    const nextIndex =
      event.key === 'ArrowDown'
        ? (currentIndex + 1) % list.length
        : (currentIndex - 1 + list.length) % list.length;
    list[nextIndex]?.focus();
  };

  const handleSelectMobilePriority = (value) => {
    setPriorityFilter(value);
    setMobilePriorityOpen(false);
    mobilePriorityTriggerRef.current?.focus();
  };

  const isPriorityFiltered = filters.priority !== 'All';
  const mobileTriggerText = isPriorityFiltered ? filters.priority : 'Priority';

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
              {tab.value === 'All' ? (
                <>
                  <span className="filter-tab__label-desktop">{tab.label}</span>
                  <span className="filter-tab__label-mobile">All</span>
                  <span className="filter-tab__count">{stats.total}</span>
                </>
              ) : (
                <span>{tab.label}</span>
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
            placeholder="Search tasks..."
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

        <div className="mobile-priority" ref={mobilePriorityRef}>
          <button
            ref={mobilePriorityTriggerRef}
            type="button"
            className={`mobile-priority__trigger${
              isPriorityFiltered ? ' mobile-priority__trigger--active' : ''
            }`}
            aria-label={`Filter tasks by priority, currently ${filters.priority}`}
            aria-haspopup="menu"
            aria-expanded={mobilePriorityOpen}
            onClick={() => setMobilePriorityOpen((prev) => !prev)}
          >
            <FilterIcon size={15} />
            <span className="mobile-priority__label">{mobileTriggerText}</span>
          </button>

          {mobilePriorityOpen && (
            <div
              className="mobile-priority__popover"
              role="menu"
              aria-label="Filter tasks by priority"
              onKeyDown={handleMobileMenuKeyDown}
            >
              <p className="task-menu__heading" aria-hidden="true">
                Priority
              </p>
              {PRIORITY_OPTIONS.map((option) => {
                const isSelected = filters.priority === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    className={`task-menu__item${
                      isSelected ? ' task-menu__item--current' : ''
                    }`}
                    onClick={() => handleSelectMobilePriority(option.value)}
                  >
                    <span>{option.shortLabel}</span>
                    {isSelected && (
                      <span className="task-menu__check" aria-hidden="true">
                        <CheckIcon size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
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
