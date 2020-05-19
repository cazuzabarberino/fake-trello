import React from "react";
import CardList from "../../components/cardlist";
import TaskList from "../../models/List";
import { Container, ListContainter } from "./styles";
import shortid from "shortid";
import Coord from "../../models/Coord";

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

const rectContains = (rect: DOMRect, coord: Coord): boolean => {
  return (
    coord.x >= rect.x &&
    coord.x <= rect.x + rect.width &&
    coord.y >= rect.y &&
    coord.y <= rect.y + rect.height
  );
};

const rectInRangeX = (rect: DOMRect, coord: Coord): boolean => {
  return coord.x >= rect.x && coord.x <= rect.x + rect.width;
};

const Panel = (props: Props) => {
  const [allLists, setList] = React.useState<TaskList[]>(() => {
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

      setList(newArr);
      return true;
    },
    [allLists]
  );

  const draggingTaskToOtherList = React.useCallback(
    (
      taskIndex: number,
      listIndex: number,
      xDirection: number,
      mouseCoord: Coord
    ): boolean => {
      const indexOff = listIndex + xDirection;

      if (
        indexOff < 0 ||
        indexOff >= allLists.length ||
        !rectInRangeX(rects.current[indexOff], mouseCoord)
      )
        return false;

      const newArr = [...allLists];
      const task = newArr[listIndex].tasks[taskIndex];
      newArr[listIndex].tasks.splice(taskIndex, 1);
      newArr[indexOff].tasks.push(task);

      setList(newArr);
      return true;
    },
    [allLists]
  );

  const swapChild = React.useCallback(
    (listIndex: number, taskIndex1: number, taskIndex2: number) => {
      const newArr = [...allLists];
      const tmp = newArr[listIndex].tasks[taskIndex1];
      newArr[listIndex].tasks[taskIndex1] = newArr[listIndex].tasks[taskIndex2];
      newArr[listIndex].tasks[taskIndex2] = tmp;

      setList(newArr);
    },
    [allLists]
  );

  const saveRect = React.useCallback((index: number, rect: DOMRect) => {
    rects.current[index] = rect;
  }, []);

  return (
    <Container>
      <ListContainter>
        {allLists.map((list, index) => (
          <CardList
            draggingList={draggingList(index)}
            saveRect={saveRect}
            key={list.id}
            index={index}
            list={list}
            swapChild={swapChild}
            draggingTaskToOtherList={draggingTaskToOtherList}
          />
        ))}
      </ListContainter>
    </Container>
  );
};

export default Panel;
