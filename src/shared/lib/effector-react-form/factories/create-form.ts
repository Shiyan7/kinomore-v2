// @ts-nocheck

import {
  combine,
  createEvent as createEventNative,
  createStore as createStoreNative,
  forward,
  guard,
  is,
  sample,
  Store,
} from 'effector';
import { SyntheticEvent } from 'react';
import {
  CreateFormParams,
  ErrorsInline,
  FieldInitParams,
  FieldsInline,
  FieldState,
  Form,
  FormState,
  ResetOuterErrorParams,
  SetFieldStateParams,
  SetOrDeleteErrorParams,
  SetOrDeleteOuterErrorParams,
  SetValueParams,
  SetValuesParams,
  SubmitParams,
} from '../ts';
import { initialFieldState, initialFormState } from '../default-states';
import { getValue } from '../utils/dom-helper';
import {
  deleteIn,
  getIn,
  GetName,
  getName,
  getNameStr,
  GetNameStr,
  makeConsistentKey,
  setIn,
} from '../utils/object-manager';

const createForm = <Values extends object = any, Meta = any>({
  validate,
  mapSubmit = (params) => params,
  onSubmit: onSubmitArg,
  onSubmitGuardFn = ({ form }) => !form.hasError,
  onChange: onChangeArg,
  onChangeGuardFn = ({ form }) => !form.hasError,
  initialValues,
  initialMeta = {} as any,
  domain,
  resetOuterErrorsBySubmit = true,
  resetOuterErrorByOnChange = true,
}: CreateFormParams<Values, Values, Meta> = {}, {sid, name} = {}): Form<Values> => {
  const createEvent = domain ? domain.createEvent : createEventNative;
  const createStore = domain ? domain.createStore : createStoreNative;

  const created = createEvent({
    name: `Form_${name}_Created`,
    sid: `Form_${name}_Created` + sid
  });

  const setMeta = createEvent<Meta>({
    name: `Form_${name}_SetMeta`,
    sid: `Form_${name}_SetMeta` + sid
  });

  const setValue = createEvent<SetValueParams>({
    name: `Form_${name}_SetValue`,
    sid: `Form_${name}_SetValue` + sid
  });
  const setValues = createEvent<SetValuesParams<Values>>({
    name: `Form_${name}_SetValues`,
    sid: `Form_${name}_SetValues` + sid
  });
  const setOrDeleteError = createEvent<SetOrDeleteErrorParams>({
    name: `Form_${name}_SetOrDeleteError`,
    sid: `Form_${name}_SetOrDeleteError` + sid
  });
  const setErrorsInlineState = createEvent<ErrorsInline>({
    name: `Form_${name}_SetErrorsInlineState`,
    sid: `Form_${name}_SetErrorsInlineState` + sid,
  });
  const setFieldState = createEvent<SetFieldStateParams>({
    name: `Form_${name}_SetFieldState`,
    sid: `Form_${name}_SetFieldState` + sid,
  });
  const setSubmitted = createEvent<boolean>({
    name: `Form_${name}_SetSubmitted`,
    sid: `Form_${name}_SetSubmitted` + sid,
  });
  const resetOuterFieldStateFlags = createEvent({
    name: `Form_${name}_ResetOuterFieldStateFlags`,
    sid: `Form_${name}_ResetOuterFieldStateFlags` + sid,
  });
  const resetOuterErrors = createEvent({
    name: `Form_${name}_ResetOuterErrors`,
    sid: `Form_${name}_ResetOuterErrors` + sid
  });
  const resetOuterError = createEvent<ResetOuterErrorParams>({
    name: `Form_${name}_ResetOuterError`,
    sid: `Form_${name}_ResetOuterError` + sid
  });
  const setOrDeleteOuterError = createEvent<SetOrDeleteOuterErrorParams>({
    name: `Form_${name}_SetOrDeleteOuterError`,
    sid: `Form_${name}_SetOrDeleteOuterError` + sid
  });
  const reset = createEvent({
    name: `Form_${name}_Reset`,
    sid: `Form_${name}_Reset` + sid
  });

  const setOuterErrorsInlineState = createEvent<ErrorsInline>({
    name: `Form_${name}_SetOuterErrorsInlineState`,
    sid: `Form_${name}_SetOuterErrorsInlineState` + sid,
  });
  const validateForm = createEvent({
    name: `Form_${name}_ValidateForm`,
    sid: `Form_${name}_ValidateForm` + sid,
  });
  const submit = createEvent({
    name: `Form_${name}_Submit`,
    sid: `Form_${name}_Submit` + sid
  });
  const onSubmit = createEvent<SubmitParams<Values, Meta>>({
    name: `Form_${name}_OnSubmit`,
    sid: `Form_${name}_OnSubmit` + sid,
  });
  const onChange = createEvent<SubmitParams<Values, Meta>>({
    name: `Form_${name}_OnChange`,
    sid: `Form_${name}_OnChange` + sid,
  });

  const $initialValues = is.store(initialValues) ? initialValues as Store<Values> : createStore<Values>((initialValues ?? null) as Values, { 
    name: `Form_${name}_$initialValues`,
    sid: `Form_${name}_$initialValues` + sid
  });

  const $values = createStore<Values>($initialValues.getState() ?? {} as Values, { 
    name: `Form_${name}_$values`,
    sid: `Form_${name}_$values` + sid
  });
    
  const $errorsInline = createStore<ErrorsInline>({}, { 
    name: `Form_${name}_$errorsInline`,
    sid: `Form_${name}_$errorsInline` + sid
  });
    
  const $outerErrorsInline = createStore<ErrorsInline>({}, { 
    name: `Form_${name}_$outerErrorsInline`,
    sid: `Form_${name}_$outerErrorsInline` + sid
  });
    
  const $fieldsInline = createStore<FieldsInline>({}, { 
    name: `Form_${name}_$fieldsInline`,
    sid: `Form_${name}_$fieldsInline` + sid
  });
    
  const $fieldsInlineInitData = createStore({}, { 
    name: `Form_${name}_$fieldsInlineInitData`,
    sid: `Form_${name}_$fieldsInlineInitData` + sid
  });
    
  const $form = createStore<FormState>(initialFormState, { 
    name: `Form_${name}_$form`,
    sid: `Form_${name}_$form` + sid
  });
    
  const $meta = createStore<Meta>(initialMeta, { 
    name: `Form_${name}_$meta`,
    sid: `Form_${name}_$meta` + sid
  });
    

  const $allFormState = combine({
    values: $values,
    errorsInline: $errorsInline,
    outerErrorsInline: $outerErrorsInline,
    fieldsInline: $fieldsInline,
    form: $form,
    meta: $meta,
  });

  const onChangeFieldBrowser = createEvent<{ event: SyntheticEvent; name: string; flat?: boolean }>(
    {
      name: `Form_${name}_OnChange`,
      sid: `Form_${name}_OnChange` + sid,
    }
  );
  const onChangeField = onChangeFieldBrowser.map<{ value: any; name: string; flat?: boolean }>(
    ({ name, event, flat }) => ({
      value: getValue(event),
      name,
      flat,
    }),
  );
  const onFocusFieldBrowser = createEvent<{ event: SyntheticEvent; name: string }>({
    name: `Form_${name}_OnFocus`,
    sid: `Form_${name}_OnFocus` + sid,
  });
  const onBlurFieldBrowser = createEvent<{ event: SyntheticEvent; name: string }>({
    name: `Form_${name}_OnBlur`,
    sid: `Form_${name}_OnBlur` + sid,
  });
  const fieldInit = createEvent<FieldInitParams>({
    name: `Form_${name}_fieldInit`,
    sid: `Form_${name}_fieldInit` + sid
  });

  const validateByValues = ({ values, fieldsInline, ...rest }: SubmitParams) => {
    const errorsInlineState = {};

    Object.entries<FieldState>(fieldsInline).forEach(([name, { validate }]) => {
      const error = validate && validate(getIn(values, name));
      if (error) {
        errorsInlineState[name] = validate && validate(getIn(values, name));
      }
    });

    if (validate) {
      const formLevelErrorsInlineState = validate({ ...rest, values, errorsInline: errorsInlineState, fieldsInline });
      Object.entries(formLevelErrorsInlineState).forEach(([name, error]) => {
        if (error) {
          errorsInlineState[name] = error;
        } else {
          delete errorsInlineState[name];
        }
      });
    }

    return errorsInlineState;
  };

  if (resetOuterErrorByOnChange) {
    sample({
      source: onChangeField,
      fn: ({ name }) => name,
      target: resetOuterError,
    });
  }

  forward({
    from: submit,
    to: [validateForm, resetOuterFieldStateFlags],
  });

  if (resetOuterErrorsBySubmit) {
    forward({
      from: submit,
      to: resetOuterErrors,
    });
  }

  sample({
    source: resetOuterErrors,
    fn: () => ({}),
    target: $outerErrorsInline,
  });

  sample({
    source: $allFormState,
    clock: validateForm,
    fn: (params) => validateByValues(params),
    target: $errorsInline,
  });

  // TODO: skip updates from initialValues
  sample({
    clock: $values,
    source: $allFormState,
    fn: (params) => validateByValues(params),
    target: $errorsInline,
  });

  sample({
    source: $allFormState,
    clock: guard({
      source: submit,
      filter: $allFormState.map(onSubmitGuardFn),
    }),
    fn: mapSubmit,
    target: onSubmit,
  });

  sample({
    source: $allFormState,
    clock: guard({
      source: onChangeFieldBrowser,
      filter: $allFormState.map(onChangeGuardFn),
    }),
    fn: mapSubmit,
    target: onChange,
  });

  if (onSubmitArg) {
    if (is.effect(onSubmitArg) || is.event(onSubmitArg)) {
      forward({
        from: onSubmit,
        to: onSubmitArg,
      });
    } else if (typeof onSubmitArg === 'function') {
      onSubmit.watch(onSubmitArg);
    }
  }

  if (onChangeArg) {
    if (is.effect(onChangeArg) || is.event(onChangeArg)) {
      forward({
        from: onChange,
        to: onChangeArg,
      });
    } else if (typeof onChangeArg === 'function') {
      onChange.watch(onChangeArg);
    }
  }

  

  $values
    .on(setValue, (state, { field, value }) => setIn(state, field, value))
    .on(setValues, (_, values) => values)
    .on(onChangeField, (state, { value, name, flat }) =>
      flat ? { ...state, [name]: value } : setIn(state, name, value),
    )
    .reset(reset);

  sample({
    clock: $initialValues,
    target: setValues,
  });


  $errorsInline
    .on(setOrDeleteError, (state, { field, error }) =>
      error ? { ...state, [makeConsistentKey(field)]: error } : deleteIn(state, field, false, false),
    )
    .on(setErrorsInlineState, (_, errorsInline) => errorsInline)
    .reset(reset);

  $outerErrorsInline
    .on(setOrDeleteOuterError, (state, { field, error }) =>
      error ? { ...state, [makeConsistentKey(field)]: error } : deleteIn(state, field, false, false),
    )
    .on(setOuterErrorsInlineState, (_, errorsInline) => errorsInline)
    .on(resetOuterError, (errors, field) => deleteIn(errors, field, false, false))
    .reset(reset);

  $fieldsInline
    .on(setOrDeleteOuterError, (state, { field }) => ({
      ...state,
      [makeConsistentKey(field)]: {
        ...state[makeConsistentKey(field)],
        touchedAfterOuterError: false,
        changedAfterOuterError: false,
        blurredAfterOuterError: false,
      },
    }))
    .on(resetOuterFieldStateFlags, (state) => {
      const newState = {};
      Object.entries<FieldState>(state).forEach(
        ([field, state]) =>
          (newState[field] = {
            ...state,
            touchedAfterOuterError: false,
            changedAfterOuterError: false,
            blurredAfterOuterError: false,
          }),
      );
      return newState;
    })
    .on(setFieldState, (state, { field, state: fieldState }) => {
      return { ...state, [makeConsistentKey(field)]: fieldState };
    })
    .on(fieldInit, (state, { name, validate, flat }) =>
      state[flat ? name : makeConsistentKey(name)]
        ? {
            ...state,
            [flat ? name : makeConsistentKey(name)]: {
              ...state[flat ? name : makeConsistentKey(name)],
              ...initialFieldState,
              validate,
            },
          }
        : { ...state, [flat ? name : makeConsistentKey(name)]: { ...initialFieldState, validate } },
    );

  $fieldsInlineInitData.on(fieldInit, (state, { name, validate, flat }) =>
    state[flat ? name : makeConsistentKey(name)]
      ? {
          ...state,
          [flat ? name : makeConsistentKey(name)]: {
            ...state[flat ? name : makeConsistentKey(name)],
            ...initialFieldState,
            validate,
          },
        }
      : { ...state, [flat ? name : makeConsistentKey(name)]: { ...initialFieldState, validate } },
  );

  sample({
    source: $fieldsInlineInitData,
    clock: reset,
    target: $fieldsInline,
  });

  $form
    .on($outerErrorsInline.updates, (state, outerErrors) =>
      setIn(state, 'hasOuterError', Boolean(Object.keys(outerErrors).length)),
    )
    .on(submit, (state) => setIn(state, 'submitted', true))
    .on(setSubmitted, (state, value) => setIn(state, 'submitted', value))
    .on($errorsInline.updates, (state, errorsInline) =>
      setIn(state, 'hasError', Boolean(Object.keys(errorsInline).length)),
    )
    .reset(reset);

  $meta.on(setMeta, (state, meta) => meta || state).reset(reset);

  /// Field {

  sample({
    source: {
      fieldsInline: $fieldsInline,
      outerErrorsInline: $outerErrorsInline,
    },
    clock: onFocusFieldBrowser,
    fn: ({ fieldsInline, outerErrorsInline }, { name }) => ({
      ...fieldsInline,
      [name]: {
        ...fieldsInline[name],
        active: true,
        touched: true,
        touchedAfterOuterError: Boolean(outerErrorsInline[name]),
      },
    }),
    target: $fieldsInline,
  });
  sample({
    source: {
      fieldsInline: $fieldsInline,
      outerErrorsInline: $outerErrorsInline,
    },
    clock: onChangeFieldBrowser,
    fn: ({ fieldsInline, outerErrorsInline }, { name }) => ({
      ...fieldsInline,
      [name]: {
        ...fieldsInline[name],
        changed: true,
        changedAfterOuterError: Boolean(outerErrorsInline[name]),
      },
    }),
    target: $fieldsInline,
  });
  sample({
    source: {
      fieldsInline: $fieldsInline,
      outerErrorsInline: $outerErrorsInline,
    },
    clock: onBlurFieldBrowser,
    fn: ({ fieldsInline, outerErrorsInline }, { name }) => ({
      ...fieldsInline,
      [name]: {
        ...fieldsInline[name],
        active: false,
        blurred: true,
        blurredAfterOuterError: Boolean(outerErrorsInline[name]),
      },
    }),
    target: $fieldsInline,
  });

  created();
  // debug({created, $values });

  /// }

  return {
    created,
    setValue,
    setValues,
    setOrDeleteError,
    setErrorsInlineState,
    setFieldState,
    setSubmitted,
    resetOuterFieldStateFlags,
    resetOuterErrors,
    setOrDeleteOuterError,
    setOuterErrorsInlineState,
    validateForm,
    submit,
    reset,
    onSubmit,

    setMeta,

    $values,
    $errorsInline,
    $outerErrorsInline,
    $fieldsInline,
    $form,
    $meta,
    $allFormState,

    onChangeFieldBrowser,
    onFocusFieldBrowser,
    onBlurFieldBrowser,
    fieldInit,

    getName: getName as GetName<Values>,
    getNameStr: getNameStr as GetNameStr<Values>,

    name,
  };
};

export {createForm}

export default createForm;
