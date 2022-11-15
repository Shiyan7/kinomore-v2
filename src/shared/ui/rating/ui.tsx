import React, { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export const Rating = ({ children }: PropsWithChildren) => {
  return <span className={styles.rating}>{children}</span>;
};
