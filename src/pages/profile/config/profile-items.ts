import { paths } from 'shared/routing';
import type { IconName } from 'shared/ui/icon';

interface ProfileItem {
  href: string;
  caption: string;
  iconName: IconName;
}

export const profileItems: ProfileItem[] = [
  { href: paths.favorites, caption: 'Избранное', iconName: 'common/bookmark2' },
  { href: paths.history, caption: 'Просмотренное', iconName: 'common/history' },
  { href: paths.settings, caption: 'Настройки', iconName: 'common/settings' },
];
