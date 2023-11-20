import { useStore } from 'effector-react';
import Image from 'next/image';
import { movieModel, getPageTitle } from 'pages/movie';
import { Title as NativeTitle } from 'shared/ui/title';
import styles from './styles.module.scss';

export const Title = () => {
  const data = useStore(movieModel.$movie);

  const hasLogo = data?.logo?.url;

  const Logo = (
    <div className={styles.logo}>
      <Image alt="" fill priority sizes="100%" src={data?.logo?.url ?? ''} />
    </div>
  );

  const Title = (
    <NativeTitle className={styles.title}>
      {getPageTitle(data?.name)} Смотреть онлайн
    </NativeTitle>
  );

  return <div className={styles.root}>{hasLogo ? Logo : Title}</div>;
};
