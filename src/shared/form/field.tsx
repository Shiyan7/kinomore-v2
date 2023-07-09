/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldModel } from '@filledout/core';

import compose from 'compose-function';

import { ComponentType, forwardRef } from 'react';

import { useField } from './factory';

type FieldChildProps = {
  value?: any;
  error?: string;
  focused?: boolean;
  hasError?: boolean;
  onChange: (...args: any[]) => any | void;
};

const useFieldProps = (is: FieldModel<any>, props: FieldChildProps) => {
  const field = useField(is);

  const { value, errors, focused, shouldShowValidation, onChange } = field;

  const error = errors?.[0];

  const errorMessage = error ? error.name : undefined;

  return {
    value,
    focused,
    hasError: shouldShowValidation && errorMessage,
    error: errorMessage,
    onChange: compose(onChange, props.onChange),
  };
};

function withField<P>(Component: ComponentType<P>) {
  type Props = Omit<P, 'value' | 'onChange' | 'error' | 'hasError'> & { field: FieldModel<any> };

  const WrappedComponent = forwardRef<any, Props>(({ field, ...props }, ref) => {
    const _props = useFieldProps(field, props as any as FieldChildProps);

    return <Component {...props} {...(_props as any)} ref={ref} />;
  });

  return WrappedComponent;
}

export { withField };
