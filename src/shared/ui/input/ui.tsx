import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <label className={clsx(styles.label, className)}>
      <input ref={ref} className={clsx("input-reset", styles.input)} {...props} />
    </label>
  );
});

Input.displayName = "Input";
