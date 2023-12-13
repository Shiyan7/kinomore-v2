import { useUnit } from 'effector-react';
import type { CSSProperties } from 'react';
import { authModel } from 'widgets/auth';
import styles from './styles.module.scss';

export const Progress = () => {
  const { progress } = useUnit({ progress: authModel.$progress });

  return (
    <div
      className={styles.progress}
      style={{ '--progress-width': `${progress}%` } as CSSProperties}
    />
  );
};
