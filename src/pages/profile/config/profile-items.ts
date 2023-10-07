import { paths } from 'shared/routing';
import { IconName } from 'shared/ui/icon/ui';

interface ProfileItem {
  href: string;
  caption: string;
  iconName: IconName<'common'>;
}

export const profileItems: ProfileItem[] = [
  { href: paths.favorites, caption: 'Избранное', iconName: 'bookmark2' },
  { href: paths.history, caption: 'Просмотренное', iconName: 'history' },
  { href: paths.settings, caption: 'Настройки', iconName: 'settings' },
];
