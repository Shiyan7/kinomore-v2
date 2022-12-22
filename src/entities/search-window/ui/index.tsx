"use client";
import clsx from "clsx";
import { useEvent, useStore } from "effector-react";
import { searchModel } from "entities/search-window";
import { useToggler } from "shared/lib/hooks";
import { Title, Modal, Input, Icons } from "shared/ui";
import { useToggleFocus } from "../useToggleFocus";
import { SearchItem } from "./item";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchModel.searchInstance);
  const { ref } = useToggleFocus(isOpen);
  const searchResult = useStore(searchModel.$searchResult);
  const search = useStore(searchModel.$search);
  const searchChanged = useEvent(searchModel.searchChanged);

  return (
    <Modal isOpen={isOpen} close={close} className={clsx(styles.window, isOpen && styles.opened)}>
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <Icons.CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <Input
          ref={ref}
          value={search}
          onChange={(e) => searchChanged(e.target.value)}
          className={styles.input}
          placeholder="Фильмы, сериалы, персоны"
        />
        <ul className={clsx("list-reset", styles.list)}>
          {search.length > 1 && searchResult?.docs?.map((item) => <SearchItem key={item.id} item={item} />)}
        </ul>
      </div>
    </Modal>
  );
};
