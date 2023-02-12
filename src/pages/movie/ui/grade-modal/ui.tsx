import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel, getMovieType } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Button, Title, Popup } from 'shared/ui';
import styles from './styles.module.scss';

const AMOUNT_GRADES = 10;

export const GradeModal = () => {
  const { close, isOpen } = useToggler(pageModel.gradeModal);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const data = useStore(pageModel.$movie);

  return (
    <Popup className={styles.modal} isOpen={isOpen} close={close}>
      <Title className={styles.title}>
        Оцените {getMovieType(data?.type)} по {AMOUNT_GRADES}-ти бальной шкале
      </Title>
      <div className={styles.container}>
        <div className={styles.grades}>
          {[...Array(AMOUNT_GRADES)].map((_, idx) => {
            const ratingValue = idx + 1;

            const isActive = ratingValue <= (hover ?? rating);

            return (
              <label
                key={idx}
                className={clsx(styles.label, isActive && styles.active)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}>
                <input hidden type="radio" value={ratingValue} onClick={() => setRating(ratingValue)} />
                {ratingValue}
              </label>
            );
          })}
        </div>
        <div className={styles.row}>
          <span className={styles.caption}>Очень плохо</span>
          <span className={styles.caption}>Отлично</span>
        </div>
      </div>
      <Button onClick={close} className={styles.btn} variant="white" rounded size="large">
        Поставить оценку
      </Button>
      <Popup.Close onClick={close} />
    </Popup>
  );
};
