import { useRouter } from "next/router";
import { PlayIcon, Button } from "shared/ui";
import styles from "./styles.module.scss";

export const Player = () => {
  const { query } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <iframe
          title="Смотреть"
          src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
          allow="autoplay"
          className={styles.iframe}
          allowFullScreen
        />
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn} startIcon={<PlayIcon />}>
          Трейлер
        </Button>
      </div>
    </div>
  );
};
