import { useEffect, useRef, useState } from 'react';
import { useModalFocus } from '../hooks/useModalFocus.js';
import { TASK_PRIORITIES, TASK_STATUSES } from '../state/taskReducer.js';
import { CalendarIcon, ChevronDownIcon, CloseIcon } from './Icons.jsx';

export default function TaskFormModal({
  isOpen,
  editingTask = null,
  returnFocusRef = null,
  onClose,
  onSubmit,
}) {
  const isEditMode = Boolean(editingTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [titleError, setTitleError] = useState('');

  const dialogRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setStatus(editingTask.status || 'To do');
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('To do');
      setPriority('Medium');
      setDueDate('');
    }
    setIsDateFocused(false);
    setTitleError('');
  }, [isOpen, editingTask]);

  useModalFocus({
    isOpen,
    dialogRef,
    initialFocusRef: titleInputRef,
    returnFocusToRef: returnFocusRef,
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError('Please enter a task title before saving.');
      titleInputRef.current?.focus();
      return;
    }

    onSubmit({
      ...(editingTask ? { id: editingTask.id } : {}),
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      dueDate,
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-modal-title"
        aria-describedby="task-form-modal-subtitle"
      >
        <div className="modal-card__header">
          <div>
            <h2 id="task-form-modal-title" className="modal-card__title">
              {isEditMode ? 'Edit task' : 'Create new task'}
            </h2>
            <p id="task-form-modal-subtitle" className="modal-card__subtitle">
              {isEditMode
                ? 'Update your task details to keep everything on track.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>

          <button
            type="button"
            className="modal-card__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <hr className="modal-card__divider" />

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="task-title-input" className="form-field__label">
              Task title <span aria-hidden="true">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title-input"
              type="text"
              className={`form-field__input${
                titleError ? ' form-field__input--error' : ''
              }`}
              placeholder="e.g. Update pricing page"
              value={title}
              aria-required="true"
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? 'task-title-error' : undefined}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError && event.target.value.trim()) {
                  setTitleError('');
                }
              }}
            />
            {titleError && (
              <p
                id="task-title-error"
                className="form-field__error"
                role="alert"
              >
                {titleError}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="task-description-input" className="form-field__label">
              Description
            </label>
            <textarea
              id="task-description-input"
              className="form-field__textarea"
              placeholder="Add notes about this task..."
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-grid-two">
            <div className="form-field">
              <label htmlFor="task-status-select" className="form-field__label">
                Status
              </label>
              <div className="form-select-wrap">
                <select
                  id="task-status-select"
                  className="form-field__select"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {TASK_STATUSES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="form-select-wrap__chevron" aria-hidden="true">
                  <ChevronDownIcon size={16} />
                </span>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority-select" className="form-field__label">
                Priority
              </label>
              <div className="form-select-wrap">
                <select
                  id="task-priority-select"
                  className="form-field__select"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  {TASK_PRIORITIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="form-select-wrap__chevron" aria-hidden="true">
                  <ChevronDownIcon size={16} />
                </span>
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="task-due-date-input" className="form-field__label">
              Due date
            </label>
            <div className="form-date-wrap">
              <span className="form-date-wrap__icon" aria-hidden="true">
                <CalendarIcon size={18} />
              </span>
              {!dueDate && !isDateFocused && (
                <span className="form-date-wrap__placeholder" aria-hidden="true">
                  DD / MM / YYYY
                </span>
              )}
              <input
                id="task-due-date-input"
                type="date"
                className={`form-field__input form-field__input--date${
                  !dueDate ? ' form-field__input--date-empty' : ''
                }`}
                value={dueDate}
                onFocus={() => setIsDateFocused(true)}
                onBlur={() => setIsDateFocused(false)}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>

          <p className="task-form__required-note">* Required field</p>

          <hr className="modal-card__divider modal-card__divider--footer" />

          <div className="modal-card__footer">
            <button
              type="button"
              className="btn-secondary modal-card__btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary modal-card__btn modal-card__btn--primary"
            >
              {isEditMode ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
