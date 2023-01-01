import clsx from "clsx";
import { useUnit } from "effector-react";
import { searchModel } from "entities/search-window";
import { Spinner } from "shared/ui";
import { SearchItem } from "../search-item";
import styles from "./styles.module.scss";

export const SearchList = () => {
  const searchResult = useUnit(searchModel.$searchResult);
  const pending = useUnit(searchModel.searchFx.pending);

  const SearchList = (
    <ul className={clsx("list-reset", styles.list)}>
      {searchResult?.docs?.map((item) => (
        <SearchItem key={item.id} item={item} />
      ))}
    </ul>
  );

  const Loader = (
    <div className={styles.loader}>
      <Spinner strokeWidth={2} />
    </div>
  );

  return pending ? Loader : SearchList;
};
