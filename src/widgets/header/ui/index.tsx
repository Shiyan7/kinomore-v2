"use client";
import clsx from "clsx";
import { useHeaderFixed } from "../model";
import { Burger } from "./burger";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import { SearchButton } from "./search-button";
import styles from "./styles.module.scss";

export const Header = () => {
  const { isFixed } = useHeaderFixed();

  return (
    <header className={clsx(styles.header, isFixed && styles.fixed)}>
      <div className={clsx("container", styles.container)}>
        <div className={styles.row}>
          <Logo />
          <Nav />
        </div>
        <div className={styles.row}>
          <SearchButton />
          <Profile />
          <Burger />
        </div>
      </div>
    </header>
  );
};
