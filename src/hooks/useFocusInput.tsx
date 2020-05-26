import React from "react";

export default function useFocusInput() {
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  React.useLayoutEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  return inputRef;
}
