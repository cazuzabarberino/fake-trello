import React from "react";

export const useElementRect = (
  index: number
): [DOMRect, React.MutableRefObject<HTMLDivElement | null>] => {
  const [rect, setRect] = React.useState<DOMRect>(new DOMRect());
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (elementRef.current) setRect(elementRef.current.getBoundingClientRect());
  }, [index]);

  return [rect, elementRef];
};

export default useElementRect;
