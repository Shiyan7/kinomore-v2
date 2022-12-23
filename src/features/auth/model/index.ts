import { attach, createEvent, createStore, sample } from "effector";
import { string } from "yup";
import { createForm } from "shared/lib/effector-react-form";
import { createObjectValidator } from "shared/form";
import { createToggler } from "shared/lib/toggler";
import { internalApi } from "shared/api";

export const authInstance = createToggler();

export const setEmail = createEvent<string>();
export const $emailStore = createStore("").on(setEmail, (_, payload) => payload);

export const setProgress = createEvent<number>();
export const $progressStore = createStore(5).on(setProgress, (_, payload) => payload);

export const setIsNewUser = createEvent<boolean>();
export const $isNewUser = createStore(false).on(setIsNewUser, (_, payload) => payload);

export const setIsEmailState = createEvent<boolean>();
export const $isEmailState = createStore(true).on(setIsEmailState, (_, payload) => payload);

export const checkUserFx = attach({ effect: internalApi.check });

export const editEmail = createEvent();

export const authForm = createForm({
  initialValues: {
    email: "",
    password: "",
  },
  validate: createObjectValidator({
    email: string().email().required(),
    password: string().min(6).required(),
  }),
});

sample({
  clock: authForm.onSubmit,
  fn: ({ values }) => console.log(values),
});

sample({
  clock: checkUserFx.doneData,
  fn: ({ status }) => status,
  target: setIsNewUser,
});

sample({
  clock: checkUserFx.doneData,
  fn: () => 50,
  target: setProgress,
});

sample({
  clock: checkUserFx.doneData,
  fn: () => false,
  target: setIsEmailState,
});

sample({
  clock: editEmail,
  fn: () => 5,
  target: setProgress,
});

sample({
  clock: editEmail,
  fn: () => true,
  target: setIsEmailState,
});
