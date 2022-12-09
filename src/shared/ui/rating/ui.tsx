import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface RatingProps {
  className?: string;
}

export const Rating: FC<PropsWithChildren<RatingProps>> = ({ children, className }) => {
  return <span className={clsx(styles.rating, className)}>{children}</span>;
};
