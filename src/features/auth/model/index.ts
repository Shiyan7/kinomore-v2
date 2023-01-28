import { combine, createEvent, createStore, sample, forward, attach } from 'effector';
import { delay, not } from 'patronum';
import { string } from 'yup';
import { sessionModel } from 'entities/session';
import { navigationModel } from 'entities/navigation';
import { createForm } from 'shared/lib/effector-react-form';
import { createObjectValidator } from 'shared/form';
import { createToggler } from 'shared/lib/toggler';
import { internalApi } from 'shared/api';
import { RoutesEnum } from 'shared/config';

export const authWindowToggler = createToggler();

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
  fn: ({ values }) => values.email,
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
  fn: (value) => value,
  target: sessionModel.loginFx,
});

sample({
  clock: passwordForm.onSubmit,
  source: formValue,
  filter: $isNewUser,
  fn: (value) => value,
  target: sessionModel.registerFx,
});

/* Вызываем эвент, который запустит редирект на страницу профиля */

const redirectToProfile = createEvent<string>();

forward({
  from: [sessionModel.loginFx.doneData, sessionModel.registerFx.doneData],
  to: authSuccess,
});

sample({
  clock: authSuccess,
  fn: () => RoutesEnum.Profile,
  target: redirectToProfile,
});

/* Пушим в урл страницу профиля через 1.5 сек когда все анимации закончились */

const REDIRECT_DELAY = 1500;

delay({
  source: redirectToProfile,
  timeout: REDIRECT_DELAY,
  target: navigationModel.push,
});
