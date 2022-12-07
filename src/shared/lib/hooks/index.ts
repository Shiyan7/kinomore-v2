import { useUnit } from "effector-react";
import { TogglerInstance } from "shared/lib/toggler";

export const useToggler = (togglerInstance: TogglerInstance) => {
  const { $isOpen, open, close, toggle } = togglerInstance;

  return useUnit({ isOpen: $isOpen, open, close, toggle });
};
