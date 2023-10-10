import { createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

interface CreateFormParams {
  initialValue: string;
  validation: (email: string) => boolean;
}

export const createForm = ({ initialValue, validation }: CreateFormParams) => {
  const $value = createStore(initialValue);

  const successFullySubmitted = createEvent();

  const $isError = createStore(false);

  const $isDirty = createStore(false);

  const submitForm = createEvent();

  const changedEvent = createEvent<string>();

  const reseted = createEvent();

  $value.on(changedEvent, (_, payload) => payload);

  function checkValidation(value: string) {
    const isMatchValidation = validation(value);
    const isError = !isMatchValidation;

    return isError;
  }

  sample({
    clock: submitForm,
    source: $value,
    filter: validation,
    target: successFullySubmitted,
  });

  sample({
    clock: changedEvent,
    filter: $isDirty,
    fn: checkValidation,
    target: $isError,
  });

  sample({
    clock: submitForm,
    source: $value,
    fn: checkValidation,
    target: $isError,
  });

  sample({
    clock: submitForm,
    source: $value,
    fn: () => true,
    target: $isDirty,
  });

  reset({
    clock: reseted,
    target: $value,
  });

  return {
    $value,
    submitted: successFullySubmitted,
    changed: changedEvent,
    submit: submitForm,
    $isError,
    reset: reseted,
  };
};
