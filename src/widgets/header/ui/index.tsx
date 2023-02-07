import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useHeaderFixed } from 'widgets/header';
import { paths } from 'shared/routing';
import { Burger } from './burger';
import { Logo } from './logo';
import { Menu } from './menu';
import { Nav } from './nav';
import { Profile } from './profile';
import { SearchButton } from './search-button';
import styles from './styles.module.scss';

export const Header = () => {
  const { asPath } = useRouter();
  const { isFixed } = useHeaderFixed();
  const isHomePage = asPath === paths.home;

  return (
    <header
      className={clsx(styles.header, {
        [styles.home]: isHomePage,
        [styles.fixed]: isFixed,
      })}
    >
      <div className={clsx('container', styles.container)}>
        <div className={styles.row}>
          <Logo />
          <Nav />
        </div>
        <div className={styles.row}>
          <SearchButton />
          <Profile />
          <Burger />
        </div>
      </div>
      <Menu />
    </header>
  );
};
