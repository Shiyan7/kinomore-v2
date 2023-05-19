import clsx from 'clsx';
import { headerModel } from 'widgets/header';
import { useToggler } from 'shared/lib/toggler';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const Burger = () => {
  const { open } = useToggler(headerModel.toggler);

  return (
    <button onClick={open} className={clsx('btn-reset', styles.btn)}>
      <Icon type="common" name="burger" />
    </button>
  );
};
