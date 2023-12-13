import { useUnit } from 'effector-react';
import Image from 'next/image';
import { movieModel, getPageTitle } from 'pages/movie';
import { Title as NativeTitle } from 'shared/ui/title';
import styles from './styles.module.scss';

export const Title = () => {
  const { movie } = useUnit({ movie: movieModel.$movie });

  const hasLogo = movie?.logo?.url;

  const Logo = (
    <div className={styles.logo}>
      <Image alt="" fill priority sizes="100%" src={movie?.logo?.url ?? ''} />
    </div>
  );

  const Title = (
    <NativeTitle className={styles.title}>
      {getPageTitle(movie?.name)} Смотреть онлайн
    </NativeTitle>
  );

  return <div className={styles.root}>{hasLogo ? Logo : Title}</div>;
};
