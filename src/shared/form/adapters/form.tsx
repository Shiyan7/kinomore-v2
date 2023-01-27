import type { HTMLAttributes, PropsWithChildren, SyntheticEvent } from 'react';

interface FormProps extends PropsWithChildren<HTMLAttributes<HTMLFormElement>> {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const Form = ({ onSubmit, children, ...props }: FormProps) => (
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
