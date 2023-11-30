import { createEvent, createStore } from 'effector';
import { atom } from 'shared/factory';

export type NoticeType = 'success' | 'info' | 'warning' | 'error';

type NoticeConfig = {
  message: string;
  description: string;
  type: NoticeType;
};

export type Notice = NoticeConfig & {
  id: number;
};

export const notificationModel = atom(() => {
  const $notifications = createStore<Notice[]>([]);

  const deleteNotice = createEvent<{ id: number }>();

  const show = createEvent<NoticeConfig>();

  $notifications.on(show, (list, config) => {
    const newNotice = { ...config, id: Math.random() };

    return [newNotice, ...list];
  });

  $notifications.on(deleteNotice, (list, { id }) => [
    ...list.filter((notice) => notice.id !== id),
  ]);

  return {
    $notifications,
    show,
    deleteNotice,
  };
});
