import type { HTMLAttributes, PropsWithChildren, SyntheticEvent } from 'react';

interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'>, PropsWithChildren {
  onSubmit: (payload: void) => void;
}

export const Form = ({ onSubmit, children, ...props }: FormProps) => (
  <form
    {...props}
    noValidate
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);
