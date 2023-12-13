import clsx from 'clsx';
import { useUnit } from 'effector-react';
import Image from 'next/image';
import { personModel } from 'pages/person';
import { Title } from 'shared/ui/title';
import { getProfessions, timestampToDate } from '../lib';
import styles from './styles.module.scss';

export const MainSection = () => {
  const { person } = useUnit({ person: personModel.$person });
  const name = person?.name ?? 'Без имени';

  const items = [
    {
      label: 'Карьера',
      value: person?.profession ? getProfessions(person.profession) : '—',
    },
    {
      label: 'Дата рождения',
      value: person?.birthday
        ? timestampToDate(person.birthday, 'D MMMM YYYY')
        : '—',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={clsx('container container--narrow', styles.container)}>
        <div className={styles.top}>
          <div className={styles.photo}>
            <Image
              alt={name}
              fill
              priority
              quality={100}
              sizes="100%"
              src={person?.photo ?? ''}
            />
          </div>
          <div className={styles.title}>
            <Title className={styles.name}>{name}</Title>
            {person?.enName ? (
              <span className={styles.enName}>{person.enName}</span>
            ) : null}
          </div>
          <div className={styles.info}>
            {items.map(({ label, value }) => (
              <div className={styles.row} key={label}>
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
