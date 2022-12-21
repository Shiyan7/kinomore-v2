import { FieldState, FormState } from './ts';

export const initialFieldState: FieldState = {
  _type: 'fieldMeta',
  active: false,
  touched: false,
  changed: false,
  blurred: false,
  touchedAfterOuterError: false,
  changedAfterOuterError: false,
  blurredAfterOuterError: false,
};

export const initialFormState: FormState = {
  submitted: false,
  hasError: false,
  hasOuterError: false,
};
