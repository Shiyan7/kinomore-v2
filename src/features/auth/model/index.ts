import { createEffect, createEvent, createStore } from "effector";
import { string } from "yup";
import { createForm } from "effector-react-form";
import { createObjectValidator } from "shared/form";
import { createToggler } from "shared/lib/toggler";

export const authInstance = createToggler();

export const setEmail = createEvent<string>();
export const $emailStore = createStore("").on(setEmail, (_, payload) => payload);

export const setInputValue = createEvent<string>();
export const $inputValue = createStore("").on(setInputValue, (_, payload) => payload);

export const setProgress = createEvent<number>();
export const $progressStore = createStore(5).on(setProgress, (_, payload) => payload);

export const setIsNewUser = createEvent<boolean>();
export const $isNewUser = createStore(false).on(setIsNewUser, (_, payload) => payload);

export const setIsEmailState = createEvent<boolean>();
export const $isEmailState = createStore(true).on(setIsEmailState, (_, payload) => payload);

interface FormEmail {
  email: string;
}

const loginFx = createEffect((values: FormEmail) => {
  console.log(values);
});

export const emailForm = createForm<FormEmail>({
  initialValues: {
    email: "",
  },
  onSubmit: ({ values }) => loginFx(values),
  validate: createObjectValidator({
    email: string().email().required(),
  }),
});
