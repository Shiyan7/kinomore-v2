import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import type { TitleProps } from "./types";
import styles from "./styles.module.scss";

export const Title: FC<PropsWithChildren<TitleProps>> = ({
  className,
  size = "large",
  level: Level = "h1",
  children,
  ...props
}) => {
  return (
    <Level className={clsx(styles.title, styles[size], className)} {...props}>
      {children}
    </Level>
  );
};
