import { useUnit } from "effector-react/scope";
import { TogglerInstance } from "shared/lib/toggler";

export function useToggler(togglerInstance: TogglerInstance) {
  const { $isOpen, open, close, toggle } = togglerInstance;

  return useUnit({ isOpen: $isOpen, open, close, toggle });
}
