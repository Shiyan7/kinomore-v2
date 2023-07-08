import { combine, createEvent, createStore, sample, forward, attach } from 'effector';
import { delay, not } from 'patronum';
import { object, string } from 'zod';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';
import { createForm } from 'shared/form';
import { createToggler } from 'shared/lib/toggler';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

export const toggler = createToggler();

export const emailForm = createForm({
  initialValues: {
    email: '',
  },
  schema: object({
    email: string().email(),
  }),
});

export const passwordForm = createForm({
  initialValues: {
    password: '',
  },
  schema: object({
    password: string().min(6),
  }),
});

export const editClicked = createEvent();
export const continueClicked = createEvent();
export const authSuccess = createEvent();

export const $progress = createStore(5)
  .on(editClicked, () => 5)
  .on(continueClicked, () => 50)
  .on(authSuccess, () => 100);

export const $state = createStore<'email' | 'password' | 'authorized'>('email')
  .on(editClicked, () => 'email')
  .on(continueClicked, () => 'password')
  .on(authSuccess, () => 'authorized');

export const checkUserFx = attach({ effect: internalApi.checkUser });

export const $isNewUser = createStore(false);

sample({
  clock: emailForm.submitted,
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

const formValue = combine(emailForm.$values, passwordForm.$values, ({ email }, { password }) => ({ email, password }));

sample({
  clock: passwordForm.submitted,
  source: formValue,
  filter: not($isNewUser),
  target: sessionModel.signInFx,
});

sample({
  clock: passwordForm.submitted,
  source: formValue,
  filter: $isNewUser,
  target: sessionModel.signUpFx,
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
