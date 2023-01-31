import clsx from 'clsx';
import Image from 'next/image';
import { useStore } from 'effector-react';
import { pageModel, getPersonName } from 'pages/person';
import { paths } from 'shared/routes';
import { Title, Breadcrumbs } from 'shared/ui';
import { getProfessions, timestampToDate } from './lib';
import styles from './styles.module.scss';

export const MainSection = () => {
  const data = useStore(pageModel.$person);
  const name = getPersonName(data?.name);
  const breadcrumbs = [{ href: paths.home, text: 'Главная' }, { text: name }];

  console.log(data);

  const items = [
    { key: 'Карьера', value: getProfessions(data?.profession) },
    { key: 'Дата рождения', value: timestampToDate(data?.birthday) },
  ];

  return (
    <section className={styles.section}>
      <div className={clsx('container container--narrow', styles.container)}>
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
        <div className={styles.top}>
          <div className={styles.photo}>
            <Image priority sizes="100%" fill quality={100} src={data?.photo ?? ''} alt={name} />
          </div>
          <div className={styles.text}>
            <Title className={styles.name}>{name}</Title>
            <span className={styles.enName}>{data?.enName}</span>
            <div className={styles.info}>
              {items.map((item, idx) => (
                <div key={idx} className={styles.row}>
                  <span className={styles.value}>{item.key}:</span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
