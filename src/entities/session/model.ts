import { createStore, attach, createEvent, sample, restore } from 'effector';
import { createGate } from 'effector-react';
import { not } from 'patronum';
import { internalApi } from 'shared/api';
import { AppGate } from 'shared/config';
import { atom } from 'shared/factory';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import { tokenService } from './token-service';

export const sessionModel = atom(() => {
  const getMeFx = attach({ effect: internalApi.getMe });
  const signInFx = attach({ effect: internalApi.signIn });
  const signUpFx = attach({ effect: internalApi.signUp });
  const refreshFx = attach({ effect: internalApi.refresh });

  const ProfileGate = createGate();

  const logOut = createEvent();

  const startRefresh = createEvent<string>();

  const checkTokenAndRedirect = createEvent();

  const triggeredHome = createEvent();

  const $hasAccessToken = createStore(false);

  const $isRefreshed = refreshFx.done;

  const $isLogged = createStore(false)
    .on([signInFx.doneData, signUpFx.doneData, refreshFx.doneData, getMeFx.doneData], () => true)
    .reset(logOut);

  const $pending = createStore(false).on([signInFx.pending, signUpFx.pending], (_, payload) => payload);

  const $session = restore(getMeFx, null);

  $session.reset(logOut);

  sample({
    clock: $isRefreshed,
    source: ProfileGate.open,
    target: getMeFx,
  });

  sample({
    clock: AppGate.open,
    fn: tokenService.getRefreshToken,
    target: startRefresh,
  });

  sample({
    clock: AppGate.open,
    fn: tokenService.hasAccessToken,
    target: [$hasAccessToken, $isLogged],
  });

  sample({
    clock: startRefresh,
    filter: tokenService.hasRefreshToken,
    target: refreshFx,
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
    filter: (router) => Boolean(router?.asPath.startsWith(paths.profile)),
    target: checkTokenAndRedirect,
  });

  sample({
    clock: getMeFx.failData,
    target: [logOut, triggeredHome],
  });

  sample({
    clock: checkTokenAndRedirect,
    filter: not($hasAccessToken),
    target: triggeredHome,
  });

  sample({
    clock: triggeredHome,
    fn: () => paths.home,
    target: navigationModel.pushFx,
  });

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
