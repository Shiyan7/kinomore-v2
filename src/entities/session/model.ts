import { createStore, createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { not } from 'patronum';
import { AppGate, isClient } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import { sessionQuery, googleLoginQuery, refreshQuery, signInQuery, signUpQuery } from './api';
import { REFRESH_DELAY } from './config';
import { tokenService } from './token-service';

export const sessionModel = atom(() => {
  const logOut = createEvent();

  const redirectToHome = createEvent();

  const checkTokenAndRedirect = createEvent();

  const refreshTokenStarted = createEvent<string>();

  const startRefreshTokenWithInterval = createEvent();

  const loginWithGoogle = createEvent<{ code: string }>();

  const $hasAccessToken = createStore(false);

  const $isLogged = createStore(false);

  const $pending = createStore(false);

  const $session = sessionQuery.$data;

  const ProfilePageGate = createGate();

  const $isRefreshed = refreshQuery.$finished;

  sample({
    clock: $isRefreshed,
    source: ProfilePageGate.open,
    target: sessionQuery.start,
  });

  sample({
    clock: [
      refreshQuery.finished.success,
      signInQuery.finished.success,
      signUpQuery.finished.success,
      googleLoginQuery.finished.success,
    ],
    fn: ({ result }) => tokenService.setTokens(result),
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
    target: refreshQuery.start,
  });

  sample({
    clock: AppGate.open,
    fn: tokenService.hasAccessToken,
    target: [$hasAccessToken, $isLogged],
  });

  sample({
    clock: sessionQuery.finished.failure,
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
    target: googleLoginQuery.start,
  });

  sample({
    clock: logOut,
    target: sessionQuery.reset,
  });

  $isLogged.on(
    [
      signInQuery.finished.success,
      googleLoginQuery.finished.success,
      signUpQuery.finished.success,
      refreshQuery.finished.success,
      sessionQuery.finished.success,
    ],
    () => true,
  );

  $pending.on([signInQuery.$pending, signUpQuery.$pending], () => true);

  $isLogged.reset(logOut);

  refreshQuery.finished.failure.watch(() => logOut());

  return {
    $session,
    $isLogged,
    $isRefreshed,
    $pending,
    loginWithGoogle,
    logOut,
    ProfilePageGate,
  };
});
