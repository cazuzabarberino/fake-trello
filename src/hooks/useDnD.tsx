import React from "react";
import Coord from "../models/Coord";

const MouseOffset = {
  x: 0,
  y: 0,
};

export const useDnD = () => {
  const [coord, setCoord] = React.useState<Coord>({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = React.useState(false);

  const handleMouseMove = (ev: MouseEvent) => {
    const relativeX = ev.clientX - MouseOffset.x;
    const relativeY = ev.clientY - MouseOffset.y;
    setCoord({
      x: relativeX,
      y: relativeY,
    });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    MouseOffset.x = event.clientX;
    MouseOffset.y = event.clientY;
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

  return { coord, dragging, handleMouseDown };
};

export default useDnD;
