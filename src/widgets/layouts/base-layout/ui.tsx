"use client";
import "normalize.css";
import "app/styles/index.scss";
import { PropsWithChildren } from "react";
import { Header } from "widgets/header";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};
