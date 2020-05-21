import React from "react";
import DndTaskContext, {
  DndTaskContextValue,
} from "../../Contexts/DndTaskContext";
import Task from "../../models/Task";
import { saveTaskRect } from "../../util";
import { Card } from "./styled";

interface Props {
  task: Task;
  listIndex: number;
  index: number;
}

const TaskCard = ({ task, listIndex, index }: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { beginTaskDrag } = React.useContext(
    DndTaskContext
  ) as DndTaskContextValue;

  React.useLayoutEffect(() => {
    saveTaskRect(
      listIndex,
      index,
      (containerRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [listIndex, index, task]);

  return (
    <Card
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
    </Card>
  );
};

export default TaskCard;
