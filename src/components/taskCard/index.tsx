import React from "react";
import { FiEdit2 } from "react-icons/fi";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import Task from "../../models/Task";
import { checkRangeY } from "../../util";
import { Card, Shadow } from "./styled";
import TaskMenu from "./taskMenu";
import DateBadge from "./DateBadge";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
}

const TaskCard = ({ task, listIndex, index }: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const {
    beginTaskDrag,
    taskDragging,
    listIndex: draggedListIndex,
    taskIndex: draggedTaskIndex,
    moveTaskVertically,
  } = React.useContext(DndTaskContext) as DndTaskContextValue;

  const dragging =
    taskDragging &&
    draggedListIndex === listIndex &&
    draggedTaskIndex === index;

  const mouseMoveHandle = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!taskDragging) return;
      if (dragging) return;
      const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect();
      const coord = {
        x: event.clientX,
        y: event.clientY,
      };
      const check = checkRangeY(rect, coord);
      if (check > 0) return;
      const toIndex = index + check + 1;
      if (toIndex !== draggedTaskIndex) moveTaskVertically(toIndex);
    },
    [dragging, index, moveTaskVertically, draggedTaskIndex, taskDragging]
  );

  const handleLeftMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      beginTaskDrag(
        index,
        listIndex,
        event,
        (containerRef.current as HTMLDivElement).getBoundingClientRect()
      );
    },
    [beginTaskDrag, index, listIndex]
  );

  const handleRightMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setMenuOpen(true);
    },
    []
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      if (event.button === 0) {
        handleLeftMouseDown(event);
      } else {
        handleRightMouseDown(event);
      }
    },
    [handleLeftMouseDown, handleRightMouseDown]
  );

  return (
    <Card
      taskDragging={taskDragging}
      dragging={dragging}
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={mouseMoveHandle}
    >
      <p>{task.title}</p>
      {task.date && !dragging && <DateBadge date={task.date} />}
      <button onClick={() => setMenuOpen(true)}>
        <FiEdit2 size={14} />
      </button>
      <Shadow dragging={dragging} />
      {menuOpen && (
        <TaskMenu
          taskIndex={index}
          listIndex={listIndex}
          rect={(containerRef.current as HTMLDivElement).getBoundingClientRect()}
          close={() => setMenuOpen(false)}
          task={task}
        />
      )}
    </Card>
  );
};

export default TaskCard;
