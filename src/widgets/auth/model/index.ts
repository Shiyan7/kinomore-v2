import { combine, createEvent, createStore, sample, forward, attach } from 'effector';
import { delay, not } from 'patronum';
import { object, string } from 'yup';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';
import { createForm } from 'shared/form';
import { atom } from 'shared/lib/atom';
import { createToggler } from 'shared/lib/toggler';
import { navigationModel } from 'shared/navigation';
import { paths } from 'shared/routing';

export const authModel = atom(() => {
  const toggler = createToggler();

  const emailForm = createForm({
    initialValues: {
      email: '',
    },
    schema: object({
      email: string().email().required(),
    }),
  });

  const passwordForm = createForm({
    initialValues: {
      password: '',
    },
    schema: object({
      password: string().min(6).required(),
    }),
  });

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

  const $isNewUser = createStore(false);

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

  const formValue = combine(emailForm.$values, passwordForm.$values, ({ email }, { password }) => ({
    email,
    password,
  }));

  sample({
    clock: passwordForm.submitted,
    source: formValue,
    filter: $isNewUser,
    target: sessionModel.signUpFx,
  });

  sample({
    clock: passwordForm.submitted,
    source: formValue,
    filter: not($isNewUser),
    target: sessionModel.signInFx,
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

  return {
    toggler,
    emailForm,
    passwordForm,
    editClicked,
    continueClicked,
    authSuccess,
    $progress,
    $state,
    checkUserFx,
    $isNewUser,
  };
});
