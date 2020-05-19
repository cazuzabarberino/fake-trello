import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Task from "../../models/Task";
import Coord from "../../models/Coord";
import { Card, Shadow } from "./styled";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
  saveChildRect: (index: number, rect: DOMRect) => void;
  draggingTask: (
    taskIndex: number,
    direction: { x: number; y: number },
    mouseCoord: Coord
  ) => boolean;
}

const TaskCard = ({
  task,
  listIndex,
  index,
  saveChildRect,
  draggingTask,
}: Props) => {
  const [shadowRect, shadowRef] = useElementRect();
  const [containerRect, containerRef] = useElementRect();
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(shadowRef);

  React.useLayoutEffect(() => {
    saveChildRect(
      index,
      (shadowRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [shadowRect, listIndex, index]);

  React.useLayoutEffect(() => {
    if (dragging) {
      draggingTask(index, moveDirection, mouseCoord);
    }
  }, [coord]);

  return (
    <Shadow height={containerRect.height} ref={shadowRef}>
      <Card
        ref={containerRef}
        onMouseDown={handleMouseDown}
        style={
          dragging
            ? {
                position: "fixed",
                top: coord.y,
                left: coord.x,
              }
            : {}
        }
      >
        {task.title}
      </Card>
    </Shadow>
  );
};

export default TaskCard;
