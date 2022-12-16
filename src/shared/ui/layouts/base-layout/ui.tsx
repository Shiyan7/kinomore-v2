import { PropsWithChildren } from "react";
import { Header } from "widgets/header";
import { AuthWindow } from "features/auth";
import { SearchWindow } from "entities/search-window";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <SearchWindow />
      <AuthWindow />
    </>
  );
};
