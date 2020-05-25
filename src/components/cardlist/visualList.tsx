import React from "react";
import { FiPlus } from "react-icons/fi";
import TaskList from "../../models/List";
import TaskCard from "../taskCard";
import { CardContent, CardHeader, NewTaskBtn, TaskContainer } from "./styled";

interface Props {
  list: TaskList;
  listIndex: number;
  left: number;
  top: number;
}

const CardList = ({ list, listIndex, top, left }: Props) => {
  return (
    <CardContent
      style={{
        position: "fixed",
        left,
        top,
      }}
    >
      <CardHeader
        style={{
          cursor: "grabbing",
        }}
      >
        <p>{list.title}</p>
      </CardHeader>
      <TaskContainer>
        {list.tasks.map((task, taskIndex) => (
          <TaskCard
            key={task.id}
            task={task}
            listIndex={listIndex}
            index={taskIndex}
          />
        ))}
      </TaskContainer>
      <NewTaskBtn>
        <FiPlus />
        <p>Adicionar outro cartão</p>
      </NewTaskBtn>
    </CardContent>
  );
};
export default CardList;
