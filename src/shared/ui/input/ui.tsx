import { forwardRef, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, value, ...props }, ref) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleOnBlur = () => {
    /* p.s: не работает без переданного value параметра */
    if (value === "") {
      setIsFocus(false);
    }
  };

  return (
    <label className={clsx(styles.label, className)}>
      <span className={clsx(styles.placeholder, isFocus && styles.isFocus)}>{placeholder}</span>
      <input
        ref={ref}
        onFocus={() => setIsFocus(true)}
        onBlur={handleOnBlur}
        className={clsx("input-reset", isFocus && styles.isFocus, styles.input)}
        value={value}
        {...props}
      />
    </label>
  );
});
