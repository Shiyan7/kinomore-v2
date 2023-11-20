import clsx from 'clsx';
import { headerModel } from 'widgets/header';
import { useToggler } from 'shared/lib/toggler';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const Burger = () => {
  const { open } = useToggler(headerModel.toggler);

  return (
    <button className={clsx('btn-reset', styles.btn)} onClick={open}>
      <Icon name="common/burger" />
    </button>
  );
};
