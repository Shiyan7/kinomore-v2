import { SpritesMap } from './sprite.h';

export type IconName<Group extends keyof SpritesMap> = SpritesMap[Group];

export interface IconProps<Group extends keyof SpritesMap> {
  name: IconName<Group>;
  type?: Group;
}

export function Icon<Group extends keyof SpritesMap = 'common'>({ type, name }: IconProps<Group>) {
  return (
    <svg className="icon">
      <use xlinkHref={`/sprite/${type}.svg#${name}`} />
    </svg>
  );
}
