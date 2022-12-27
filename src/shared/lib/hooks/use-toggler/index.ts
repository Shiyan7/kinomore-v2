import { useStore, useEvent } from "effector-react/scope";
import { TogglerInstance } from "shared/lib/toggler";

export const useToggler = (togglerInstance: TogglerInstance) => {
  const { $isOpen, ...togglerEvents } = togglerInstance;
  const isOpen = useStore($isOpen);
  const open = useEvent(togglerEvents.open);
  const close = useEvent(togglerEvents.close);
  const toggle = useEvent(togglerEvents.toggle);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
