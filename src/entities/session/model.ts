import { createStore, attach, forward, createEvent, sample, restore } from 'effector';
import { reset } from 'patronum';
import { internalApi } from 'shared/api';
import { appStarted } from 'shared/config';
import { atom } from 'shared/lib/atom';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

export const sessionModel = atom(() => {
  /* Атачнутые эффекты */
  const getMeFx = attach({ effect: internalApi.getMe });
  const signInFx = attach({ effect: internalApi.signIn });
  const signUpFx = attach({ effect: internalApi.signUp });
  const logOutFx = attach({ effect: internalApi.logOut });
  const refreshFx = attach({ effect: internalApi.refresh });

  /* Эвенты которые запускают эффекты */
  const logOut = createEvent();
  const startRefresh = createEvent();
  const getMe = createEvent();
  const triggeredHome = createEvent();

  forward({
    from: appStarted,
    to: startRefresh,
  });

  forward({
    from: logOut,
    to: logOutFx,
  });

  forward({
    from: startRefresh,
    to: refreshFx,
  });

  forward({
    from: getMe,
    to: getMeFx,
  });

  const $isLogged = createStore(false)
    .on([signInFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData], () => true)
    .reset(logOutFx.doneData);

  const $pending = createStore(false).on(
    [signInFx.pending, signUpFx.pending, logOutFx.pending],
    (_, payload) => payload,
  );

  const $session = restore(getMeFx, null);

  forward({
    from: logOutFx.done,
    to: triggeredHome,
  });

  reset({
    clock: logOutFx.done,
    target: $session,
  });

  sample({
    clock: triggeredHome,
    fn: () => paths.home,
    target: navigationModel.pushFx,
  });

  sample({
    clock: [refreshFx.failData, getMeFx.failData],
    source: navigationModel.$router,
    filter: (router) => Boolean(router?.asPath.startsWith(paths.profile)),
    target: triggeredHome,
  });

  return {
    getMeFx,
    signInFx,
    signUpFx,
    logOutFx,
    startRefresh,
    logOut,
    getMe,
    $isLogged,
    $pending,
    $session,
  };
});
