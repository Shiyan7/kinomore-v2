import clsx from 'clsx';
import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';
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
  ({ className, hasError, type = 'text', togglePassword, placeholder, onClear, value, ...props }, ref) => {
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
          <span className={clsx(styles.placeholder, isFocus && styles.isFocus)}>{placeholder}</span>
          <input
            {...props}
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocus(true)}
            onBlur={handleOnBlur}
            className={clsx(
              'input-reset',
              isFocus && styles.isFocus,
              onClear && styles.clear,
              styles.input,
              styles[type],
            )}
            value={value}
          />
        </label>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className={clsx('btn-reset', value && styles.visibile, styles.clearBtn)}
          >
            <Icon type="common" name="close" />
          </button>
        )}
        {togglePassword && (
          <button type="button" className={clsx('btn-reset', styles.eye)} onClick={handlePasswordType}>
            <Icon type="common" name={inputType === 'text' ? 'eye' : 'eye-closed'} />
          </button>
        )}
      </div>
    );
  },
);
