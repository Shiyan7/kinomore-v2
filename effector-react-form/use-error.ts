import { useStore, useStoreMap } from 'effector-react/scope';
import { ErrorsInline, FieldsInline, FieldState, FormState, Message, UseErrorParams, UseErrorResult } from './ts';
import { getIn } from './utils/object-manager';
import { initialFieldState } from './default-states';

const useError = <Values extends object>({ name, form }: UseErrorParams<Values>): UseErrorResult => {
  const { $values, $fieldsInline, $errorsInline, $outerErrorsInline, $form } = form;

  const value = useStoreMap<Values, any, [string]>({
    store: $values,
    keys: [name],
    fn: (values, [field]) => getIn(values, field) || null,
  });

  const innerError = useStoreMap<ErrorsInline, Message, [string]>({
    store: $errorsInline,
    keys: [name],
    fn: (errorsInline, [field]) => errorsInline[field] || null,
  });
  const outerError = useStoreMap<ErrorsInline, Message, [string]>({
    store: $outerErrorsInline,
    keys: [name],
    fn: (outerErrorsInline, [field]) => outerErrorsInline[field] || null,
  });
  const error = innerError || outerError;

  const fieldState = useStoreMap<FieldsInline, FieldState, [string]>({
    store: $fieldsInline,
    keys: [name],
    fn: (fieldsInline, [field]) => fieldsInline[field] || initialFieldState,
  });

  const formSubmitted = useStoreMap<FormState, boolean, []>({
    store: $form,
    keys: [],
    fn: (formState) => formState.submitted,
  });
  const formHasError = useStoreMap<FormState, boolean, []>({
    store: $form,
    keys: [],
    fn: (formState) => formState.hasError,
  });
  const formHasOuterError = useStoreMap<FormState, boolean, []>({
    store: $form,
    keys: [],
    fn: (formState) => formState.hasOuterError,
  });
  const formState: FormState = {
    submitted: formSubmitted,
    hasError: formHasError,
    hasOuterError: formHasOuterError,
  };
  const meta = useStore(form.$meta);

  const isShowInnerError = (formState.submitted || fieldState.blurred) && Boolean(innerError);
  const isShowOuterError = !fieldState.changedAfterOuterError && Boolean(outerError);
  const isShowError = isShowInnerError || isShowOuterError;

  return {
    inputValue: value,
    form: formState,
    meta,
    fieldState,
    error,
    innerError,
    outerError,
    isShowError,
    isShowOuterError,
    isShowInnerError,
  };
};

export default useError;
