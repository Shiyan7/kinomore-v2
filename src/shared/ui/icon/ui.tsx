import clsx from 'clsx';
import type { SVGProps } from 'react';
import type { IconName } from './types';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName;
}

export function Icon({ name, className, viewBox, ...props }: IconProps) {
  const [spriteName, iconName] = name.split('/');

  return (
    <svg className={clsx('icon', className)} viewBox={viewBox} focusable="false" aria-hidden {...props}>
      <use xlinkHref={`/sprite/${spriteName}.svg#${iconName}`} />
    </svg>
  );
}
