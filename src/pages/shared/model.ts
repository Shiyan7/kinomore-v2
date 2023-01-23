import { hasCookie } from 'cookies-next';
import { sample, createEvent, createStore } from 'effector';
import { authModel } from 'features/auth';
import { localStorageKeys } from 'shared/config';

export const appStarted = createEvent();

appStarted.watch(() => console.info('[Event] appStarted'));

const $isAuth = createStore(hasCookie(localStorageKeys.ACCESS_TOKEN));

sample({
  clock: appStarted,
  filter: $isAuth,
  fn: () => null,
  target: authModel.startRefresh,
});
