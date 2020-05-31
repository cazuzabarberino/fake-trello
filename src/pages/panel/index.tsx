import React from "react";
import shortid from "shortid";
import CardList from "../../components/cardlist";
import VisualList from "../../components/cardlist/visualList";
import NewList from "../../components/newList";
import VisualTaskCard from "../../components/taskCard/VisualTaskCard";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import useDndList from "../../hooks/useDnDList";
import { useDndTask } from "../../hooks/useDndTask";
import useTaskList from "../../hooks/useTaskList";
import useMouseScrollHorizontal from "../../hooks/useMouseScrollHorizontal";
import TaskList from "../../models/List";
import { Container, ListContainter, LabelFilter, LabelBtn } from "./styles";
import { TaskListContext } from "../../Contexts/TaskListContext";
import { LabelContext } from "../../Contexts/LabelContext";

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

const Panel = () => {
  const [allLists, setAllLists] = React.useState<TaskList[]>(() => {
    return mock.map((list) => ({
      ...list,
      id: shortid.generate(),
      tasks: list.tasks.map((task) => ({
        id: shortid.generate(),
        title: task,
        date: "",
        complete: false,
        labels: [],
      })),
    }));
  });

  const { state, actions } = React.useContext(LabelContext);

  const taskListContextValue = useTaskList(allLists, setAllLists);

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
    moveTaskHorizontally,
    height: taskHeight,
  } = useDndTask(allLists, setAllLists);

  const { scrollRef, scrollToRight } = useMouseScrollHorizontal(draggingList);

  const dndContextValue: DndTaskContextValue = React.useMemo(
    () => ({
      beginTaskDrag,
      taskDragging,
      taskIndex: dragIndexes.taskIndex,
      listIndex: dragIndexes.listIndex,
      moveTaskVertically,
      moveTaskHorizontally,
      height: taskHeight,
    }),
    [
      dragIndexes.taskIndex,
      dragIndexes.listIndex,
      taskDragging,
      beginTaskDrag,
      moveTaskVertically,
      moveTaskHorizontally,
      taskHeight,
    ]
  );

  // if (!allLists[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]) {
  //   console.log(allLists);
  //   console.log(dragIndexes);
  // }

  return (
    <TaskListContext.Provider value={taskListContextValue}>
      <DndTaskContext.Provider value={dndContextValue}>
        <Container>
          <LabelFilter>
            {state.labels.map((label) => (
              <LabelBtn
                key={label.id}
                on={label.selected}
                color={label.color}
                onClick={() => actions.toggleSelection(label.id)}
              >
                {label.title}
              </LabelBtn>
            ))}
            <LabelBtn
              on={state.noTagSelected}
              color="#ccc"
              onClick={() => actions.toggleNoTag()}
            >
              No label
            </LabelBtn>
          </LabelFilter>
          <ListContainter id="scroll-test" ref={scrollRef}>
            {allLists.map((list, index) => (
              <CardList
                selfTaskDragging={
                  taskDragging && dragIndexes.listIndex === index
                }
                key={list.id}
                listIndex={index}
                list={list}
                beginDragList={beginDragList}
                draggingSelf={draggingList && draggedListIndex === index}
                draggingList={draggingList}
                moveListHorizontally={moveListHorizontally}
              />
            ))}
            <NewList scrollToRight={scrollToRight} />
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
              task={
                allLists[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]
              }
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
    </TaskListContext.Provider>
  );
};

export default Panel;
