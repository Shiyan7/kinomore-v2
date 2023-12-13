import { useUnit } from 'effector-react';
import { movieModel } from 'pages/movie';
import styles from './styles.module.scss';

export const Description = () => {
  const { movie } = useUnit({ movie: movieModel.$movie });

  const words = movie?.description?.split(' ');
  const shortDescription = words?.slice(0, 10).join(' ');
  const description = movie?.shortDescription ?? shortDescription;

  return <p className={styles.desc}>{description}</p>;
};
