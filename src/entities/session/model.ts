import { createStore, attach, forward, createEvent, sample, restore } from 'effector';
import { appStarted } from 'pages/shared';
import { navigationModel } from 'entities/navigation';
import { internalApi } from 'shared/api';
import { paths } from 'shared/routing';

/* Атачнутые эффекты */
export const getMeFx = attach({ effect: internalApi.getMe });
export const signInFx = attach({ effect: internalApi.signIn });
export const signUpFx = attach({ effect: internalApi.signUp });
export const logOutFx = attach({ effect: internalApi.logOut });
export const refreshFx = attach({ effect: internalApi.refresh });

/* Эвенты которые запускают эффекты */
export const logOut = createEvent();
export const startRefresh = createEvent();
export const getMe = createEvent();

forward({
  from: logOut,
  to: logOutFx,
});

forward({
  from: startRefresh,
  to: refreshFx,
});

forward({
  from: appStarted,
  to: startRefresh,
});

forward({
  from: getMe,
  to: getMeFx,
});

export const $isLogged = createStore(false)
  .on([signInFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData], () => true)
  .reset(logOutFx.doneData);

export const $pending = createStore(false).on(
  [signInFx.pending, signUpFx.pending, logOutFx.pending],
  (_, payload) => payload
);

export const $session = restore(getMeFx, null);

/* Обнуляем сессию когда сработал logoutFx */
$session.reset(logOutFx.done);

sample({
  clock: logOutFx.done,
  fn: () => paths.home,
  target: navigationModel.pushFx,
});
