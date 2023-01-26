import { sample, createEvent } from 'effector';
import { session } from 'entities/session';

export const appStarted = createEvent();

sample({
  clock: appStarted,
  filter: session.$hasToken,
  fn: () => null,
  target: session.refresh,
});
