import { createStore, attach, forward, createEvent, sample, restore } from 'effector';
import { appStarted } from 'pages/shared';
import { navigationModel } from 'entities/navigation';
import { internalApi } from 'shared/api';
import { paths } from 'shared/routing';

/* Атачнутые эффекты */
export const loginFx = attach({ effect: internalApi.login });
export const registerFx = attach({ effect: internalApi.register });
export const logoutFx = attach({ effect: internalApi.logout });
export const refreshFx = attach({ effect: internalApi.refresh });
export const getSessionFx = attach({ effect: internalApi.getProfile });

/* Эвенты которые запускают эффекты */
export const logout = createEvent();
export const startRefresh = createEvent();
export const getSession = createEvent();

forward({
  from: logout,
  to: logoutFx,
});

forward({
  from: startRefresh,
  to: refreshFx,
});

export const $isLogged = createStore(false)
  .on([loginFx.doneData, registerFx.doneData, refreshFx.doneData, getSessionFx.doneData], () => true)
  .reset(logoutFx.doneData);

export const $pending = createStore(false).on(
  [loginFx.pending, registerFx.pending, logoutFx.pending],
  (_, payload) => payload
);

sample({
  clock: appStarted,
  fn: () => null,
  target: startRefresh,
});

sample({
  clock: getSession,
  fn: () => null,
  target: getSessionFx,
});

export const $session = restore(getSessionFx, null);

/* Обнуляем сессию когда сработал logoutFx */
$session.reset(logoutFx.done);

sample({
  clock: logoutFx.done,
  fn: () => paths.home,
  target: navigationModel.pushFx,
});
