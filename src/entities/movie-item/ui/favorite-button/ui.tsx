import clsx from "clsx";
import type { FC, MouseEvent } from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

interface FavoriteButtonProps {
  id: number | undefined;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ id }) => {
  /* FIXME: получать значение с api */
  const isFavorite = false;

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("add to favorites", id);
  };

  return (
    <button onClick={handleFavorite} className={clsx("btn-reset", styles.btn)}>
      {isFavorite ? <BookmarkSlashIcon /> : <BookmarkIcon />}
    </button>
  );
};
