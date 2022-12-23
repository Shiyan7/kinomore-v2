import { useRef, useEffect } from "react";

export function useToggleFocus(condition: boolean) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (condition) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [condition]);

  return {
    ref,
  };
}
