import { useStore } from 'effector-react';
import { pageModel, getPageTitle } from 'pages/movie';
import { Title as NativeTitle } from 'shared/ui/title';
import styles from './styles.module.scss';

export const Title = () => {
  const data = useStore(pageModel.$movie);

  return <NativeTitle className={styles.title}>{getPageTitle(data?.name)} Смотреть онлайн</NativeTitle>;
};
