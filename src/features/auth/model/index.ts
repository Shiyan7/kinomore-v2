import { attach, combine, createEvent, createStore, sample } from 'effector';
import { not } from 'patronum/not';
import { string } from 'yup';
import { createForm } from 'shared/lib/effector-react-form';
import { createObjectValidator } from 'shared/form';
import { createToggler } from 'shared/lib/toggler';
import { internalApi } from 'shared/api';

export const authWindowToggler = createToggler();

export const loginWithGoogle = createEvent<string>();

export const googleLoginFx = attach({ effect: internalApi.googleLogin });
export const loginFx = attach({ effect: internalApi.login });
export const registerFx = attach({ effect: internalApi.register });

sample({
  clock: loginWithGoogle,
  fn: (token) => token,
  target: googleLoginFx,
});

sample({
  clock: googleLoginFx.doneData,
  fn: (some) => console.log(some),
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

sample({
  clock: checkUserFx.doneData,
  target: continueClicked,
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
