import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Title, Modal } from 'shared/ui';
import { Icon } from 'shared/ui/icon';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const { isOpen, close } = useToggler(searchModel.toggler);
  const query = useStore(searchModel.$query);

  return (
    <Modal isOpen={isOpen} close={close} className={styles.window}>
      <button className={clsx('btn-reset', styles.close)} onClick={close}>
        <Icon name="common/close" />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="xl">
          Поиск
        </Title>
        <SearchInput />
        {query && <SearchList />}
      </div>
    </Modal>
  );
};
