import { useEffect } from 'react';

export function useEscape(callback: (event: KeyboardEvent) => unknown) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        callback(event);
      }
    }

    window.document.addEventListener('keydown', handleEscape);

    return () => {
      window.document.removeEventListener('keydown', handleEscape);
    };
  }, [callback]);
}
