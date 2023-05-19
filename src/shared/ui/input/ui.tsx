import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, placeholder, onClear, value, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const handleOnBlur = () => {
      if (value === '') {
        setIsFocus(false);
      }
    };

    return (
      <div className={clsx(styles.field, className)}>
        <label className={clsx(styles.label, error && styles.error)}>
          <span className={clsx(styles.placeholder, isFocus && styles.isFocus)}>{placeholder}</span>
          <input
            ref={ref}
            onFocus={() => setIsFocus(true)}
            onBlur={handleOnBlur}
            className={clsx('input-reset', isFocus && styles.isFocus, onClear && styles.clear, styles.input)}
            value={value}
            {...props}
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
      </div>
    );
  }
);
