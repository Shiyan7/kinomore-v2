import clsx from 'clsx';
import { useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Icon, Portal } from 'shared/ui';
import { notificationModel } from './model';
import styles from './styles.module.scss';

const DELETE_DELAY = 5000;

export const Notification = () => {
  const notifications = useStore(notificationModel.$notifications);
  const closeNotice = useEvent(notificationModel.deleteNotice);

  const closeNoticeHandler = (id: number) => () => {
    closeNotice({ id });
  };

  useEffect(() => {
    setTimeout(() => {
      notifications.forEach(({ id }) => {
        closeNotice({ id });
      });
    }, DELETE_DELAY);
  }, [notifications, closeNotice]);

  return (
    <Portal rootId="#notification">
      <TransitionGroup className={styles.notfications}>
        {notifications.map(({ id, message, description, type }) => (
          <CSSTransition
            classNames={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              exit: styles.exit,
              exitActive: styles.exitActive,
            }}
            key={id}
            onExit={closeNoticeHandler(id)}
            timeout={300}
            unmountOnExit
          >
            <div className={clsx(styles.notice, styles[type])}>
              <span className={styles.icon}>
                <Icon name={`notification/${type}`} />
              </span>
              <div className={styles.content}>
                <span className={styles.message}>{message}</span>
                <p className={styles.desc}>{description}</p>
              </div>
              <button
                className={clsx('btn-reset', styles.close)}
                onClick={closeNoticeHandler(id)}
              >
                <Icon name="common/close" />
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Portal>
  );
};
