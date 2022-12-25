import type { CSSProperties } from "react";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import styles from "./styles.module.scss";

export const Progress = () => {
  const progress = useUnit(authModel.$progress);

  return <div className={styles.progress} style={{ "--progress-width": `${progress}%` } as CSSProperties} />;
};
