import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/hooks';
import { Title, Modal, CloseIcon } from 'shared/ui';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const searchWindow = useToggler(searchModel.searchWindowToggler);
  const debouncedValue = useStore(searchModel.$debouncedValue);

  return (
    <Modal isOpen={searchWindow.isOpen} close={searchWindow.close} className={styles.window}>
      <button className={clsx('btn-reset', styles.close)} type="button" onClick={searchWindow.close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <SearchInput />
        {debouncedValue ? <SearchList /> : null}
      </div>
    </Modal>
  );
};
