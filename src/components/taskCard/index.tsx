import React from "react";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import Task from "../../models/Task";
import { checkRangeY } from "../../util";
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
    moveTaskVertically,
  } = React.useContext(DndTaskContext) as DndTaskContextValue;

  const dragging = taskDragging && lindex === listIndex && taskIndex === index;

  const mouseMoveHandle = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!taskDragging || dragging) return;
      const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect();
      const coord = {
        x: event.clientX,
        y: event.clientY,
      };
      const check = checkRangeY(rect, coord);
      if (check > 0) return;
      const toIndex = index + check + 1;
      if (toIndex !== taskIndex) moveTaskVertically(toIndex);
    },
    [dragging, index, moveTaskVertically, taskIndex, taskDragging]
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      beginTaskDrag(
        index,
        listIndex,
        event,
        (containerRef.current as HTMLDivElement).getBoundingClientRect()
      );
    },
    [beginTaskDrag, index, listIndex]
  );

  return (
    <Card
      taskDragging={taskDragging}
      dragging={dragging}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={mouseMoveHandle}
    >
      {task.title}
      <Shadow dragging={dragging} />
    </Card>
  );
};

export default TaskCard;
