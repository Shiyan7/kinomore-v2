import { useEvent, useStore } from "effector-react";
import { useToggleFocus, searchModel } from "entities/search-window";
import { useToggler } from "shared/lib/hooks";
import { Input } from "shared/ui/input";
import styles from "./styles.module.scss";

export const SearchInput = () => {
  const { isOpen } = useToggler(searchModel.searchInstance);
  const { ref } = useToggleFocus(isOpen);
  const search = useStore(searchModel.$search);
  const searchChanged = useEvent(searchModel.searchChanged);

  return (
    <Input
      ref={ref}
      value={search}
      onClear={() => searchChanged("")}
      onChange={(e) => searchChanged(e.target.value)}
      className={styles.input}
      placeholder="Фильмы, сериалы, персоны"
    />
  );
};
