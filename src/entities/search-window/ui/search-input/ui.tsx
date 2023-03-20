import { useStore, useEvent } from 'effector-react';
import { FormEvent, useEffect, useRef } from 'react';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
  };

  const handleClear = () => {
    searchChanged('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        value={search}
        onClear={handleClear}
        onChange={(e) => searchChanged(e.target.value)}
        className={styles.input}
        placeholder="Фильмы, сериалы, мультфильмы"
      />
    </form>
  );
};
