import { attach, combine, createEvent, createStore, sample } from "effector";
import { not } from "patronum";
import { string } from "yup";
import { createForm } from "shared/lib/effector-react-form";
import { createObjectValidator } from "shared/form";
import { createToggler } from "shared/lib/toggler";
import { internalApi } from "shared/api";

export const authInstance = createToggler();

export const checkUserFx = attach({ effect: internalApi.check });

export const emailForm = createForm({
  initialValues: {
    email: "",
  },
  validate: createObjectValidator({
    email: string().email().required(),
  }),
});

export const passwordForm = createForm({
  initialValues: {
    password: "",
  },
  validate: createObjectValidator({
    password: string().min(6).required(),
  }),
});

export const editClicked = createEvent();
export const continueClicked = createEvent();

export const $progress = createStore(5);

$progress.on(continueClicked, () => 50);
$progress.on(editClicked, () => 5);

export const $state = createStore<"email" | "password">("email");

$state.on(continueClicked, () => "password");
$state.on(editClicked, () => "email");

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
  fn: (value) => console.log("login", value),
});

sample({
  clock: passwordForm.onSubmit,
  source: formValue,
  filter: $isNewUser,
  fn: (value) => console.log("register", value),
});
