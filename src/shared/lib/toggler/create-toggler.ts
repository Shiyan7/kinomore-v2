import { createEvent, createStore } from 'effector';
import type { TogglerInstance } from './types';

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
