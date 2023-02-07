import { useEvent, useStore } from 'effector-react';
import type { TogglerInstance } from './types';

export function useToggler(togglerInstance: TogglerInstance) {
  const { $isOpen, ...togglerEvents } = togglerInstance;
  const isOpen = useStore($isOpen);
  const open = useEvent(togglerEvents.open);
  const close = useEvent(togglerEvents.close);
  const toggle = useEvent(togglerEvents.toggle);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
