import React from "react";

export const useElementRect = (
  index?: number
): [DOMRect, React.MutableRefObject<HTMLDivElement | null>] => {
  const [rect, setRect] = React.useState<DOMRect>(new DOMRect());
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  const getRect = () => {
    if (elementRef.current) setRect(elementRef.current.getBoundingClientRect());
  };

  React.useLayoutEffect(() => {
    getRect();
  }, []);

  React.useLayoutEffect(() => {
    getRect();
  }, [index]);

  return [rect, elementRef];
};

export default useElementRect;
