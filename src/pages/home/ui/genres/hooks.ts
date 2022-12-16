import { useEffect, useState } from "react";

export function useScroll(node: HTMLElement | null) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollLeft = node?.scrollLeft;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isScrolled = scrollLeft! > 0;

      setIsScrolled(isScrolled);
    };

    node?.addEventListener("scroll", onScroll);

    return () => node?.removeEventListener("scroll", onScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isScrolled,
    setIsScrolled,
  };
}
