import clsx from 'clsx';
import { Tabs as ReactTabs, type TabItem } from 'shared/ui/tabs';
import { Description } from './description';
import styles from './styles.module.scss';

export const Tabs = () => {
  const tabs: TabItem[] = [
    { label: 'Описание', content: <Description /> },
    { label: 'Изображения', content: <div /> },
  ];

  return (
    <section className={clsx('container', styles.root)}>
      <ReactTabs tabs={tabs} />
    </section>
  );
};
