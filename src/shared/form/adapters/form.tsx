import type { FC, HTMLAttributes, PropsWithChildren, SyntheticEvent } from "react";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const Form: FC<PropsWithChildren<FormProps>> = ({ onSubmit, children, ...props }) => (
  <form
    {...props}
    noValidate
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}>
    {children}
  </form>
);
