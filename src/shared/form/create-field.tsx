/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import { forwardRef, type ChangeEvent, ComponentType } from "react";
import type { Controller } from "shared/lib/effector-react-form";

export function createField<P, Keys extends string = "">(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  // eslint-disable-next-line func-names
  return forwardRef(({ use, ...props }: Omit<P, Keys> & { use: Controller }, ref) => {
    const { input, error, isShowError } = use();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onBlur, onFocus, ...inputProps } = input;

    const fieldProps = {
      error: isShowError && error,
      ...inputProps,
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return <Component ref={ref} {...(props as any)} {...fieldProps} value={fieldProps.value ?? ""} />;
  });
}

export function createSuggestField<P, Keys extends string = "">(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  // eslint-disable-next-line func-names
  return function ({ use, ...props }: Omit<P, Keys> & { use: Controller }) {
    const { input, error, isShowError } = use();
    const { value, onChange, ...restInputProps } = input;

    // Workaround: https://github.com/vitalybaev/react-dadata/issues/94
    const fieldProps = {
      error: isShowError && error,
      defaulQuery: value ?? "",
      inputProps: {
        onChange,
        value, // pass value here for updates on client
        ...restInputProps,
      },
      onChange: (e: any) => {
        onChange(e.value);
      },
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return <Component {...(props as any)} {...fieldProps} />;
  };
}

export function createBooleanField<P, Keys extends string = "">(
  Component: ComponentType<P>,
  skippedFieldProps?: (keyof ReturnType<Controller>)[]
) {
  // eslint-disable-next-line func-names
  return function ({ use, ...props }: Omit<P, Keys> & { use: Controller }) {
    const { input, error, isShowError } = use();
    const { value, onChange, ...restInputProps } = input;

    const fieldProps = {
      error: isShowError && error,
      checked: Boolean(value),
      onChange: (event: ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.checked),
      ...restInputProps,
    };

    if (skippedFieldProps) {
      for (const prop of skippedFieldProps) {
        delete fieldProps[prop as unknown as keyof typeof fieldProps];
      }
    }

    return <Component {...(props as any)} {...fieldProps} />;
  };
}
