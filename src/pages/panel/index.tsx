import React from "react";
import shortid from "shortid";
import CardList from "../../components/cardlist";
import VisualList from "../../components/cardlist/visualList";
import VisualTaskCard from "../../components/taskCard/VisualTaskCard";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import useDndList from "../../hooks/useDnDList";
import { useDndTask } from "../../hooks/useDndTask";
import useMouseScrollHorizontal from "../../hooks/useMouseScrollHorizontal";
import TaskList from "../../models/List";
import { Container, ListContainter } from "./styles";
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

  const {
    beginDragList,
    draggedListIndex,
    draggingList,
    draggedListCoord,
    height,
    moveListHorizontally,
  } = useDndList(allLists, setAllLists);

  const {
    beginTaskDrag,
    coord,
    taskDragging,
    dragIndexes,
    moveTaskVertically,
    width,
  } = useDndTask(allLists, setAllLists);

  const scrollRef = useMouseScrollHorizontal(draggingList);

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
        <ListContainter id="scroll-test" ref={scrollRef}>
          {allLists.map((list, index) => (
            <CardList
              selfTaskDragging={taskDragging && dragIndexes.listIndex === index}
              key={list.id}
              listIndex={index}
              list={list}
              beginDragList={beginDragList}
              draggingSelf={draggingList && draggedListIndex === index}
              draggingList={draggingList}
              moveListHorizontally={moveListHorizontally}
            />
          ))}
          <div
            style={{
              minWidth: "8px",
              height: "100%",
              margin: 0,
            }}
          />
        </ListContainter>

        {taskDragging && (
          <VisualTaskCard
            task={allLists[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]}
            left={coord.x}
            top={coord.y}
            width={width}
          />
        )}

        {draggingList && (
          <VisualList
            list={allLists[draggedListIndex]}
            listIndex={draggedListIndex}
            left={draggedListCoord.x}
            top={draggedListCoord.y}
            height={height}
          />
        )}
      </Container>
    </DndTaskContext.Provider>
  );
};

export default Panel;
