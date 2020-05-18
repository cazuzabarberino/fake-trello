import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Task from "../../models/Task";
import { Card, Shadow } from "./styled";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
}

const TaskCard = ({ task, listIndex, index }: Props) => {
  const [shadowRect, shadowRef] = useElementRect();
  const [containerRect, containerRef] = useElementRect();
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(shadowRef);

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
