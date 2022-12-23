import clsx from "clsx";
import { useStore } from "effector-react";
import { searchModel } from "entities/search-window";
import { Spinner } from "shared/ui";
import { SearchItem } from "../search-item";
import styles from "./styles.module.scss";

export const SearchList = () => {
  const searchResult = useStore(searchModel.$searchResult);
  const search = useStore(searchModel.$search);
  const pending = useStore(searchModel.searchFx.pending);
  const searchHasResults = search.length > 2;

  const SearchList = (
    <ul className={clsx("list-reset", styles.list)}>
      {searchHasResults && searchResult?.docs?.map((item) => <SearchItem key={item.id} item={item} />)}
    </ul>
  );

  const Loader = (
    <div className={styles.loader}>
      <Spinner strokeWidth={2} />
    </div>
  );

  return searchHasResults && pending ? Loader : SearchList;
};
