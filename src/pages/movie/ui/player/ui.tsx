import { useRouter } from "next/router";
import { PlayIcon, Button, BookmarkIcon, ExportIcon } from "shared/ui";
import styles from "./styles.module.scss";

export const Player = () => {
  const { query } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <iframe
          title="Плеер"
          src={`https://voidboost.net/embed/${query.id}?poster=1&nocontinue=1&poster_id=4&df=1`}
          allow="autoplay"
          className={styles.iframe}
          allowFullScreen
        />
      </div>
      <div className={styles.btns}>
        <Button variant="glass" className={styles.btn} startIcon={<PlayIcon />}>
          Трейлер
        </Button>
        <Button variant="glass" className={styles.btn} aria-label="В избранное">
          <BookmarkIcon />
        </Button>
        <Button variant="glass" className={styles.btn} aria-label="Поделиться">
          <ExportIcon />
        </Button>
      </div>
    </div>
  );
};
