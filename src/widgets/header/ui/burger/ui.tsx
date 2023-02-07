import clsx from 'clsx';
import { headerModel } from 'widgets/header';
import { useToggler } from 'shared/lib/toggler';
import { BurgerIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const Burger = () => {
  const { open } = useToggler(headerModel.menu);

  return (
    <button onClick={open} type="button" className={clsx('btn-reset', styles.btn)}>
      <BurgerIcon />
    </button>
  );
};
