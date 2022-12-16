import clsx from "clsx";
import { forwardRef, type PropsWithChildren, ButtonHTMLAttributes } from "react";
import { Spinner } from "shared/ui/spinner";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  variant?: "primary" | "small";
}

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children, type = "button", loading, variant = "primary", className, ...props }, ref) => {
    const ButtonSpinner = (
      <div className={styles.spinner}>
        <Spinner strokeWidth={4} />
      </div>
    );

    return (
      <button type={type} ref={ref} className={clsx("btn-reset", styles.btn, styles[variant], className)} {...props}>
        <span>{loading ? ButtonSpinner : children}</span>
      </button>
    );
  }
);
