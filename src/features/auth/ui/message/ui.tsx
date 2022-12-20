import clsx from "clsx";
import { FC } from "react";
import { EditIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

interface MessageProps {
  title: string;
  description?: string | null;
  isEditable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const Message: FC<MessageProps> = ({ title, isEditable, onEdit, description, className }) => {
  return (
    <div className={clsx(styles.messageWrapper, isEditable && styles.isEditable, className)}>
      {isEditable && (
        <button onClick={onEdit} className={clsx("btn-reset", styles.edit)}>
          <EditIcon />
        </button>
      )}
      <div className={clsx(styles.message, isEditable && styles.right)}>
        <span className={styles.messageTitle}>{title}</span>
        {description && <p className={styles.messageDesc}>{description}</p>}
      </div>
    </div>
  );
};
