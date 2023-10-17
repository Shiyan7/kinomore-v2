import { createStore, attach, createEvent, sample, restore } from 'effector';
import { createGate } from 'effector-react';
import { not } from 'patronum';
import { internalApi } from 'shared/api';
import { AppGate } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import { REFRESH_DELAY } from './config';
import { tokenService } from './token-service';

export const sessionModel = atom(() => {
  /* effects */

  const getMeFx = attach({ effect: internalApi.getMe });

  const signInFx = attach({ effect: internalApi.signIn });

  const signUpFx = attach({ effect: internalApi.signUp });

  const refreshFx = attach({ effect: internalApi.refresh });

  /* methods */

  const logOut = createEvent();

  const startRefresh = createEvent<string>();

  const checkTokenAndRedirect = createEvent();

  const redirectToHome = createEvent();

  const refreshTokenWithDelay = createEvent();

  /* state */

  const $hasAccessToken = createStore(false);

  const $isLogged = createStore(false);

  const $pending = createStore(false);

  const $session = restore(getMeFx, null);

  const $isRefreshed = refreshFx.done;

  const ProfileGate = createGate();

  sample({
    clock: $isRefreshed,
    source: ProfileGate.open,
    target: getMeFx,
  });

  setInterval(refreshTokenWithDelay, REFRESH_DELAY);

  sample({
    clock: [AppGate.open, refreshTokenWithDelay],
    fn: tokenService.getRefreshToken,
    target: startRefresh,
  });

  sample({
    clock: startRefresh,
    filter: tokenService.hasRefreshToken,
    target: refreshFx,
  });

  sample({
    clock: AppGate.open,
    fn: tokenService.hasAccessToken,
    target: [$hasAccessToken, $isLogged],
  });

  sample({
    clock: [refreshFx.doneData, signInFx.doneData, signUpFx.doneData],
    fn: tokenService.setTokens,
  });

  sample({
    clock: logOut,
    fn: tokenService.deleteTokens,
  });

  sample({
    clock: AppGate.open,
    source: navigationModel.$router,
    filter: (router) => router?.asPath.startsWith(paths.profile) ?? false,
    target: checkTokenAndRedirect,
  });

  sample({
    clock: getMeFx.failData,
    target: [logOut, redirectToHome],
  });

  sample({
    clock: checkTokenAndRedirect,
    filter: not($hasAccessToken),
    target: redirectToHome,
  });

  sample({
    clock: redirectToHome,
    fn: () => paths.home,
    target: navigationModel.pushFx,
  });

  $isLogged.on([signInFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData], () => true);

  $pending.on([signInFx.pending, signUpFx.pending], (_, payload) => payload);

  $session.reset(logOut);

  $isLogged.reset(logOut);

  return {
    $session,
    $isLogged,
    $isRefreshed,
    $pending,
    signInFx,
    signUpFx,
    refreshFx,
    startRefresh,
    logOut,
    ProfileGate,
  };
});
