import React from "react";
import CardList from "../../components/cardlist";
import VisualList from "../../components/cardlist/visualList";
import NewList from "../../components/newList";
import VisualTaskCard from "../../components/taskCard/VisualTaskCard";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import { LabelContext } from "../../Contexts/LabelContext";
import { TaskListContext } from "../../Contexts/TaskListContext";
import useDndList from "../../hooks/useDnDList";
import { useDndTask } from "../../hooks/useDndTask";
import useMouseScrollHorizontal from "../../hooks/useMouseScrollHorizontal";
import { Container, LabelBtn, LabelFilter, ListContainter } from "./styles";
import useInit from "./useInit";

const Panel = () => {
  const { state, actions } = React.useContext(LabelContext);
  const { allLists } = React.useContext(TaskListContext);

  useInit();

  const {
    beginDragList,
    draggedListIndex,
    draggingList,
    draggedListCoord,
    height,
    moveListHorizontally,
  } = useDndList();

  const {
    beginTaskDrag,
    coord,
    taskDragging,
    dragIndexes,
    moveTaskVertically,
    width,
    moveTaskHorizontally,
    height: taskHeight,
  } = useDndTask();

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
    <DndTaskContext.Provider value={dndContextValue}>
      <Container>
        <LabelFilter>
          {state.labels.map((label) => (
            <LabelBtn
              key={label.id}
              selected={label.selected}
              color={label.color}
              onClick={() => actions.toggleSelection(label.id)}
            >
              {label.title}
            </LabelBtn>
          ))}
          <LabelBtn
            selected={state.noTagSelected}
            color="#ccc"
            onClick={() => actions.toggleNoTag()}
          >
            No label
          </LabelBtn>
        </LabelFilter>
        <ListContainter id="scroll-test" ref={scrollRef}>
          {allLists.list.map((list, index) => (
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
              allLists.list[dragIndexes.listIndex].tasks[dragIndexes.taskIndex]
            }
            left={coord.x}
            top={coord.y}
            width={width}
          />
        )}

        {draggingList && (
          <VisualList
            list={allLists.list[draggedListIndex]}
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
