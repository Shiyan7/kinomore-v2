import { createEvent, createStore } from 'effector';
import { atom } from 'shared/factory';

export type NoticeType = 'success' | 'info' | 'warning' | 'error';

type NoticeConfig = {
  message: string;
  description: string;
};

export type Notice = NoticeConfig & {
  id: number;
  type: NoticeType;
};

type StaticFn = (config: NoticeConfig) => void;

interface NoticeMethods {
  success: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  error: StaticFn;
}

const methods: NoticeType[] = ['success', 'info', 'warning', 'error'];

export const notificationModel = atom(() => {
  const $notifications = createStore<Notice[]>([]);

  const addNotice = createEvent<Notice>();

  const deleteNotice = createEvent<{ id: number }>();

  const staticMethods = {} as NoticeMethods;

  methods.forEach((type) => {
    staticMethods[type] = (notice) => {
      addNotice({ ...notice, type, id: Math.random() });
    };
  });

  $notifications.on(addNotice, (list, notice) => [notice, ...list]);

  $notifications.on(deleteNotice, (list, { id }) => [
    ...list.filter((notice) => notice.id !== id),
  ]);

  return { $notifications, deleteNotice, ...staticMethods };
});
