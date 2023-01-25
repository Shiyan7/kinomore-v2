import { sample, createEvent } from 'effector';
import { session } from 'entities/session';

export const appStarted = createEvent();

appStarted.watch(() => console.info('[Event] appStarted'));

sample({
  clock: appStarted,
  filter: session.$hasToken,
  fn: () => null,
  target: session.startRefresh,
});
