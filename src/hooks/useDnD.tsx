import React from "react";
import Coord from "../models/Coord";

export const useDnD = (rect: DOMRect) => {
  const [coord, setCoord] = React.useState<Coord>({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = React.useState(false);

  const globalCoord = React.useRef<Coord>({
    x: 0,
    y: 0,
  });

  const mouseOffset = React.useRef({
    x: 0,
    y: 0,
  });

  const mouseLocalOffset = React.useRef({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (ev: MouseEvent) => {
    // console.log("offset: ", mouseOffset.current);
    // console.log("blocking: ", blockUpdate.current);
    // console.log("================");

    globalCoord.current.x = ev.clientX;
    globalCoord.current.y = ev.clientY;

    const relativeX = ev.clientX - mouseOffset.current.x;
    const relativeY = ev.clientY - mouseOffset.current.y;

    setCoord({
      x: relativeX,
      y: relativeY,
    });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    mouseOffset.current.x = event.clientX;
    mouseOffset.current.y = event.clientY;

    mouseLocalOffset.current.x = event.clientX - rect.x;
    mouseLocalOffset.current.y = event.clientY - rect.y;

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
    mouseOffset.current.x = mouseLocalOffset.current.x + rect.x;
    mouseOffset.current.y = mouseLocalOffset.current.y + rect.y;
    // console.log("updating offset...");
    // console.log("mouseOffset ", mouseOffset);
    // console.log("localoffset ", mouseLocalOffset);
    // console.log("rect ", rect);
  }, [rect]);


  return {
    coord,
    dragging,
    handleMouseDown,
    globalCoord: globalCoord.current,
    mouseOffset,
    
  };
};

export default useDnD;
