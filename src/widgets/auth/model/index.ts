import { createEvent, createStore, sample } from 'effector';
import { condition, delay } from 'patronum';
import { checkUserQuery, googleLoginQuery, signInQuery, signUpQuery } from 'entities/session';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

const REDIRECT_DELAY = 1700;

export const authModel = atom(() => {
  const toggler = createToggler();

  const $email = createStore('');

  const $password = createStore('');

  const $state = createStore<'email' | 'password' | 'authorized'>('email');

  const $progress = createStore<5 | 50 | 100>(5);

  const $isNewUser = createStore(false);

  const $checkUserPending = checkUserQuery.$pending;

  const emailChanged = createEvent<string>();

  const passwordChanged = createEvent<string>();

  const emailFormSubmitted = createEvent();

  const editClicked = createEvent();

  const continueClicked = createEvent();

  const authSuccess = createEvent();

  const redirectToProfile = createEvent();

  const passwordFormSubmitted = createEvent<{ email: string; password: string }>();

  $email.on(emailChanged, (_, payload) => payload);

  $password.on(passwordChanged, (_, payload) => payload);

  $progress
    .on(editClicked, () => 5)
    .on(continueClicked, () => 50)
    .on(authSuccess, () => 100);

  $state
    .on(editClicked, () => 'email')
    .on(continueClicked, () => 'password')
    .on(authSuccess, () => 'authorized');

  sample({
    clock: emailFormSubmitted,
    source: $email,
    target: checkUserQuery.start,
  });

  sample({
    clock: checkUserQuery.finished.success,
    fn: ({ result }) => result.isNewUser,
    target: $isNewUser,
  });

  sample({
    clock: checkUserQuery.finished.success,
    target: continueClicked,
  });

  condition({
    source: passwordFormSubmitted,
    if: $isNewUser,
    then: signUpQuery.start,
    else: signInQuery.start,
  });

  sample({
    clock: [signInQuery.finished.success, signUpQuery.finished.success],
    target: authSuccess,
  });

  delay({
    source: authSuccess,
    timeout: REDIRECT_DELAY,
    target: redirectToProfile,
  });

  sample({
    clock: [redirectToProfile, googleLoginQuery.finished.success],
    fn: () => paths.profile,
    target: [navigationModel.pushFx, toggler.close],
  });

  return {
    $email,
    $password,
    $progress,
    $state,
    $checkUserPending,
    $isNewUser,
    toggler,
    emailChanged,
    passwordChanged,
    emailFormSubmitted,
    passwordFormSubmitted,
    editClicked,
  };
});
