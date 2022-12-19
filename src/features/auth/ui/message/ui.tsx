import clsx from "clsx";
import { FC } from "react";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

interface MessageProps {
  title: string;
  className?: string;
  description?: string | null;
  right?: boolean;
  timeout?: number;
}

export const Message: FC<MessageProps> = ({ title, right, description, className, timeout = 0 }) => {
  return (
    <Transition doneClass={styles.done} timeout={timeout}>
      <div className={clsx(styles.message, className, right && styles.right)}>
        <span className={styles.messageTitle}>{title}</span>
        {description && <p className={styles.messageDesc}>{description}</p>}
      </div>
    </Transition>
  );
};
