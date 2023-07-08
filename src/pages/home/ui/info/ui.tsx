import clsx from 'clsx';
import { Title } from 'shared/ui/title';
import styles from './styles.module.scss';

export const Info = () => (
  <section className={styles.section}>
    <div className={clsx('container', styles.container)}>
      <Title className={styles.title} size="small" as="h2">
        Добро пожаловать на Kinomore - онлайн кинотеатр с более чем 960 тысячами фильмов!
      </Title>
      <p className={styles.desc}>
        У нас вы можете легко и быстро найти интересующий вас фильм благодаря нашему удобному поиску. Мы предлагаем
        широкий выбор кинокартин различных жанров и направлений - от классики до новинок, от драм до боевиков. На
        Kinomore вы сможете насладиться просмотром любимых фильмов в высоком качестве в любое время и в любом месте.
        Регистрируйтесь на нашем сайте и начните погружаться в увлекательный мир кино!
      </p>
    </div>
  </section>
);
