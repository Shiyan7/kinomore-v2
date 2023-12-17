import { createStore, createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { and, not, or } from 'patronum';
import { isClient } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import {
  sessionQuery,
  googleLoginQuery,
  refreshQuery,
  signInQuery,
  signUpQuery,
} from './api';
import { REFRESH_DELAY } from './config';
import { tokenService } from './token-service';

export const sessionModel = atom(() => {
  const logOut = createEvent();

  const redirectToHome = createEvent();

  const checkTokenAndRedirect = createEvent();

  const startRefreshTokenWithInterval = createEvent();

  const loginWithGoogle = createEvent<{ code: string }>();

  const $hasAccessToken = createStore(false);

  const $isLogged = createStore(false);

  const $pending = or(signInQuery.$pending, signUpQuery.$pending);

  const ProfilePageGate = createGate();

  const $session = sessionQuery.$data;

  const $isRefreshed = refreshQuery.$finished;

  sample({
    clock: and($isRefreshed, ProfilePageGate.status),
    filter: Boolean,
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
    clock: [navigationModel.$asPath, startRefreshTokenWithInterval],
    filter: tokenService.hasRefreshToken,
    fn: tokenService.getRefreshToken,
    target: refreshQuery.start,
  });

  sample({
    clock: navigationModel.$asPath,
    fn: tokenService.hasAccessToken,
    target: [$hasAccessToken, $isLogged],
  });

  sample({
    clock: sessionQuery.finished.failure,
    target: [logOut, redirectToHome],
  });

  sample({
    clock: navigationModel.$asPath,
    filter: (asPath) => asPath?.startsWith(paths.profile) ?? false,
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
    clock: refreshQuery.finished.failure,
    target: logOut,
  });

  sample({
    clock: logOut,
    fn: tokenService.deleteTokens,
    target: sessionQuery.reset,
  });

  sample({
    clock: [
      signInQuery.$succeeded,
      googleLoginQuery.$succeeded,
      signUpQuery.$succeeded,
      refreshQuery.$succeeded,
      sessionQuery.$succeeded,
    ],
    target: $isLogged,
  });

  $isLogged.reset(logOut);

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
