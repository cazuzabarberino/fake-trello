import React from "react";
import Coord from "../models/Coord";

export const useDnD = (rect: DOMRect) => {
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

  const rectRef = React.useRef(rect);

  const handleMouseMove = (ev: MouseEvent) => {
    // console.log("offset: ", mouseOffset.current);
    // console.log("blocking: ", blockUpdate.current);
    // console.log("================");

    mouseCoord.current.x = ev.clientX;
    mouseCoord.current.y = ev.clientY;

    settinPosition(ev.clientX, ev.clientY);
  };

  const settinPosition = (x: number, y: number) => {
    const posX = x - mouseOffset.current.x;
    const posY = y - mouseOffset.current.y;

    const relativeX = x - rectRef.current.x - mouseOffset.current.x;
    const relativeY = y - rectRef.current.y - mouseOffset.current.y;

    moveDirection.current.x = relativeX / Math.abs(relativeX) || 0;
    moveDirection.current.y = relativeY / Math.abs(relativeY) || 0;

    setCoord({
      x: posX,
      y: posY,
    });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    mouseOffset.current.x = event.clientX - rectRef.current.x;
    mouseOffset.current.y = event.clientY - rectRef.current.y;

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

  React.useEffect(() => {
    rectRef.current = rect;
  }, [rect]);

  return {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord: mouseCoord.current,
    moveDirection: moveDirection.current,
  };
};

export default useDnD;
