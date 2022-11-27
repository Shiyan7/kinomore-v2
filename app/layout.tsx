import "normalize.css";
import "app/styles/index.scss";
import { FC, PropsWithChildren } from "react";
import { BaseLayout } from "shared/ui/layouts";
import clsx from "clsx";
import localFont from "@next/font/local";

const font = localFont({
  display: "swap",
  src: [
    { path: "./fonts/e-Ukraine-Bold.woff2", weight: "700" },
    { path: "./fonts/e-Ukraine-Regular.woff2", weight: "400" },
    { path: "./fonts/e-Ukraine-Light.woff2", weight: "300" },
  ],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className={clsx("page", font.className)} lang="ru">
      <head />
      <body className="page__body">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
};
export default RootLayout;
