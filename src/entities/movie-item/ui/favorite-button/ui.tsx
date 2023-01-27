import type { MouseEvent } from 'react';
import { BookmarkIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface FavoriteButtonProps {
  id: number | undefined;
}

export const FavoriteButton = ({ id }: FavoriteButtonProps) => {
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
