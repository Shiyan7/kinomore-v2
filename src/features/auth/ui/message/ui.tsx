import clsx from 'clsx';
import type { FC } from 'react';
import { EditIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface MessageProps {
  title: string;
  description?: string | null;
  isEditable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const Message: FC<MessageProps> = ({ title, isEditable, onEdit, description, className }) => {
  return (
    <div className={clsx(styles.container, isEditable && styles.isEditable, className)}>
      {isEditable && (
        <button onClick={onEdit} className={clsx('btn-reset', styles.edit)}>
          <EditIcon />
        </button>
      )}
      <div className={clsx(styles.message, isEditable && styles.right)}>
        <span className={styles.title}>{title}</span>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </div>
  );
};
