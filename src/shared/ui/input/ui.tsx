import clsx from 'clsx';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  togglePassword?: boolean;
  hasError?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      hasError,
      type = 'text',
      togglePassword,
      placeholder,
      onClear,
      value,
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const handleOnBlur = () => {
      if (value === '') {
        setIsFocus(false);
      }
    };

    const handlePasswordType = () => {
      setInputType(inputType === 'text' ? 'password' : 'text');
    };

    return (
      <div className={clsx(styles.field, className)}>
        <label className={clsx(styles.label, hasError && styles.error)}>
          <span className={clsx(styles.placeholder, isFocus && styles.isFocus)}>
            {placeholder}
          </span>
          <input
            {...props}
            className={clsx(
              'input-reset',
              isFocus && styles.isFocus,
              onClear && styles.clear,
              styles.input,
              styles[type]
            )}
            onBlur={handleOnBlur}
            onFocus={() => setIsFocus(true)}
            ref={ref}
            type={inputType}
            value={value}
          />
        </label>
        {onClear ? (
          <button
            className={clsx(
              'btn-reset',
              value && styles.visibile,
              styles.clearBtn
            )}
            onClick={onClear}
            type="button"
          >
            <Icon name="common/close" />
          </button>
        ) : null}
        {togglePassword ? (
          <button
            className={clsx('btn-reset', styles.eye)}
            onClick={handlePasswordType}
            type="button"
          >
            <Icon
              name={inputType === 'text' ? 'common/eye' : 'common/eye-closed'}
            />
          </button>
        ) : null}
      </div>
    );
  }
);
