import React from "react";

export default function useFocusInput<
  T extends HTMLInputElement | HTMLTextAreaElement
>() {
  const inputRef = React.useRef<null | T>(null);

  React.useLayoutEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  return inputRef;
}
