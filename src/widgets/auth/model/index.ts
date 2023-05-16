import { combine, createEvent, createStore, sample, forward, attach } from 'effector';
import { delay, not } from 'patronum';
import { string } from 'yup';
import { sessionModel } from 'entities/session';
import { navigationModel } from 'entities/navigation';
import { createForm } from 'shared/lib/effector-react-form';
import { createObjectValidator } from 'shared/form';
import { createToggler } from 'shared/lib/toggler';
import { internalApi } from 'shared/api';
import { paths } from 'shared/routing';

export const toggler = createToggler();

export const emailForm = createForm({
  initialValues: {
    email: '',
  },
  validate: createObjectValidator({
    email: string().email().required(),
  }),
});

export const passwordForm = createForm({
  initialValues: {
    password: '',
  },
  validate: createObjectValidator({
    password: string().min(6).required(),
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
  clock: emailForm.onSubmit,
  fn: ({ values }) => values,
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

const formValue = combine(emailForm.$values, passwordForm.$values, ({ email }, { password }) => {
  return { email, password };
});

sample({
  clock: passwordForm.onSubmit,
  source: formValue,
  filter: not($isNewUser),
  target: sessionModel.signInFx,
});

sample({
  clock: passwordForm.onSubmit,
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
