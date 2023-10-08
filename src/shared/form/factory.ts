import { createLib, ValidationVisibilityCondition, type CreateFormParams } from '@filledout/core';
import { applyYup, type ApplyYupParams } from '@filledout/yup';
import { createLib as createReactLib } from 'shared/lib/filledout';

// here we initialize core lib
const lib = createLib({
  showValidationOn: [ValidationVisibilityCondition.Submitted, ValidationVisibilityCondition.Touched],
});

// here we can modify base form model however we want and in our case we just add yup validator
const createForm = <V>(params: CreateFormParams<V> & ApplyYupParams<V>) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,

    ...applyYup($$form, params),
  };
};

// initialize react bindings library
const { useField, useForm } = createReactLib({ validateOnUseForm: true });

// and all(some) of this we will use across our project
export { createForm, useField, useForm };
