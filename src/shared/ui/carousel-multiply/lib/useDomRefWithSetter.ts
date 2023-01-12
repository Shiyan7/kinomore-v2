import { Ref, useEffect, useRef, useState } from 'react';

export function useDomRefWithSetter<T extends HTMLElement>(): [T | null, Ref<T>] {
  const ref = useRef<T>(null);
  const [DOMRef, setRefState] = useState<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      setRefState(ref.current);
    }
  }, []);

  return [DOMRef, ref];
}
