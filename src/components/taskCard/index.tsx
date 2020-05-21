import React from "react";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import Task from "../../models/Task";
import { saveTaskRect } from "../../util";
import { Card, Shadow } from "./styled";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
}

const TaskCard = ({ task, listIndex, index }: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const {
    beginTaskDrag,
    taskDragging,
    listIndex: lindex,
    taskIndex,
  } = React.useContext(DndTaskContext) as DndTaskContextValue;

  React.useLayoutEffect(() => {
    saveTaskRect(
      listIndex,
      index,
      (containerRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [listIndex, index, task]);

  const dragging = taskDragging && lindex === listIndex && taskIndex === index;

  return (
    <Card
      dragging={dragging}
      ref={containerRef}
      onMouseDown={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        beginTaskDrag(
          index,
          listIndex,
          event,
          (containerRef.current as HTMLDivElement).getBoundingClientRect()
        );
      }}
    >
      {task.title}
      <Shadow dragging={dragging} />
    </Card>
  );
};

export default TaskCard;
