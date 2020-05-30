import React from "react";

export default function useKeyMouseToSaveClose(
  save: () => void,
  close: () => void
) {
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const pauseRef = React.useRef<boolean>(false);

  React.useLayoutEffect(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      switch (ev.key) {
        case "Enter":
          save();
          break;
        case "Escape":
          close();
          break;
        default:
          break;
      }
    }

    function mouseUpHandler(ev: MouseEvent) {
      if (pauseRef.current) return;
      const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect();

      if (
        ev.clientX < rect.x ||
        ev.clientX > rect.x + rect.width ||
        ev.clientY < rect.y ||
        ev.clientY > rect.y + rect.height
      ) {
        save();
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", mouseUpHandler, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", mouseUpHandler, true);
    };
  }, [save, close]);

  return { containerRef, pauseRef };
}
