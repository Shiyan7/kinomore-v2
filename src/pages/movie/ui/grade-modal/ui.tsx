import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Popup } from 'shared/ui/popup';
import styles from './styles.module.scss';

export const GradeModal = () => {
  const gradeModal = useToggler(pageModel.gradeModalToggler);

  return (
    <Popup onClick={gradeModal.close} className={styles.modal} isOpen={gradeModal.isOpen} close={gradeModal.close}>
      123
    </Popup>
  );
};
