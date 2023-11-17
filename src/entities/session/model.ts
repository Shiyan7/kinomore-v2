import { createStore, createEvent, sample, restore } from 'effector';
import { createGate } from 'effector-react';
import { not } from 'patronum';
import { getMeFx, refreshFx, signInFx, signUpFx, googleLoginFx } from 'shared/api';
import { AppGate, isClient } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import { REFRESH_DELAY } from './config';
import { tokenService } from './token-service';

export const sessionModel = atom(() => {
  const refreshTokenStarted = createEvent<string>();

  const logOut = createEvent();

  const startRefreshTokenWithInterval = createEvent();

  const checkTokenAndRedirect = createEvent();

  const redirectToHome = createEvent();

  const loginWithGoogle = createEvent<{ code: string }>();

  const $hasAccessToken = createStore(false);

  const $isLogged = createStore(false);

  const $pending = createStore(false);

  const $session = restore(getMeFx, null);

  const ProfilePageGate = createGate();

  const $isRefreshed = refreshFx.done;

  sample({
    clock: $isRefreshed,
    source: ProfilePageGate.open,
    target: getMeFx,
  });

  sample({
    clock: [refreshFx.doneData, signInFx.doneData, signUpFx.doneData, googleLoginFx.doneData],
    fn: tokenService.setTokens,
  });

  setInterval(() => {
    if (isClient) {
      startRefreshTokenWithInterval();
    }
  }, REFRESH_DELAY);

  sample({
    clock: [AppGate.open, startRefreshTokenWithInterval],
    fn: tokenService.getRefreshToken,
    target: refreshTokenStarted,
  });

  sample({
    clock: refreshTokenStarted,
    filter: tokenService.hasRefreshToken,
    target: refreshFx,
  });

  sample({
    clock: AppGate.open,
    fn: tokenService.hasAccessToken,
    target: [$hasAccessToken, $isLogged],
  });

  sample({
    clock: getMeFx.failData,
    target: [logOut, redirectToHome],
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
    clock: checkTokenAndRedirect,
    filter: not($hasAccessToken),
    target: redirectToHome,
  });

  sample({
    clock: redirectToHome,
    fn: () => paths.home,
    target: navigationModel.pushFx,
  });

  sample({
    clock: loginWithGoogle,
    fn: ({ code }) => code,
    target: googleLoginFx,
  });

  $isLogged.on(
    [signInFx.doneData, googleLoginFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData],
    () => true,
  );

  $pending.on([signInFx.pending, signUpFx.pending], (_, payload) => payload);

  $session.reset(logOut);

  $isLogged.reset(logOut);

  refreshFx.failData.watch(() => logOut());

  return {
    $session,
    $isLogged,
    $isRefreshed,
    $pending,
    signInFx,
    signUpFx,
    refreshFx,
    googleLoginFx,
    loginWithGoogle,
    logOut,
    ProfilePageGate,
  };
});
