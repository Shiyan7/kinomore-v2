import { useStore, useEvent } from 'effector-react';
import { useEffect, useRef } from 'react';
import { searchModel } from 'entities/search-window';
import { Input } from 'shared/ui/input';
import styles from './styles.module.scss';

export const SearchInput = () => {
  const search = useStore(searchModel.$search);
  const searchChanged = useEvent(searchModel.searchChanged);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={search}
      onClear={() => searchChanged('')}
      onChange={(e) => searchChanged(e.target.value)}
      className={styles.input}
      placeholder="Фильмы, сериалы, персоны"
    />
  );
};
