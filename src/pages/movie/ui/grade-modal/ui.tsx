import clsx from 'clsx';
import { useState } from 'react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Button } from 'shared/ui/button';
import { Title } from 'shared/ui/title';
import { Popup } from 'shared/ui/popup';
import styles from './styles.module.scss';

const AMOUNT_GRADES = 10;

export const GradeModal = () => {
  const gradeModal = useToggler(pageModel.gradeModalToggler);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Popup
      rootClassName={styles.root}
      onClick={gradeModal.close}
      className={styles.modal}
      isOpen={gradeModal.isOpen}
      close={gradeModal.close}>
      <Title size="medium" className={styles.title}>
        Оцените фильм по {AMOUNT_GRADES}-ти бальной шкале
      </Title>
      <div className={styles.container}>
        <div className={styles.grades}>
          {[...Array(AMOUNT_GRADES)].map((_, idx) => {
            const ratingValue = idx + 1;

            const isActive = ratingValue <= (hover || rating);

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
      <Button className={styles.btn} variant="white" rounded size="large">
        Поставить оценку
      </Button>
      <Popup.Close onClick={gradeModal.close} />
    </Popup>
  );
};
