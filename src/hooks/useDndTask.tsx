import React from "react";
import Coord from "../models/Coord";
import { taskRects, rectInRangeY, rectInRangeX, listRects } from "../util";
import TaskList from "../models/List";

export const useDndTask = (
  allLists: TaskList[],
  setAllLists: React.Dispatch<React.SetStateAction<TaskList[]>>
) => {
  const [taskDragging, setTaskDragging] = React.useState(false);
  const [coord, setCoord] = React.useState<Coord>({
    x: 0,
    y: 0,
  });

  const mouseOffset = React.useRef<Coord>({
    x: 0,
    y: 0,
  });

  const mouseCoord = React.useRef<Coord>({
    x: 0,
    y: 0,
  });

  const dragIndexes = React.useRef({
    taskIndex: 0,
    listIndex: 0,
  });

  const beginTaskDrag = (
    taskIndex: number,
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => {
    mouseOffset.current = {
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
    };
    dragIndexes.current = {
      taskIndex,
      listIndex,
    };

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
      setTaskDragging(true);
      setPosition(ev.clientX, ev.clientY);
    },
    [setPosition]
  );

  const mouseUp = React.useCallback(() => {
    setTaskDragging(false);
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

  const moveTaskHorizontally = (toIndex: number) => {
    const newList = [...allLists];

    newList[toIndex].tasks.push(
      newList[dragIndexes.current.listIndex].tasks[
        dragIndexes.current.taskIndex
      ]
    );

    newList[dragIndexes.current.listIndex].tasks.splice(
      dragIndexes.current.taskIndex,
      1
    );

    dragIndexes.current = {
      listIndex: toIndex,
      taskIndex: newList[toIndex].tasks.length - 1,
    };

    setAllLists(newList);
  };

  const verticalCheck = React.useCallback(
    (toTaskIndex: number, yDir: number): boolean => {
      if (
        toTaskIndex < 0 ||
        toTaskIndex >
          allLists[dragIndexes.current.listIndex].tasks.length - 1 ||
        !rectInRangeY(
          taskRects[dragIndexes.current.listIndex][toTaskIndex],
          mouseCoord.current,
          yDir
        )
      )
        return false;

      return true;
    },
    []
  );

  const moveTaskVertically = (toTaskIndex: number) => {
    const newList = [...allLists];

    const tmp =
      newList[dragIndexes.current.listIndex].tasks[
        dragIndexes.current.taskIndex
      ];

    newList[dragIndexes.current.listIndex].tasks[
      dragIndexes.current.taskIndex
    ] = newList[dragIndexes.current.listIndex].tasks[toTaskIndex];

    newList[dragIndexes.current.listIndex].tasks[toTaskIndex] = tmp;

    dragIndexes.current.taskIndex = toTaskIndex;

    setAllLists(newList);
  };

  React.useLayoutEffect(() => {
    if (taskDragging) {
      const relativeX =
        mouseCoord.current.x -
        mouseOffset.current.x -
        listRects[dragIndexes.current.listIndex].x;

      const relativeY =
        mouseCoord.current.y -
        mouseOffset.current.y -
        taskRects[dragIndexes.current.listIndex][dragIndexes.current.taskIndex]
          .y;

      const xDir = relativeX / Math.abs(relativeX) || 0;
      const yDir = relativeY / Math.abs(relativeY) || 0;

      const toListIndex = dragIndexes.current.listIndex + xDir;
      const toTaskIndex = dragIndexes.current.taskIndex + yDir;

      if (xDir && horizontalCheck(toListIndex)) {
        moveTaskHorizontally(toListIndex);
      } else if (yDir && verticalCheck(toTaskIndex, yDir)) {
        moveTaskVertically(toTaskIndex);
      }
    }
  }, [taskDragging, coord, horizontalCheck, moveTaskHorizontally]);

  return {
    taskDragging,
    coord,
    beginTaskDrag,
    dragIndexes: dragIndexes.current,
  };
};
