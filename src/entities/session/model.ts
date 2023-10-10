import { createStore, attach, forward, createEvent, sample, restore } from 'effector';
import { createGate } from 'effector-react';
import { NextRouter } from 'next/router';
import { reset } from 'patronum';
import { internalApi } from 'shared/api';
import { appStarted } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

export const sessionModel = atom(() => {
  const getMeFx = attach({ effect: internalApi.getMe });
  const signInFx = attach({ effect: internalApi.signIn });
  const signUpFx = attach({ effect: internalApi.signUp });
  const logOutFx = attach({ effect: internalApi.logOut });
  const refreshFx = attach({ effect: internalApi.refresh });

  const getMe = createGate();
  const logOut = createEvent();
  const startRefresh = createEvent();
  const checkRouteAndRedirect = createEvent<NextRouter>();

  const $isLogged = createStore(false)
    .on([signInFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData], () => true)
    .reset(logOut);

  const $pending = createStore(false).on([signInFx.pending, signUpFx.pending], (_, payload) => payload);

  const $session = restore(getMeFx, null);

  sample({
    clock: appStarted.open,
    target: startRefresh,
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
    from: getMe.open,
    to: getMeFx,
  });

  sample({
    clock: [refreshFx.failData, getMeFx.failData],
    source: navigationModel.$router,
    filter: Boolean,
    target: checkRouteAndRedirect,
  });

  sample({
    clock: checkRouteAndRedirect,
    filter: (router) => router.asPath.startsWith(paths.profile),
    fn: () => paths.home,
    target: navigationModel.pushFx,
  });

  reset({
    clock: logOut,
    target: $session,
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
