import { createEvent, createStore, type Store, Event } from "effector";

export type TogglerInstance = {
  open: Event<void>;
  close: Event<void>;
  toggle: Event<void>;
  $isOpen: Store<boolean>;
};

export const createToggler = (
	defaultValue = false,
	{ name, sid }: { name?: string; sid?: string } = {}
): TogglerInstance => {
  const open = createEvent();
  const close = createEvent();
  const toggle = createEvent();

  const $isOpen = createStore(defaultValue, { name, sid })
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
