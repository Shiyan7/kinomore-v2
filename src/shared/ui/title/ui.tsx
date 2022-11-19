import { FC, HTMLProps, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface TitleProps extends Omit<HTMLProps<HTMLHeadingElement>, "size"> {
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "large" | "medium";
}

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
