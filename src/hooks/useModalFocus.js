import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Manages modal dialog accessibility:
 * - Moves initial focus inside the dialog
 * - Traps Tab / Shift+Tab within the dialog
 * - Closes on Escape
 * - Locks background body scrolling
 * - Restores focus to the triggering element on close
 */
export function useModalFocus({
  isOpen,
  dialogRef,
  initialFocusRef,
  returnFocusToRef,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const triggerElement =
      returnFocusToRef?.current || document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      focusables?.[0]?.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusables = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (triggerElement && typeof triggerElement.focus === 'function' && triggerElement.isConnected) {
        triggerElement.focus();
      }
    };
  }, [isOpen, dialogRef, initialFocusRef, returnFocusToRef, onClose]);
}
