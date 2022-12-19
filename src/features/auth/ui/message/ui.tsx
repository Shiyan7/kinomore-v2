import { FC } from "react";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

interface MessageProps {
  title: string;
  description: string;
  timeout?: number;
}

export const Message: FC<MessageProps> = ({ title, description, timeout = 0 }) => {
  return (
    <Transition doneClass={styles.done} timeout={timeout}>
      <div className={styles.message}>
        <span className={styles.messageTitle}>{title}</span>
        <p className={styles.messageDesc}>{description}</p>
      </div>
    </Transition>
  );
};
