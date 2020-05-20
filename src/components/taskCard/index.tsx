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
  beginTaskDrag: (
    taskIndex: number,
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => void;
}

const TaskCard = ({ task, listIndex, index, beginTaskDrag }: Props) => {
  const [shadowRect, shadowRef] = useElementRect();
  const [containerRect, containerRef] = useElementRect();

  return (
    <Shadow height={containerRect.height} ref={shadowRef}>
      <Card
        ref={containerRef}
        onMouseDown={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.preventDefault();
          beginTaskDrag(index, listIndex, event, shadowRect);
        }}
      >
        {task.title}
      </Card>
    </Shadow>
  );
};

export default TaskCard;
