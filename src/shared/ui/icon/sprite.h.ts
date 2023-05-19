export interface SpritesMap {
  common:
    | 'bookmark'
    | 'burger'
    | 'check'
    | 'chevron'
    | 'close'
    | 'edit'
    | 'filters'
    | 'link'
    | 'play'
    | 'profile'
    | 'search'
    | 'share'
    | 'sort'
    | 'star'
    | 'volume-high'
    | 'volume-slash';
  hero: 'cup' | 'fire' | 'happy' | 'hearts' | 'knife' | 'map' | 'music' | 'people' | 'rocket' | 'tank';
  social: 'facebook' | 'gmail' | 'telegram' | 'viber' | 'vk' | 'whatsapp';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: [
    'bookmark',
    'burger',
    'check',
    'chevron',
    'close',
    'edit',
    'filters',
    'link',
    'play',
    'profile',
    'search',
    'share',
    'sort',
    'star',
    'volume-high',
    'volume-slash',
  ],
  hero: ['cup', 'fire', 'happy', 'hearts', 'knife', 'map', 'music', 'people', 'rocket', 'tank'],
  social: ['facebook', 'gmail', 'telegram', 'viber', 'vk', 'whatsapp'],
};
