import { CreateFormParams, createLib, ValidationVisibilityCondition } from '@filledout/core';
import { applyZod, ApplyZodParams } from '@filledout/zod';

const lib = createLib({
  showValidationOn: [ValidationVisibilityCondition.Submitted, ValidationVisibilityCondition.Touched],
});

const createForm = <V>(params: CreateFormParams<V> & ApplyZodParams<V>) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,

    ...applyZod($$form, params),
  };
};

export { createForm };
