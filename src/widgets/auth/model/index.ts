import { createEvent, createStore, sample, attach } from 'effector';
import { delay, not } from 'patronum';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

export const authModel = atom(() => {
  const toggler = createToggler();

  const $email = createStore('');
  const $password = createStore('');

  const emailChanged = createEvent<string>();
  const passwordChanged = createEvent<string>();

  const emailFormSubmitted = createEvent();
  const passwordFormSubmitted = createEvent();

  $email.on(emailChanged, (_, payload) => payload);
  $password.on(passwordChanged, (_, payload) => payload);

  const editClicked = createEvent();
  const continueClicked = createEvent();
  const authSuccess = createEvent();

  const $progress = createStore(5)
    .on(editClicked, () => 5)
    .on(continueClicked, () => 50)
    .on(authSuccess, () => 100);

  const $state = createStore<'email' | 'password' | 'authorized'>('email')
    .on(editClicked, () => 'email')
    .on(continueClicked, () => 'password')
    .on(authSuccess, () => 'authorized');

  const checkUserFx = attach({ effect: internalApi.checkUser });

  const $checkUserPending = checkUserFx.pending;

  const $isNewUser = createStore(false);

  const formValue = { email: $email, password: $password };

  sample({
    clock: emailFormSubmitted,
    source: $email,
    target: checkUserFx,
  });

  sample({
    clock: checkUserFx.doneData,
    fn: ({ isNewUser }) => isNewUser,
    target: $isNewUser,
  });

  sample({
    clock: checkUserFx.doneData,
    target: continueClicked,
  });

  sample({
    clock: passwordFormSubmitted,
    source: formValue,
    filter: $isNewUser,
    target: sessionModel.signUpFx,
  });

  sample({
    clock: passwordFormSubmitted,
    source: formValue,
    filter: not($isNewUser),
    target: sessionModel.signInFx,
  });

  const redirectToProfile = createEvent();

  sample({
    clock: [sessionModel.signInFx.doneData, sessionModel.signUpFx.doneData],
    target: [authSuccess, redirectToProfile],
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

  return {
    toggler,
    $email,
    $password,
    emailChanged,
    passwordChanged,
    emailFormSubmitted,
    passwordFormSubmitted,
    editClicked,
    $progress,
    $state,
    $checkUserPending,
    $isNewUser,
  };
});
