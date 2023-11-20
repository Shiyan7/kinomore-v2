/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useState } from 'react';
import { movieModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Button, Title, Popup } from 'shared/ui';
import styles from './styles.module.scss';

export const GradeModal = () => {
  const [hover, setHover] = useState<number | null>(null);
  const rating = useStore(movieModel.$rating);
  const gradeToggler = useToggler(movieModel.gradeToggler);
  const ratingModalClosed = useEvent(movieModel.ratingModalClosed);
  const ratingSelected = useEvent(movieModel.ratingSelected);

  return (
    <Popup
      className={styles.modal}
      close={gradeToggler.close}
      isOpen={gradeToggler.isOpen}
    >
      <Title className={styles.title} size="large">
        Оцените по 10-ти бальной шкале
      </Title>
      <div className={styles.container}>
        <div className={styles.grades}>
          {[...Array(10)].map((_, idx) => {
            const ratingValue = idx + 1;

            const isActive = ratingValue <= (hover ?? rating);

            return (
              <label
                className={clsx(styles.label, isActive && styles.active)}
                key={idx}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                <input
                  hidden
                  onClick={() => ratingSelected({ rating: ratingValue })}
                  type="radio"
                  value={ratingValue}
                />
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
      <Button
        className={styles.btn}
        onClick={ratingModalClosed}
        rounded
        size="large"
        variant="white"
      >
        Поставить оценку
      </Button>
      <Popup.Close onClick={gradeToggler.close} />
    </Popup>
  );
};
