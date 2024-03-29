import { useUnit } from 'effector-react';
import type { FormEvent } from 'react';
import { useEffect, useRef } from 'react';
import { searchModel } from 'entities/search-window';
import { Input } from 'shared/ui/input';
import styles from './styles.module.scss';

export const SearchInput = () => {
  const { search, searchChanged } = useUnit({
    search: searchModel.$search,
    searchChanged: searchModel.searchChanged,
  });

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
        className={styles.input}
        onChange={(e) => searchChanged(e.target.value)}
        onClear={handleClear}
        placeholder="Фильмы, сериалы, мультфильмы"
        ref={inputRef}
        value={search}
      />
    </form>
  );
};
