import clsx from 'clsx';
import { EditIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface MessageProps {
  title: string;
  description?: string | null;
  position?: 'left' | 'right';
  isSuccess?: boolean;
  isEditable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export const Message = ({
  title,
  isEditable,
  isSuccess,
  position = 'left',
  onEdit,
  description,
  className,
}: MessageProps) => {
  return (
    <div className={clsx(styles.container, styles[position], className)}>
      {isEditable && (
        <button onClick={onEdit} className={clsx('btn-reset', styles.edit)}>
          <EditIcon />
        </button>
      )}
      <div className={clsx(styles.message, isSuccess && styles.isSuccess)}>
        <span className={styles.title}>{title}</span>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </div>
  );
};
