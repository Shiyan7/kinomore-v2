import clsx from 'clsx';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { headerModel } from 'widgets/header';
import { useLockedBody } from 'shared/lib/hooks';
import { useToggler } from 'shared/lib/toggler';
import { CloseIcon } from 'shared/ui/icons';
import { items } from './config';
import styles from './styles.module.scss';

export const Menu = () => {
  const { isOpen, close } = useToggler(headerModel.toggler);
  const { pathname } = useRouter();

  useLockedBody(isOpen);

  return (
    <div className={clsx(styles.menu, isOpen && styles.opened)}>
      <button onClick={close} className={clsx('btn-reset', styles.close)}>
        <CloseIcon />
      </button>
      <div className={clsx('container', styles.container)}>
        <ul className={clsx('list-reset', styles.list)}>
          {items.map((item) => {
            const isCurrentPage = pathname === item.href;

            return (
              <CSSTransition key={item.text} in={isOpen} timeout={item.timeout} classNames={{ enterDone: styles.done }}>
                <li className={clsx(styles.item, isCurrentPage && styles.isCurrent)}>
                  <Link href={item.href} className={styles.link}>
                    {item.text}
                  </Link>
                </li>
              </CSSTransition>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
