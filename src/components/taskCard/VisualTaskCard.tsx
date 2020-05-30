import React from "react";
import Task from "../../models/Task";
import { Card, LabelWrapper, LabelMark } from "./styled";
import { FiEdit2 } from "react-icons/fi";
import DateBadge from "./DateBadge";
import { LabelContext } from "../../Contexts/LabelContext";
import Label from "../../models/Label";

interface Props {
  task: Task;
  left: number;
  top: number;
  width: number;
}

const TaskCard = ({ task, left, top, width }: Props) => {
  const { state } = React.useContext(LabelContext);

  const taskLabels = React.useMemo(() => {
    const arr: JSX.Element[] = [];

    task.labels.forEach((labelId) => {
      arr.push(
        <LabelMark
          key={labelId}
          color={
            (state.labels.find((label) => label.id === labelId) as Label).color
          }
        />
      );
    });

    return arr;
  }, [state.labels, task.labels]);

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
      <LabelWrapper>{taskLabels}</LabelWrapper>
      <p>{task.title}</p>
      {task.date && (
        <DateBadge
          listIndex={0}
          taskIndex={0}
          complete={task.complete}
          date={task.date}
        />
      )}
      <button>
        <FiEdit2 size={14} />
      </button>
    </Card>
  );
};

export default TaskCard;
