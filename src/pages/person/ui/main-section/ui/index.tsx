import clsx from 'clsx';
import { useStore } from 'effector-react';
import Image from 'next/image';
import { personModel } from 'pages/person';
import { Title } from 'shared/ui/title';
import { getProfessions, timestampToDate } from '../lib';
import styles from './styles.module.scss';

export const MainSection = () => {
  const data = useStore(personModel.$person);
  const name = data?.name ?? 'Без имени';

  const items = [
    { label: 'Карьера', value: data?.profession ? getProfessions(data.profession) : '—' },
    { label: 'Дата рождения', value: data?.birthday ? timestampToDate(data.birthday, 'D MMMM YYYY') : '—' },
  ];

  return (
    <section className={styles.section}>
      <div className={clsx('container container--narrow', styles.container)}>
        <div className={styles.top}>
          <div className={styles.photo}>
            <Image priority sizes="100%" fill quality={100} src={data?.photo ?? ''} alt={name} />
          </div>
          <div className={styles.title}>
            <Title className={styles.name}>{name}</Title>
            {data?.enName && <span className={styles.enName}>{data.enName}</span>}
          </div>
          <div className={styles.info}>
            {items.map(({ label, value }) => (
              <div key={label} className={styles.row}>
                <span className={styles.value}>{label}:</span>
                <span className={styles.value}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
