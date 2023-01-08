import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Title as NativeTitle } from 'shared/ui/title';
import styles from './styles.module.scss';

export const Title = () => {
  const { name } = useStore(pageModel.$movie)!;

  return <NativeTitle className={styles.title}>{name} Смотреть онлайн</NativeTitle>;
};
