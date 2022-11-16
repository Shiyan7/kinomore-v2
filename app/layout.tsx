import { FC, PropsWithChildren } from "react";
import { BaseLayout } from "widgets/layouts/base-layout";
import clsx from "clsx";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
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
