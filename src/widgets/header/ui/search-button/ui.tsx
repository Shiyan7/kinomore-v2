import clsx from 'clsx';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { SearchIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const SearchButton = () => {
  const { open } = useToggler(searchModel.toggler);

  return (
    <button onClick={open} className={clsx('btn-reset', styles.btn)}>
      <SearchIcon />
    </button>
  );
};
