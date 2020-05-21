import React from "react";
import CardList from "../../components/cardlist";
import TaskList from "../../models/List";
import { Container, ListContainter, FakeCard } from "./styles";
import shortid from "shortid";
import Coord from "../../models/Coord";
import { initTaskRect, taskRects, rectInRangeX, listRects } from "../../util";
import { useDndTask } from "../../hooks/useDndTask";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";

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

  const { beginTaskDrag, coord, taskDragging, dragIndexes } = useDndTask(
    allLists,
    setAllLists
  );

  const draggingList = React.useCallback(
    (draggedIndex: number) => (
      xDirection: number,
      mouseCoord: Coord
    ): boolean => {
      const indexOff = draggedIndex + xDirection;

      if (
        indexOff < 0 ||
        indexOff >= allLists.length ||
        !rectInRangeX(listRects[indexOff], mouseCoord)
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

  const dndContextValue: DndTaskContextValue = React.useMemo(
    () => ({
      beginTaskDrag,
      taskDragging,
      taskIndex: dragIndexes.taskIndex,
      listIndex: dragIndexes.listIndex,
    }),
    [dragIndexes.taskIndex, dragIndexes.listIndex, taskDragging, beginTaskDrag]
  );

  return (
    <DndTaskContext.Provider value={dndContextValue}>
      <Container>
        <ListContainter>
          {allLists.map((list, index) => (
            <CardList
              draggingList={draggingList(index)}
              key={list.id}
              listIndex={index}
              list={list}
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
    </DndTaskContext.Provider>
  );
};

export default Panel;
