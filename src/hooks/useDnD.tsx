import React from "react";
import Coord from "../models/Coord";

export const useDnD = (
  elementRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [coord, setCoord] = React.useState<Coord>({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = React.useState(false);

  const mouseCoord = React.useRef<Coord>({
    x: 0,
    y: 0,
  });

  const mouseOffset = React.useRef({
    x: 0,
    y: 0,
  });

  const moveDirection = React.useRef({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const rect = (elementRef.current as HTMLDivElement).getBoundingClientRect();
    mouseOffset.current.x = event.clientX - rect.x;
    mouseOffset.current.y = event.clientY - rect.y;
    settinPosition(event.clientX, event.clientY);
    setDragging(true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    setCoord({ x: 0, y: 0 });
    setDragging(false);
  };

  const handleMouseMove = (ev: MouseEvent) => {
    mouseCoord.current.x = ev.clientX;
    mouseCoord.current.y = ev.clientY;
    settinPosition(ev.clientX, ev.clientY);
  };

  const settinPosition = (x: number, y: number) => {
    const posX = x - mouseOffset.current.x;
    const posY = y - mouseOffset.current.y;
    const rect = (elementRef.current as HTMLDivElement).getBoundingClientRect();
    const relativeX = x - rect.x - mouseOffset.current.x;
    const relativeY = y - rect.y - mouseOffset.current.y;
    moveDirection.current.x = relativeX / Math.abs(relativeX) || 0;
    moveDirection.current.y = relativeY / Math.abs(relativeY) || 0;
    setCoord({
      x: posX,
      y: posY,
    });
  };

  return {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord: mouseCoord.current,
    moveDirection: moveDirection.current,
  };
};

export default useDnD;
