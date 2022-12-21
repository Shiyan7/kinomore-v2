// @ts-nocheck
import { Store, Event, Domain } from 'effector';
import React from 'react';
import { GetName, GetNameStr } from './utils/object-manager';

export type AnyState = Record<string, any>;

export type ErrorsInline = Record<string, Message>;

export type FieldsInline = Record<string, FieldState>;

export type Message = string | null | undefined;

// export type Messages<Values> = {
//   [key in keyof Values]?: Values[key] extends AnyState ? Messages<Values[key]> : Message;
// };

export type SubmitParams<Values = any, Meta = any> = {
  values: Values;
  errorsInline: ErrorsInline;
  fieldsInline: FieldsInline;
  form: FormState;
  meta: Meta;
};

export type FormState = {
  submitted: boolean;
  hasError: boolean;
  hasOuterError: boolean;
};

export type FieldState = {
  _type: 'fieldMeta';
  active: boolean;
  touched: boolean;
  changed: boolean;
  blurred: boolean;
  touchedAfterOuterError: boolean;
  changedAfterOuterError: boolean;
  blurredAfterOuterError: boolean;
  validate?: (value: any) => string | undefined;
};

export type ControllerParams = {
  name: string | string[];
  flat?: boolean;
  validate?: (value: any) => Message;
};

export type SetValueParams = {
  field: string | string[];
  value: any;
};

export type SetValuesParams<Values> = Values;

export type SetOrDeleteErrorParams = {
  field: string | string[];
  error?: Message;
};

export type SetFieldStateParams = {
  field: string | string[];
  state: FieldState;
};

export type SetOrDeleteOuterErrorParams = {
  field: string | string[];
  error: Message;
};

export type ResetOuterErrorParams = string | string[];

export type FieldInitParams = {
  name: string | string[];
  flat?: boolean;
  validate?: ControllerParams['validate'];
};

export type ControllerInjectedResult<Meta = any> = {
  input: {
    name: string;
    value;
    onChange: (event: any) => void;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
  };
  error: Message;
  innerError: Message;
  outerError: Message;
  isShowError: boolean;
  isShowOuterError: boolean;
  isShowInnerError: boolean;
  form: FormState;
  meta: Meta;
  validate?: (value: any) => Message;
  setFieldState: ({ field: string, state: FieldState }) => void;
  setOrDeleteError: ({ field: string, error: Message }) => void;
  setOrDeleteOuterError: ({ field: string, error: Message }) => void;
  setOuterErrorsInlineState: (errors: ErrorsInline) => void;
  fieldState: FieldState;
};

export type Controller<Meta = any> = () => ControllerInjectedResult<Meta>;

export type ControllerHof<Meta = any> = (a: ControllerParams) => Controller<Meta>;

export type FormValidate<Values, Meta> = (params: FormValidateParams<Values, Meta>) => ErrorsInline;

export type MapSubmit<Values, ResultValues, Meta = any> = (
  params: SubmitParams<Values, Meta>,
) => SubmitParams<ResultValues, Meta>;

export type FormValidateParams<Values, Meta> = SubmitParams<Values, Meta>;

export type OnSubmit<Values, Meta = any> = (params: SubmitParams<Values, Meta>) => void;

export type OnChange<Values, Meta = any> = OnSubmit<Values, Meta>;

export type UseErrorParams<Values = any> = {
  name: string;
  form: Form<Values>;
};

export type UseErrorResult<Meta = any> = {
  inputValue: any;
  form: FormState;
  meta: Meta;
  fieldState: FieldState;
  error: Message;
  innerError: Message;
  outerError: Message;
  isShowError: boolean;
  isShowOuterError: boolean;
  isShowInnerError: boolean;
};

export type FieldArrayParams<Values = any> = {
  name: string;
  fieldArray: FieldArray<Values>;
};

export type MapFieldsArrayCallbackParams = {
  formItemName: string;
  field: any;
  fields: Array<any>;
  index: number;
};

export type MapFieldArrayCallback = (params: MapFieldsArrayCallbackParams) => React.ReactNode;

export type ResultUseFieldArray = {
  map: (fn: MapFieldArrayCallback) => React.ReactNode[];
  remove: (index: number) => void;
  push: (value: any | Array<any>) => void;
};

export type GuardFn<Values = any, Meta = any> = (params: SubmitParams<Values, Meta>) => boolean;

export type CreateFormParams<Values = any, MappedValues = Values, Meta = any> = {
  name?: string;
  validate?: FormValidate<Values, Meta>;
  mapSubmit?: MapSubmit<Values, MappedValues, Meta>;
  onSubmit?: OnSubmit<MappedValues, Meta>;
  onSubmitGuardFn?: GuardFn<Values, Meta>;
  onChange?: OnChange<Values, Meta>;
  onChangeGuardFn?: GuardFn<Values, Meta>;
  initialValues?: Values | Store<Values>;
  initialMeta?: Meta;
  domain?: Domain;
  resetOuterErrorsBySubmit?: boolean;
  resetOuterErrorByOnChange?: boolean;
};

type AllFormState<Values, Meta = any> = Store<{
  values: Values;
  errorsInline: Record<string, string>;
  outerErrorsInline: Record<string, string>;
  fieldsInline: Record<string, FieldState>;
  form: FormState;
  meta: Meta;
}>;

export type Form<Values = any, Meta = any> = {
  $values: Store<Values>;
  $errorsInline: Store<ErrorsInline>;
  $outerErrorsInline: Store<ErrorsInline>;
  $form: Store<FormState>;
  $fieldsInline: Store<Record<string, FieldState>>;
  $meta: Store<Meta>;
  $allFormState: AllFormState<Values, Meta>;
  created: Event<void>,
  setValue: Event<SetValueParams>;
  setValues: Event<SetValuesParams<Values>>;
  setOrDeleteError: Event<SetOrDeleteErrorParams>;
  setErrorsInlineState: Event<any>;
  setFieldState: Event<SetFieldStateParams>;
  setSubmitted: Event<boolean>;
  resetOuterFieldStateFlags: Event<any>;
  resetOuterErrors: Event<any>;
  setOrDeleteOuterError: Event<SetOrDeleteOuterErrorParams>;
  reset: Event<void>;

  setMeta: Event<Meta>;

  setOuterErrorsInlineState: Event<any>;
  validateForm: Event<any>;
  submit: Event<any>;
  onSubmit: Event<SubmitParams<Values, Meta>>;

  onChangeFieldBrowser: Event<{ event: React.SyntheticEvent; name: string; flat?: boolean }>;
  onFocusFieldBrowser: Event<{ event: React.SyntheticEvent; name: string }>;
  onBlurFieldBrowser: Event<{ event: React.SyntheticEvent; name: string }>;
  fieldInit: Event<FieldInitParams>;

  getName: GetName<Values>;
  getNameStr: GetNameStr<Values>;

  name: string;
};

export type FieldArray<Values = any> = {
  form: Form<Values>;
  push: Event<{ fieldName: string; value: any | any[] }>;
  remove: Event<{ fieldName: string; index: number }>;
};

export type CreateFieldArrayParams<Values = any> = {
  form: Form<Values>;
  domain?: Domain;
};

// declare const useFieldArray: <Values extends AnyState = AnyState>(
//   paramsFieldArray: FieldArrayParams,
// ) => ResultUseFieldArray<Values>;
//
// declare const setIn: <O extends AnyState = AnyState, V = any>(
//   object: O,
//   path: string,
//   value: V,
// ) => O;
//
// declare const deleteIn: <O extends AnyState = AnyState>(
//   object: O,
//   path: string,
//   removeEmpty: boolean = false,
//   inDeep: boolean = true,
// ) => O;
//
// declare const getIn: <O extends AnyState = AnyState, V = any>(
//   object: O,
//   path: string,
//   removeEmpty: boolean = false,
//   inDeep: boolean = true,
// ) => V = any;
//
// declare const makeNested: <O extends AnyState = AnyState, R extends AnyState>(
//   inlineMap: O,
// ) => R;
//
// declare const removeFromInlineMap: <O extends FieldsInline = FieldsInline, R extends FieldsInline = FieldsInline>(
//   inlineMap: O,
//   key: string,
// ) => R;
