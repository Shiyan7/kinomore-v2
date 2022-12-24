import type { CSSProperties } from "react";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import styles from "./styles.module.scss";

export const Progress = () => {
  const value = useUnit(authModel.$progressStore);

  return <div className={styles.progress} style={{ "--progress-width": `${value}%` } as CSSProperties} />;
};
