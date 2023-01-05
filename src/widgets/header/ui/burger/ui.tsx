import clsx from 'clsx';
import { headerModel } from 'widgets/header';
import { useToggler } from 'shared/lib/hooks';
import { BurgerIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const Burger = () => {
  const { toggle } = useToggler(headerModel.menuInstance);

  return (
    <button onClick={toggle} type='button' className={clsx('btn-reset', styles.btn)}>
      <BurgerIcon />
    </button>
  );
};
