import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, ...props }, ref) => {
  return (
    <label className={clsx(styles.label, className)}>
      {label && <span className={styles.caption}>{label}</span>}
      <input ref={ref} className={clsx("input-reset", styles.input)} {...props} />
    </label>
  );
});

Input.displayName = "Input";
