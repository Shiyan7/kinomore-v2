import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Title, Modal } from 'shared/ui';
import { CloseIcon } from 'shared/ui/icons';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const toggler = useToggler(searchModel.toggler);
  const debouncedValue = useStore(searchModel.$debouncedValue);

  return (
    <Modal isOpen={toggler.isOpen} close={toggler.close} className={styles.window}>
      <button className={clsx('btn-reset', styles.close)} onClick={toggler.close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="xl">
          Поиск
        </Title>
        <SearchInput />
        {debouncedValue && <SearchList />}
      </div>
    </Modal>
  );
};
