import { PropsWithChildren } from "react";
import { Header } from "widgets/header";
import { BottomNavigation } from "widgets/bottom-navigation";
import { SearchWindow } from "entities/search-window";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <BottomNavigation />
      <SearchWindow />
    </>
  );
};
