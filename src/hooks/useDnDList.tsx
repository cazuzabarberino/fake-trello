import React from "react";
import Coord from "../models/Coord";
import TaskList from "../models/List";
import { listRects, rectInRangeX } from "../util";

export const useDnDList = (
  allLists: TaskList[],
  setAllLists: React.Dispatch<React.SetStateAction<TaskList[]>>
) => {
  const height = React.useRef(0);
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

  const listIndexRef = React.useRef(0);

  const onMouseDown = (
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => {
    mouseOffset.current = {
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
    };
    listIndexRef.current = listIndex;
    height.current = rect.height;
    setPosition(event.clientX, event.clientY);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const setPosition = React.useCallback((x: number, y: number) => {
    mouseCoord.current = { x, y };
    setCoord({ x: x - mouseOffset.current.x, y: y - mouseOffset.current.y });
  }, []);

  const mouseMove = React.useCallback(
    (ev: MouseEvent) => {
      setDragging(true);
      document.body.style.cursor = "grabbing";
      setPosition(ev.clientX, ev.clientY);
    },
    [setPosition]
  );

  const mouseUp = React.useCallback(() => {
    document.body.style.cursor = "auto";
    setDragging(false);
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const horizontalCheck = React.useCallback((toIndex: number): boolean => {
    if (
      toIndex < 0 ||
      toIndex > listRects.length - 1 ||
      !rectInRangeX(listRects[toIndex], mouseCoord.current)
    )
      return false;

    return true;
  }, []);

  const moveList = React.useCallback(
    (toIndex: number) => {
      const newList = [...allLists];

      const temp = newList[listIndexRef.current];
      newList[listIndexRef.current] = newList[toIndex];
      newList[toIndex] = temp;

      listIndexRef.current = toIndex;

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  React.useLayoutEffect(() => {
    if (dragging) {
      const relativeX =
        mouseCoord.current.x -
        mouseOffset.current.x -
        listRects[listIndexRef.current].x;

      const xDir = relativeX / Math.abs(relativeX) || 0;

      const toListIndex = listIndexRef.current + xDir;

      if (xDir && horizontalCheck(toListIndex)) {
        moveList(toListIndex);
      }
    }
  }, [dragging, coord, horizontalCheck, moveList]);

  return {
    beginDragList: onMouseDown,
    draggedListIndex: listIndexRef.current,
    draggingList: dragging,
    draggedListCoord: coord,
    height: height.current,
  };
};

export default useDnDList;
