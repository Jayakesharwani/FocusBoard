import { useRef } from 'react';
import { useModalFocus } from '../hooks/useModalFocus.js';
import { CloseIcon } from './Icons.jsx';

export default function DeleteConfirmModal({
  task,
  returnFocusRef = null,
  onCancel,
  onConfirm,
}) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useModalFocus({
    isOpen: Boolean(task),
    dialogRef,
    initialFocusRef: cancelBtnRef,
    returnFocusToRef: returnFocusRef,
    onClose: onCancel,
  });

  if (!task) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="modal-card modal-card--confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
      >
        <div className="modal-card__header">
          <div>
            <h2 id="delete-modal-title" className="modal-card__title modal-card__title--sm">
              Delete task?
            </h2>
            <p id="delete-modal-desc" className="modal-card__subtitle">
              Are you sure you want to permanently remove{' '}
              <strong>&ldquo;{task.title}&rdquo;</strong>? This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            className="modal-card__close"
            aria-label="Close confirmation dialog"
            onClick={onCancel}
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <hr className="modal-card__divider modal-card__divider--footer" />

        <div className="modal-card__footer">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn-secondary modal-card__btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger modal-card__btn"
            onClick={() => onConfirm(task.id)}
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
