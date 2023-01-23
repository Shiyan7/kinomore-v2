import { attach, combine, createEvent, createStore, sample, forward } from 'effector';
import { setCookie, deleteCookie } from 'cookies-next';
import { not } from 'patronum/not';
import { string } from 'yup';
import { createForm } from 'shared/lib/effector-react-form';
import { createObjectValidator } from 'shared/form';
import { createToggler } from 'shared/lib/toggler';
import { internalApi, type User } from 'shared/api';
import { localStorageKeys } from 'shared/config';

export const authWindowToggler = createToggler();
export const googleLogin = createEvent<string>();
export const startRefresh = createEvent();
export const startLogout = createEvent();

export const googleLoginFx = attach({ effect: internalApi.googleLogin });
export const loginFx = attach({ effect: internalApi.login });
export const registerFx = attach({ effect: internalApi.register });
export const logoutFx = attach({ effect: internalApi.logout });
export const refreshFx = attach({ effect: internalApi.refresh });

export const $user = createStore<User | null>(null);
export const $isAuth = $user.map((user) => !!user);

forward({
  from: googleLogin,
  to: googleLoginFx,
});

export const checkUserFx = attach({ effect: internalApi.checkUser });

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

export const $progress = createStore(5)
  .on(continueClicked, () => 50)
  .on(editClicked, () => 5);

export const $state = createStore<'email' | 'password'>('email')
  .on(continueClicked, () => 'password')
  .on(editClicked, () => 'email');

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
  target: loginFx,
});

sample({
  clock: passwordForm.onSubmit,
  source: formValue,
  filter: $isNewUser,
  fn: (value) => value,
  target: registerFx,
});

sample({
  clock: [googleLoginFx.doneData, loginFx.doneData, registerFx.doneData, refreshFx.doneData],
  fn: ({ accessToken, user }) => {
    setCookie(localStorageKeys.ACCESS_TOKEN, accessToken);
    return user;
  },
  target: $user,
});

sample({
  clock: logoutFx.doneData,
  fn: () => deleteCookie(localStorageKeys.ACCESS_TOKEN),
});

sample({
  clock: logoutFx.doneData,
  fn: () => null,
  target: $user,
});

forward({ from: startLogout, to: logoutFx });

forward({
  from: startRefresh,
  to: refreshFx,
});
