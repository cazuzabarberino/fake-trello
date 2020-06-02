import React from "react";
import { FiEdit2 } from "react-icons/fi";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import { LabelContext } from "../../Contexts/LabelContext";
import Coord from "../../models/Coord";
import Label from "../../models/Label";
import Task from "../../models/Task";
import DateBadge from "./DateBadge";
import { Card, LabelMark, LabelWrapper, Shadow } from "./styled";
import TaskMenu from "./taskMenu";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
}

export const checkRangeY = (
  rect: DOMRect,
  coord: Coord,
  draggedTaskHeight: number
): number => {
  if (
    coord.y > rect.y + rect.height * 0.5 &&
    coord.y >= rect.y + rect.height - draggedTaskHeight
  )
    return 0;
  else if (
    coord.y < rect.y + rect.height * 0.5 &&
    coord.y <= rect.y + draggedTaskHeight
  )
    return -1;
  else return 1;
};

const TaskCard = ({ task, listIndex, index }: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { state } = React.useContext(LabelContext);

  const hideRef = React.useRef(false);

  const taskLabels = React.useMemo(() => {
    const arr: JSX.Element[] = [];
    hideRef.current = true;

    task.labels.forEach((labelId) => {
      const label = state.labels.find((label) => label.id === labelId) as Label;
      if (label.selected) hideRef.current = false;
      arr.push(<LabelMark key={labelId} color={label.color} />);
    });

    if (!arr.length && state.noTagSelected) hideRef.current = false;

    return arr;
  }, [state.labels, task.labels, state.noTagSelected]);

  const {
    beginTaskDrag,
    taskDragging,
    listIndex: draggedListIndex,
    taskIndex: draggedTaskIndex,
    moveTaskVertically,
    height: draggedTaskHeight,
  } = React.useContext(DndTaskContext) as DndTaskContextValue;

  const dragging =
    taskDragging &&
    draggedListIndex === listIndex &&
    draggedTaskIndex === index;

  const mouseMoveHandle = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!taskDragging || dragging) return;
      const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect();
      const coord = {
        x: event.clientX,
        y: event.clientY,
      };
      const check = checkRangeY(rect, coord, draggedTaskHeight);
      if (check > 0) return;
      const toIndex = index + check + 1;
      if (toIndex !== draggedTaskIndex) moveTaskVertically(toIndex);
    },
    [
      dragging,
      index,
      moveTaskVertically,
      draggedTaskIndex,
      taskDragging,
      draggedTaskHeight,
    ]
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
      hide={hideRef.current}
      taskDragging={taskDragging}
      dragging={dragging}
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={mouseMoveHandle}
    >
      <LabelWrapper dragging={dragging}>{taskLabels}</LabelWrapper>
      <p>{task.title}</p>
      {task.date && !dragging && (
        <DateBadge
          dragging={taskDragging}
          listIndex={listIndex}
          taskIndex={index}
          complete={task.complete}
          date={task.date}
        />
      )}
      <button onClick={() => setMenuOpen(true)}>
        <FiEdit2 size={14} />
      </button>
      <Shadow dragging={dragging} />
      {menuOpen && (
        <TaskMenu
          taskLabels={taskLabels}
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
