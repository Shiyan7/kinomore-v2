import { useStore } from 'effector-react';
import { movieModel } from 'pages/movie';
import styles from './styles.module.scss';

export const Description = () => {
  const data = useStore(movieModel.$movie);

  const words = data?.description?.split(' ');
  const shortDescription = words?.slice(0, 10).join(' ');
  const description = data?.shortDescription ?? shortDescription;

  return <p className={styles.desc}>{description}</p>;
};
