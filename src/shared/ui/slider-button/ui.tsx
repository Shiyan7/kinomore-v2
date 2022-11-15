import { forwardRef } from "react";
import { ChevronIcon } from "shared/ui/icons";
import clsx from "clsx";
import type { SliderButtonProps } from "./types";
import styles from "./styles.module.scss";

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({ className, dir }, ref) => {
  return (
    <button
      type="button"
      className={clsx(
        "btn-reset",
        styles.btn,
        dir === "left" && styles.left,
        dir === "right" && styles.right,
        className
      )}
      ref={ref}>
      <ChevronIcon />
    </button>
  );
});
