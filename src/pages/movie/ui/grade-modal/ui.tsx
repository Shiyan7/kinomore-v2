import clsx from 'clsx';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Title } from 'shared/ui/title';
import { Popup } from 'shared/ui/popup';
import { Button, CloseIcon, DislikeIcon, LikeIcon } from 'shared/ui';
import styles from './styles.module.scss';

export const GradeModal = () => {
  const gradeModal = useToggler(pageModel.gradeModalToggler);

  return (
    <Popup onClick={gradeModal.close} className={styles.modal} isOpen={gradeModal.isOpen} close={gradeModal.close}>
      <Title size="small" className={styles.title}>
        Как вам сериал?
      </Title>
      <p className={styles.desc}>Оценки улучшают рекомендации</p>
      <div className={styles.btns}>
        <Button
          success
          onClick={gradeModal.close}
          size="small"
          className={clsx(styles.btn, styles.like)}
          endIcon={<LikeIcon />}>
          Нравится
        </Button>
        <Button
          error
          onClick={gradeModal.close}
          size="small"
          className={clsx(styles.btn, styles.dislike)}
          endIcon={<DislikeIcon />}>
          Не нравится
        </Button>
      </div>
      <button onClick={gradeModal.close} className={clsx('btn-reset', styles.close)}>
        <CloseIcon />
      </button>
    </Popup>
  );
};
