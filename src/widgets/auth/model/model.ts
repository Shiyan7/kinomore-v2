import { createEvent, createStore, sample, forward, attach } from 'effector';
import { delay } from 'patronum';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';
import { createToggler } from 'shared/lib/toggler';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';
import { emailForm, passwordForm } from './form';

export const toggler = createToggler();

export const editClicked = createEvent();
const continueClicked = createEvent();
const authSuccess = createEvent();

export const $progress = createStore(5)
  .on(editClicked, () => 5)
  .on(continueClicked, () => 50)
  .on(authSuccess, () => 100);

export const $state = createStore<'email' | 'password' | 'authorized'>('email')
  .on(editClicked, () => 'email')
  .on(continueClicked, () => 'password')
  .on(authSuccess, () => 'authorized');

const checkUserFx = attach({ effect: internalApi.checkUser });

export const $checkUserPending = checkUserFx.pending;

export const $isNewUser = createStore(false);

const formValue = { email: emailForm.$value, password: passwordForm.$value };

sample({
  clock: emailForm.submitted,
  source: emailForm.$value,
  target: checkUserFx,
});

sample({
  clock: checkUserFx.doneData,
  fn: ({ status }) => status,
  target: $isNewUser,
});

forward({
  from: checkUserFx.doneData,
  to: continueClicked,
});

sample({
  clock: passwordForm.submitted,
  source: formValue,
  target: $isNewUser ? sessionModel.signInFx : sessionModel.signUpFx,
});

const redirectToProfile = createEvent();

forward({
  from: [sessionModel.signInFx.doneData, sessionModel.signUpFx.doneData],
  to: [authSuccess, redirectToProfile],
});

const REDIRECT_DELAY = 1700;

const routerChanged = createEvent();

delay({
  source: redirectToProfile,
  timeout: REDIRECT_DELAY,
  target: routerChanged,
});

sample({
  clock: routerChanged,
  fn: () => paths.profile,
  target: [navigationModel.pushFx, toggler.close],
});
