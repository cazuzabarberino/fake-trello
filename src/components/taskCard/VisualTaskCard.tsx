import React from "react";
import Task from "../../models/Task";
import { Card } from "./styled";

interface Props {
  task: Task;
  left: number;
  top: number;
  width: number;
}

const TaskCard = ({ task, left, top, width }: Props) => {
  return (
    <Card
      style={{
        width,
        position: "fixed",
        left,
        top,
        cursor: "grabbing",
        transform: "rotate(2.5deg)",
        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
        background: "white",
        pointerEvents: "none",
      }}
    >
      {task.title}
    </Card>
  );
};

export default TaskCard;
