import { SpritesMap } from './sprite.h';

export interface IconProps<Group extends keyof SpritesMap> {
  name: SpritesMap[Group];
  type?: Group;
}

export function Icon<Group extends keyof SpritesMap = 'common'>({ type, name }: IconProps<Group>) {
  return (
    <svg className="icon">
      <use xlinkHref={`/sprite/${type}.svg#${name}`} />
    </svg>
  );
}
