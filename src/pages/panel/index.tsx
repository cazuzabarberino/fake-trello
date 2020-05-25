import React from "react";
import shortid from "shortid";
import CardList from "../../components/cardlist";
import VisualTaskCard from "../../components/taskCard/VisualTaskCard";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import { useDndTask } from "../../hooks/useDndTask";
import TaskList from "../../models/List";
import { initTaskRect, taskRects } from "../../util";
import { Container, ListContainter } from "./styles";
import useDndList from "../../hooks/useDnDList";

interface Props {}

const mock = [
  {
    title: "Backlog",
    tasks: [
      "backlog task",
      "anothter backlog task",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
      "very long task with a lot of blank space to test the text wrapper",
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

  const { beginDragList, draggedListIndex, draggingList } = useDndList(
    allLists,
    setAllLists
  );

  const {
    beginTaskDrag,
    coord,
    taskDragging,
    dragIndexes,
    moveTaskVertically,
    width,
  } = useDndTask(allLists, setAllLists);

  const dndContextValue: DndTaskContextValue = React.useMemo(
    () => ({
      beginTaskDrag,
      taskDragging,
      taskIndex: dragIndexes.taskIndex,
      listIndex: dragIndexes.listIndex,
      moveTaskVertically,
    }),
    [
      dragIndexes.taskIndex,
      dragIndexes.listIndex,
      taskDragging,
      beginTaskDrag,
      moveTaskVertically,
    ]
  );

  // if (!allLists[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]) {
  //   console.log(allLists);
  //   console.log(dragIndexes);
  // }

  return (
    <DndTaskContext.Provider value={dndContextValue}>
      <Container>
        <ListContainter>
          {allLists.map((list, index) => (
            <CardList
              taskDragging={taskDragging && dragIndexes.listIndex === index}
              key={list.id}
              listIndex={index}
              list={list}
              beginDragList={beginDragList}
            />
          ))}
        </ListContainter>

        {taskDragging && (
          <VisualTaskCard
            task={allLists[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]}
            left={coord.x}
            top={coord.y}
            width={width}
          />
        )}
      </Container>
    </DndTaskContext.Provider>
  );
};

export default Panel;
