import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Title, Modal, CloseIcon } from 'shared/ui';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchModel.searchWindow);
  const debouncedValue = useStore(searchModel.$debouncedValue);

  return (
    <Modal isOpen={isOpen} close={close} className={styles.window}>
      <button className={clsx('btn-reset', styles.close)} type="button" onClick={close}>
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
