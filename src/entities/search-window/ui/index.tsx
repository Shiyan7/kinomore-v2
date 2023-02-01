import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { useToggler } from 'shared/lib/toggler';
import { Title, Modal, CloseIcon } from 'shared/ui';
import { SearchInput } from './search-input';
import { SearchList } from './search-list';
import styles from './styles.module.scss';

export const SearchWindow = () => {
  const { movies, persons } = useStore(searchModel.$searchResult);
  const searchWindow = useToggler(searchModel.searchWindow);
  const debouncedValue = useStore(searchModel.$debouncedValue);
  const pending = useStore(searchModel.$pending);
  const searchHasResults = movies?.length || persons?.length;
  const noResultsCondition = !searchHasResults && !pending && !!debouncedValue;

  const NoResultsMessage = (
    <>
      <Title className={styles.caption} size="small">
        Ничего не нашлось
      </Title>
      <p className={styles.desc}>Может быть, вы ищете то, чего пока нет в каталоге</p>
    </>
  );

  return (
    <Modal isOpen={searchWindow.isOpen} close={searchWindow.close} className={styles.window}>
      <button className={clsx('btn-reset', styles.close)} type="button" onClick={searchWindow.close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="xl">
          Поиск
        </Title>
        <SearchInput />
        {noResultsCondition ? NoResultsMessage : debouncedValue && <SearchList />}
      </div>
    </Modal>
  );
};
