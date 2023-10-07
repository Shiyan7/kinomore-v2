import clsx from 'clsx';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const SearchButton = () => {
  const { open } = useToggler(searchModel.searchToggler);

  return (
    <button onClick={open} className={clsx('btn-reset', styles.btn)}>
      <Icon type="common" name="search" />
    </button>
  );
};
