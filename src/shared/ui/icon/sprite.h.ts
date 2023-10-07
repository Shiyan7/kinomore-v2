export interface SpritesMap {
  common:
    | 'bookmark-slash'
    | 'bookmark'
    | 'bookmark2'
    | 'burger'
    | 'check'
    | 'chevron'
    | 'close'
    | 'edit'
    | 'filters'
    | 'history'
    | 'link'
    | 'play'
    | 'profile'
    | 'search'
    | 'share'
    | 'sort'
    | 'star';
  genres: 'cup' | 'fire' | 'happy' | 'hearts' | 'knife' | 'map' | 'music' | 'people' | 'rocket' | 'tank';
  social: 'facebook' | 'gmail' | 'telegram' | 'viber' | 'vk' | 'whatsapp';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: [
    'bookmark-slash',
    'bookmark',
    'bookmark2',
    'burger',
    'check',
    'chevron',
    'close',
    'edit',
    'filters',
    'history',
    'link',
    'play',
    'profile',
    'search',
    'share',
    'sort',
    'star',
  ],
  genres: ['cup', 'fire', 'happy', 'hearts', 'knife', 'map', 'music', 'people', 'rocket', 'tank'],
  social: ['facebook', 'gmail', 'telegram', 'viber', 'vk', 'whatsapp'],
};
