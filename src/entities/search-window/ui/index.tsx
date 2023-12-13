import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Title, Modal } from 'shared/ui';
import { Icon } from 'shared/ui/icon';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const { isOpen, close } = useToggler(searchModel.toggler);
  const { query } = useUnit({ query: searchModel.$query });

  return (
    <Modal className={styles.window} close={close} isOpen={isOpen}>
      <button className={clsx('btn-reset', styles.close)} onClick={close}>
        <Icon name="common/close" />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="xl">
          Поиск
        </Title>
        <SearchInput />
        {query ? <SearchList /> : null}
      </div>
    </Modal>
  );
};
