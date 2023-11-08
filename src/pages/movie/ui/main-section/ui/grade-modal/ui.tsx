/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { useState } from 'react';
import { movieModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Button, Title, Popup } from 'shared/ui';
import styles from './styles.module.scss';

export const GradeModal = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const gradeToggler = useToggler(movieModel.gradeToggler);

  return (
    <Popup className={styles.modal} isOpen={gradeToggler.isOpen} close={gradeToggler.close}>
      <Title size="large" className={styles.title}>
        Оцените по 10-ти бальной шкале
      </Title>
      <div className={styles.container}>
        <div className={styles.grades}>
          {[...Array(10)].map((_, idx) => {
            const ratingValue = idx + 1;

            const isActive = ratingValue <= (hover ?? rating);

            return (
              <label
                key={idx}
                className={clsx(styles.label, isActive && styles.active)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
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
      <Button onClick={gradeToggler.close} className={styles.btn} variant="white" rounded size="large">
        Поставить оценку
      </Button>
      <Popup.Close onClick={gradeToggler.close} />
    </Popup>
  );
};
