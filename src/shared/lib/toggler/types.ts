import type { StoreWritable, EventCallable } from 'effector';

export interface TogglerInstance {
  open: EventCallable<void>;
  close: EventCallable<void>;
  toggle: EventCallable<void>;
  $isOpen: StoreWritable<boolean>;
}
