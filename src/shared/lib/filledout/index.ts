/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFieldFormMeta,
  ValidationVisibilityCondition,
  FieldKey,
  type Fields,
  type FormMeta,
  type FormModel,
  type BaseFieldModel,
} from '@filledout/core';
import type { Store, StoreValue } from 'effector';
import { useStoreMap, useUnit } from 'effector-react';
import { useEffect, useMemo, useRef } from 'react';

type Params = {
  validateOnUseForm: boolean;
};

const get = <T extends object, R = any>(source: T, path: string | string[]): R => {
  const split = Array.isArray(path) ? path : path.split('.');

  const name = split[0];

  const value = source[name as keyof T];

  if (typeof value === 'object' && split.length > 1) {
    return get(value as any, split.slice(1));
  }

  return value as R;
};

export const createLib = ({ validateOnUseForm = false }: Params) => {
  const useDirty = ({ $dirty }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $dirty,

      keys: [name],

      defaultValue: false,

      fn: (dirty, [name]) => dirty[name],
    });

  const useTouched = ({ $touched }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $touched,

      keys: [name],

      defaultValue: false,

      fn: (touched, [name]) => touched[name],
    });

  const useErrors = ({ $errors }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $errors,

      keys: [name],

      defaultValue: null,

      fn: (errors, [name]) => errors[name] ?? null,
    });

  const useExternalErrors = ({ $externalErrors }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $externalErrors as Store<Record<string, any>>,

      keys: [name],

      defaultValue: null,

      fn: (errors, [name]) => errors[name] ?? get(errors, name) ?? null,
    });

  const useValue = <V>({ $values }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $values,

      keys: [name],

      fn: (values, [name]) => get(values as any, name) as V,
    });

  const useFocused = ({ $focused }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $focused,

      keys: [name],

      fn: (focused, [name]) => focused === name,
    });

  const useSubmitted = ({ $submitCount }: FormMeta<any>) =>
    useStoreMap({
      store: $submitCount,

      keys: [],

      fn: (count) => count >= 1,
    });

  const useField = <F extends BaseFieldModel<any>>(field: F) => {
    const meta = getFieldFormMeta<StoreValue<F['$value']>>(field);

    const showValidationWhen = meta.showValidationOn!;

    const name = field.path;

    const submitted = useSubmitted(meta);

    const value = useValue<StoreValue<F['$value']>>(meta, name);

    const dirty = useDirty(meta, name);

    const touched = useTouched(meta, name);

    const errors = useErrors(meta, name);

    const focused = useFocused(meta, name);

    const externalErrors = useExternalErrors(meta, name);

    // eslint-disable-next-line operator-linebreak
    const shouldShowValidation =
      (showValidationWhen.includes(ValidationVisibilityCondition.Dirty) && dirty) ||
      (showValidationWhen.includes(ValidationVisibilityCondition.Submitted) && submitted) ||
      (showValidationWhen.includes(ValidationVisibilityCondition.Touched) && touched);

    const handlers = useUnit({
      change: meta.change,
      blur: meta.blured,
      focus: meta.focused,
    });

    const { onChange, onBlur, onFocus } = useMemo(() => {
      const onChange = (value: StoreValue<F['$value']>) => {
        handlers.change({ name, value });
      };

      const onBlur = () => {
        handlers.blur({ name });
      };

      const onFocus = () => {
        handlers.focus({ name });
      };

      return {
        onBlur,
        onFocus,
        onChange,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    return {
      value,
      dirty,
      errors,
      onBlur,
      onFocus,
      touched,
      focused,
      onChange,
      externalErrors,
      shouldShowValidation,
    };
  };

  const fieldKeys = Object.values(FieldKey);

  const useFields = <T>(form: FormModel<T>) => {
    const cacheRef = useRef<Record<string, any>>({});

    useEffect(
      () => () => {
        cacheRef.current = {};
      },

      [],
    );

    return useMemo(() => {
      const spawn = (parent: string, name: string) => {
        const path = `${parent ? `${parent}.` : ''}${name}`;

        if (fieldKeys.includes(name as FieldKey)) {
          return get(form.fields, path);
        }

        if (cacheRef.current[path]) return cacheRef.current[path];

        return new Proxy(
          {},

          {
            // eslint-disable-next-line no-return-assign
            get: (_, key: string): any => (cacheRef.current[`${path}.${key}`] = spawn(path, key)),
          },
        );
      };

      return new Proxy(
        {},

        {
          get: (_, key: string) => {
            if (cacheRef.current[key]) return cacheRef.current[key];

            // eslint-disable-next-line no-return-assign
            return (cacheRef.current[key] = spawn('', key));
          },
        },
      );
    }, [form]) as Fields<T>;
  };

  const useForm = <T>(
    form: FormModel<T>,
    { validate: shouldValidate = validateOnUseForm } = {},
  ): {
    fields: Fields<T>;
    isSubmitted: boolean;
    onSubmit: (payload: void) => void;
  } => {
    const fields = useFields(form);

    const { validate, onSubmit, isSubmitted } = useUnit({
      onSubmit: form.submit,
      validate: form.validate,
      isSubmitted: form.$isSubmitted,
    });

    if (shouldValidate) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    }

    return {
      fields,
      onSubmit,
      isSubmitted,
    };
  };

  return {
    useForm,
    useField,
    useDirty,
    useValue,
    useErrors,
    useFields,
    useFocused,
    useTouched,
    useSubmitted,
    useExternalErrors,
  };
};
