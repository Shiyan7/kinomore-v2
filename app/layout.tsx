import { ReactNode } from "react";
import { BaseLayout } from "widgets/layouts/base-layout";
import clsx from "clsx";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html className={clsx("page")} lang="ru">
      <head />
      <body className="page__body">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
};
export default RootLayout;
