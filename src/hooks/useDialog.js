import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal plumbing: locks background scroll, traps Tab inside the dialog, closes
 * on Escape, and returns focus to whatever opened it.
 *
 * Scroll lock compensates for the scrollbar's width so the page behind doesn't
 * shift sideways when it disappears.
 */
export function useDialog(onClose) {
  const ref = useRef(null);
  const restoreFocusTo = useRef(null);

  useEffect(() => {
    restoreFocusTo.current = document.activeElement;

    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingInlineEnd;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`;

    // Move focus into the dialog once it exists.
    const first = ref.current?.querySelector(FOCUSABLE);
    (first ?? ref.current)?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !ref.current) return;

      const focusable = Array.from(ref.current.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingInlineEnd = previousPadding;
      restoreFocusTo.current?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return ref;
}
