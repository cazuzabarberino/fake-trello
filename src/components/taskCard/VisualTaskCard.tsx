import React from "react";
import Task from "../../models/Task";
import { Card } from "./styled";

interface Props {
  task: Task;
  left: number;
  top: number;
}

const TaskCard = ({ task, left, top }: Props) => {
  return (
    <Card
      style={{
        position: "fixed",
        left,
        top,
        cursor: "grabbing",
        transform: "rotate(2.5deg)",
        boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
        background: "white",
        pointerEvents: "none",
        width: "272px",
      }}
    >
      {task.title}
    </Card>
  );
};

export default TaskCard;
