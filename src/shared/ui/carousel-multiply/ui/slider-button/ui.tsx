import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';
import { useSwiper } from 'swiper/react';
import { ChevronIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  dir: 'left' | 'right';
}

export const SliderButton: FC<SliderButtonProps> = ({ className, dir, ...props }) => {
  const swiper = useSwiper();

  const handleClick = () => (dir === 'left' ? swiper.slidePrev() : swiper.slideNext());

  return (
    <button
      onClick={handleClick}
      type='button'
      className={clsx('btn-reset', styles.btn, styles[dir], className)}
      {...props}
    >
      <ChevronIcon />
    </button>
  );
};
