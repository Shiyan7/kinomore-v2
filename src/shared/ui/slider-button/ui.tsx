import { forwardRef } from "react";
import clsx from "clsx";
import { ChevronIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

interface SliderButtonProps {
  className?: string;
  dir: "left" | "right";
}

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({ className, dir }, ref) => {
  return (
    <button type="button" className={clsx("btn-reset", styles.btn, styles[dir], className)} ref={ref}>
      <ChevronIcon />
    </button>
  );
});
