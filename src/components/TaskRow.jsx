import { useEffect, useRef, useState } from 'react';
import { TASK_STATUSES } from '../state/taskReducer.js';
import { formatShortDueDate } from '../utils/dateFormat.js';
import {
  CalendarIcon,
  CheckIcon,
  DotsHorizontalIcon,
  EditIcon,
  TrashIcon,
} from './Icons.jsx';

const NEXT_STATUS_MAP = {
  'To do': 'In progress',
  'In progress': 'Completed',
  Completed: 'To do',
};

export default function TaskRow({
  task,
  onStatusChange,
  onEdit,
  onRequestDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const statusSlug =
    task.status === 'Completed'
      ? 'completed'
      : task.status === 'In progress'
      ? 'in-progress'
      : 'todo';

  const prioritySlug = task.priority.toLowerCase();
  const nextStatus = NEXT_STATUS_MAP[task.status] || 'Completed';

  const handleCycleStatus = () => {
    onStatusChange(task.id, nextStatus);
  };

  const handleSelectStatus = (status) => {
    onStatusChange(task.id, status);
    setMenuOpen(false);
  };

  const handleEditClick = () => {
    setMenuOpen(false);
    onEdit(task);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    onRequestDelete(task);
  };

  return (
    <li className={`task-row${menuOpen ? ' task-row--menu-open' : ''}`}>
      <div className="task-row__main">
        <button
          type="button"
          className={`task-status-toggle task-status-toggle--${statusSlug}`}
          aria-label={`Task "${task.title}" status is ${task.status}. Click to change status to ${nextStatus}.`}
          title={`Status: ${task.status} (click for ${nextStatus})`}
          onClick={handleCycleStatus}
        >
          {task.status === 'Completed' ? (
            <CheckIcon size={15} />
          ) : (
            <span className="task-status-toggle__box" aria-hidden="true">
              {task.status === 'In progress' && (
                <span className="task-status-toggle__dot" />
              )}
            </span>
          )}
        </button>

        <div className="task-row__content">
          <h3 className="task-row__title">{task.title}</h3>
          <p className="task-row__description">
            {task.description || `${task.status} task`}
          </p>
        </div>
      </div>

      <div className="task-row__meta">
        <span className="badge badge--category">{task.category}</span>
        <span className={`badge badge--priority-${prioritySlug}`}>
          {task.priority}
        </span>
        <span className="task-row__due">
          <CalendarIcon size={14} />
          <span>{formatShortDueDate(task.dueDate)}</span>
        </span>

        <div className="task-menu" ref={menuContainerRef}>
          <button
            ref={triggerRef}
            type="button"
            className="task-menu__trigger"
            aria-label={`Actions for ${task.title}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <DotsHorizontalIcon size={18} />
          </button>

          {menuOpen && (
            <div
              className="task-menu__dropdown"
              role="menu"
              aria-label={`Actions for ${task.title}`}
            >
              <p className="task-menu__heading" aria-hidden="true">
                Set status
              </p>
              {TASK_STATUSES.map((status) => {
                const isCurrent = task.status === status;
                return (
                  <button
                    key={status}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isCurrent}
                    className={`task-menu__item${
                      isCurrent ? ' task-menu__item--current' : ''
                    }`}
                    onClick={() => handleSelectStatus(status)}
                  >
                    <span>{status}</span>
                    {isCurrent && (
                      <span className="task-menu__check" aria-hidden="true">
                        <CheckIcon size={14} />
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="task-menu__divider" role="separator" />

              <button
                type="button"
                role="menuitem"
                className="task-menu__item"
                onClick={handleEditClick}
              >
                <span className="task-menu__item-label">
                  <EditIcon size={14} />
                  <span>Edit task</span>
                </span>
              </button>

              <button
                type="button"
                role="menuitem"
                className="task-menu__item task-menu__item--danger"
                onClick={handleDeleteClick}
              >
                <span className="task-menu__item-label">
                  <TrashIcon size={14} />
                  <span>Delete task</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
