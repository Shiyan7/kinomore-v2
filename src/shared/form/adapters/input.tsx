import { forwardRef } from 'react';
import { Input as NativeInput, InputProps as NativeInputProps } from 'shared/ui/input';

interface InputProps extends Omit<NativeInputProps, 'onChange'> {
  onChange: (value: string) => void;
  focused?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ onChange, focused, ...props }, ref) => {
  return <NativeInput ref={ref} onChange={(e) => onChange(e.target.value)} {...props} />;
});
