import clsx from 'clsx';
import { Fragment, type ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from 'react-tabs';
import styles from './styles.module.scss';

export interface TabItem {
  label: string;
  condition?: unknown;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
}

export const Tabs = ({ className, tabs }: TabsProps) => (
  <ReactTabs selectedTabClassName={styles.selected} className={clsx(styles.tabs, className)}>
    <TabList className={styles.list}>
      {tabs.map((tab) => {
        const { label, condition = true } = tab;

        return <Fragment key={label}>{condition ? <Tab className={styles.tab}>{label}</Tab> : null}</Fragment>;
      })}
    </TabList>
    {tabs.map(({ label, content, condition = true }) => (
      <Fragment key={label}>{condition ? <TabPanel>{content}</TabPanel> : null}</Fragment>
    ))}
  </ReactTabs>
);
