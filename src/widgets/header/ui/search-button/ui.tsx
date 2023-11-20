import clsx from 'clsx';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const SearchButton = () => {
  const { open } = useToggler(searchModel.toggler);

  return (
    <button className={clsx('btn-reset', styles.btn)} onClick={open}>
      <Icon name="common/search" />
    </button>
  );
};
