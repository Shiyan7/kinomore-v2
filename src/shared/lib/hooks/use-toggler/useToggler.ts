import { createEvent, createStore, type Store, Event } from 'effector';
import { useEvent, useStore } from 'effector-react';

export interface TogglerInstance {
  open: Event<void>;
  close: Event<void>;
  toggle: Event<void>;
  $isOpen: Store<boolean>;
}

export const createToggler = (defaultValue = false): TogglerInstance => {
  const open = createEvent();
  const close = createEvent();
  const toggle = createEvent();

  const $isOpen = createStore(defaultValue)
    .on(open, () => true)
    .on(close, () => false)
    .on(toggle, (v) => !v);

  return {
    open,
    close,
    toggle,
    $isOpen,
  };
};

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
