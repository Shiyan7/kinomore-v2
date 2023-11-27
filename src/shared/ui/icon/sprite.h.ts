export interface SpritesMap {
  common:
    | 'arrows'
    | 'bookmark-slash'
    | 'bookmark'
    | 'bookmark2'
    | 'burger'
    | 'check'
    | 'chevron'
    | 'close'
    | 'edit'
    | 'eye-closed'
    | 'eye'
    | 'filters'
    | 'google'
    | 'history'
    | 'link'
    | 'play'
    | 'profile'
    | 'search'
    | 'settings'
    | 'share'
    | 'sort'
    | 'star';
  genres:
    | 'cup'
    | 'fire'
    | 'happy'
    | 'hearts'
    | 'knife'
    | 'map'
    | 'music'
    | 'people'
    | 'rocket'
    | 'tank';
  notification: 'error' | 'info' | 'success' | 'warning';
  social: 'facebook' | 'gmail' | 'telegram' | 'viber' | 'vk' | 'whatsapp';
}
export const SPRITES_META: {
  common: Array<
    | 'arrows'
    | 'bookmark-slash'
    | 'bookmark'
    | 'bookmark2'
    | 'burger'
    | 'check'
    | 'chevron'
    | 'close'
    | 'edit'
    | 'eye-closed'
    | 'eye'
    | 'filters'
    | 'google'
    | 'history'
    | 'link'
    | 'play'
    | 'profile'
    | 'search'
    | 'settings'
    | 'share'
    | 'sort'
    | 'star'
  >;
  genres: Array<
    | 'cup'
    | 'fire'
    | 'happy'
    | 'hearts'
    | 'knife'
    | 'map'
    | 'music'
    | 'people'
    | 'rocket'
    | 'tank'
  >;
  notification: Array<'error' | 'info' | 'success' | 'warning'>;
  social: Array<
    'facebook' | 'gmail' | 'telegram' | 'viber' | 'vk' | 'whatsapp'
  >;
} = {
  common: [
    'arrows',
    'bookmark-slash',
    'bookmark',
    'bookmark2',
    'burger',
    'check',
    'chevron',
    'close',
    'edit',
    'eye-closed',
    'eye',
    'filters',
    'google',
    'history',
    'link',
    'play',
    'profile',
    'search',
    'settings',
    'share',
    'sort',
    'star',
  ],
  genres: [
    'cup',
    'fire',
    'happy',
    'hearts',
    'knife',
    'map',
    'music',
    'people',
    'rocket',
    'tank',
  ],
  notification: ['error', 'info', 'success', 'warning'],
  social: ['facebook', 'gmail', 'telegram', 'viber', 'vk', 'whatsapp'],
};
