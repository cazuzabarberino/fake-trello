import React from "react";
import TaskList from "../../models/List";
import Task from "../../models/Task";
import { Container, ListContainter } from "./styles";
import shortid from "shortid";
import Coord from "../../models/Coord";
import CardList from "../../components/cardlist";
import { panelConfig } from "../../styles";

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

const Panel = (props: Props) => {
  const [taskLists, setTaskLists] = React.useState<TaskList[]>(() => {
    return mock.map((list, index) => ({
      ...list,
      id: shortid.generate(),
      index,
    }));
  });

  const [taskCards, setTaskCards] = React.useState<Task[]>(() =>
    mock
      .map((list, listIndex) =>
        list.tasks.map<Task>((task, taskIndex) => ({
          id: shortid.generate(),
          title: task,
          listIndex,
          taskIndex,
        }))
      )
      .flat()
  );

  const listRects = React.useRef<DOMRect[]>(new Array(taskLists.length));
  const taskRects = React.useRef<DOMRect[]>(new Array(taskCards.length));

  const [containerRect, setContainerRect] = React.useState<DOMRect>(
    new DOMRect()
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    setContainerRect(
      (containerRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, []);

  // const draggingList = React.useCallback(
  //   (draggedIndex: number) => (
  //     xDirection: number,
  //     mouseCoord: Coord
  //   ): boolean => {
  //     const indexOff = draggedIndex + xDirection;

  //     if (
  //       indexOff < 0 ||
  //       indexOff >= taskLists.length ||
  //       !rectInRangeX(rects.current[indexOff], mouseCoord)
  //     )
  //       return false;

  //     const newArr = [...taskLists];
  //     const tmp = newArr[indexOff];
  //     newArr[indexOff] = newArr[draggedIndex];
  //     newArr[draggedIndex] = tmp;

  //     setTaskLists(newArr);
  //     return true;
  //   },
  //   [taskLists]
  // );

  // const draggingTaskToOtherList = React.useCallback(
  //   (
  //     taskIndex: number,
  //     listIndex: number,
  //     xDirection: number,
  //     mouseCoord: Coord
  //   ): boolean => {
  //     const indexOff = listIndex + xDirection;

  //     if (
  //       indexOff < 0 ||
  //       indexOff >= taskLists.length ||
  //       !rectInRangeX(rects.current[indexOff], mouseCoord)
  //     )
  //       return false;

  //     const newArr = [...taskLists];
  //     const task = newArr[listIndex].tasks[taskIndex];
  //     newArr[listIndex].tasks.splice(taskIndex, 1);
  //     newArr[indexOff].tasks.push(task);

  //     setTaskLists(newArr);
  //     return true;
  //   },
  //   [taskLists]
  // );

  // const swapChild = React.useCallback(
  //   (listIndex: number, taskIndex1: number, taskIndex2: number) => {
  //     const newArr = [...taskLists];
  //     const tmp = newArr[listIndex].tasks[taskIndex1];
  //     newArr[listIndex].tasks[taskIndex1] = newArr[listIndex].tasks[taskIndex2];
  //     newArr[listIndex].tasks[taskIndex2] = tmp;

  //     setTaskLists(newArr);
  //   },
  //   [taskLists]
  // );

  // const saveRect = React.useCallback((index: number, rect: DOMRect) => {
  //   rects.current[index] = rect;
  // }, []);

  return (
    <Container>
      <ListContainter ref={containerRef}>
        {taskLists.map((list) => (
          <CardList
            key={list.id}
            list={list}
            x={
              containerRect.left +
              panelConfig.listWidth * list.index +
              panelConfig.listMargin * list.index
            }
            y={containerRect.top}
          />
        ))}
      </ListContainter>
    </Container>
  );
};

function rectInRangeY(
  rect: DOMRect,
  coord: Coord,
  yDirection: number
): boolean {
  if (yDirection > 0) {
    return coord.y >= rect.y + rect.height * 0.5;
  } else {
    return coord.y <= rect.y + rect.height * 0.5;
  }
}

function rectInRangeX(rect: DOMRect, coord: Coord): boolean {
  return coord.x >= rect.x && coord.x <= rect.x + rect.width;
}

export default Panel;
