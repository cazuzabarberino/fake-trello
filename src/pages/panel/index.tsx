import React from "react";
import CardList from "../../components/cardlist";
import TaskList from "../../models/List";
import { Container, ListContainter, FakeCard } from "./styles";
import shortid from "shortid";
import Coord from "../../models/Coord";
import { initTaskRect, taskRects } from "../../util";

interface Props {}

const mock = [
  {
    title: "Backlog",
    tasks: [
      "backlog task",
      "anothter backlog task",
      "very long task with a lot of blank space to test the text wrapper",
      "A very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong task",
    ],
  },
  {
    title: "To dos",
    tasks: ["a todo task"],
  },
  {
    title: "Done",
    tasks: ["a done task"],
  },
];

const rectInRangeX = (rect: DOMRect, coord: Coord): boolean => {
  return coord.x >= rect.x && coord.x <= rect.x + rect.width;
};

const rectInRangeY = (
  rect: DOMRect,
  coord: Coord,
  yDirection: number
): boolean => {
  return yDirection > 0
    ? coord.y >= rect.y + rect.height * 0.6
    : coord.y <= rect.y + rect.height * 0.4;
};

const Panel = (props: Props) => {
  if (!taskRects)
    initTaskRect(mock.map((list) => list.tasks.map((_) => new DOMRect())));

  const [allLists, setAllLists] = React.useState<TaskList[]>(() => {
    return mock.map((list) => ({
      ...list,
      id: shortid.generate(),
      tasks: list.tasks.map((task) => ({
        id: shortid.generate(),
        title: task,
      })),
    }));
  });

  const rects = React.useRef<DOMRect[]>(new Array(mock.length));

  const saveRect = React.useCallback((index: number, rect: DOMRect) => {
    rects.current[index] = rect;
  }, []);

  const draggingList = React.useCallback(
    (draggedIndex: number) => (
      xDirection: number,
      mouseCoord: Coord
    ): boolean => {
      const indexOff = draggedIndex + xDirection;

      if (
        indexOff < 0 ||
        indexOff >= allLists.length ||
        !rectInRangeX(rects.current[indexOff], mouseCoord)
      )
        return false;

      const newArr = [...allLists];
      const tmp = newArr[indexOff];
      newArr[indexOff] = newArr[draggedIndex];
      newArr[draggedIndex] = tmp;

      setAllLists(newArr);
      return true;
    },
    [allLists]
  );

  //--------------------------
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

    setTaskDragging(true);
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
      toIndex > rects.current.length - 1 ||
      !rectInRangeX(rects.current[toIndex], mouseCoord.current)
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
        rects.current[dragIndexes.current.listIndex].x;

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

  //--------------------------

  return (
    <Container>
      <ListContainter>
        {allLists.map((list, index) => (
          <CardList
            draggingList={draggingList(index)}
            saveRect={saveRect}
            key={list.id}
            listIndex={index}
            list={list}
            beginTaskDrag={beginTaskDrag}
          />
        ))}
      </ListContainter>
      <FakeCard
        style={
          taskDragging
            ? {
                left: coord.x,
                top: coord.y,
              }
            : {
                left: 0,
                top: 0,
              }
        }
      />
    </Container>
  );
};

export default Panel;
