import { FieldDescriptor, useField } from '@filledout/react';
import { ComponentType, ForwardedRef, forwardRef, RefObject } from 'react';

type FieldWrappedComponentProps<V = any> = {
  value?: V;
  error?: string;
  focused?: boolean;
  hasError?: boolean;
  onBlur?: (...args: any[]) => any | void;
  onFocus?: (...args: any[]) => any | void;
  onChange?: (...args: any[]) => any | void;
};

type UseFieldPropsParams<V = any, T = any> = {
  field: FieldDescriptor<V, T>;
};

// eslint-disable-next-line @ypescript-eslint/no-empty-function
const nope = (..._: any[]) => {};

const compose =
  (g: any, f = nope) =>
  (x: any) => {
    g(x);

    f(x);
  };

function useFieldProps<T extends FieldDescriptor<any, any>>(_field: T, props: FieldWrappedComponentProps) {
  const field = useField(_field);

  const { value, errors, focused, onChange, shouldShowValidation } = field;

  const error = errors?.[0];

  const errorMessage = error ? error.name : undefined;

  return {
    value,
    focused,
    hasError: shouldShowValidation && errorMessage,
    error: errorMessage,
    onChange: compose(onChange, props.onChange),
  };
}

function withField<P extends FieldWrappedComponentProps>(Component: ComponentType<P>) {
  type Props = Omit<P, 'value' | 'onChange' | 'error' | 'hasError'> & UseFieldPropsParams;

  const WrappedComponent = forwardRef<any, Props>(({ field, ...props }, ref) => {
    const _props = useFieldProps(field, props);

    return <Component {...props} {...(_props as any)} ref={ref} />;
  });

  return WrappedComponent;
}

export { withField };
