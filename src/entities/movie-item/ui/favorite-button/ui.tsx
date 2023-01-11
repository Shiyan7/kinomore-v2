import type { FC, MouseEvent } from 'react';
import { BookmarkIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface FavoriteButtonProps {
  id: number | undefined;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ id }) => {
  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log('add to favorites', id);
  };

  return (
    <span onClick={handleFavorite} className={styles.btn}>
      <BookmarkIcon />
    </span>
  );
};
