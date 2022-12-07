import clsx from "clsx";
import { searchModel } from "entities/search-window";
import { useToggler } from "shared/lib/hooks";
import { SearchIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

export const SearchButton = () => {
  const { open } = useToggler(searchModel.searchInstance);

  return (
    <button onClick={open} type="button" className={clsx("btn-reset", styles.btn)}>
      <SearchIcon />
    </button>
  );
};
