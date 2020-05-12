import React from "react";

export const useElementRect = () => {
  const [rect, setRect] = React.useState<DOMRect>(new DOMRect());
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (elementRef.current) setRect(elementRef.current.getBoundingClientRect());
  }, []);

  return { rect, elementRef };
};

export default useElementRect;
