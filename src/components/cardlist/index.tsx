import React from "react";
import { FiPlus } from "react-icons/fi";
import useMouseScroll from "../../hooks/useMouseScroll";
import Coord from "../../models/Coord";
import TaskList from "../../models/List";
import { saveListRect } from "../../util";
import TaskCard from "../taskCard";
import { CardContent, CardHeader, NewTaskBtn, TaskContainer } from "./styled";

interface Props {
  list: TaskList;
  listIndex: number;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
  taskDragging: boolean;
  mouseCoord: Coord;
}

const CardList = ({ list, listIndex, taskDragging, mouseCoord }: Props) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const taskContainerRef = useMouseScroll(taskDragging);

  React.useLayoutEffect(() => {
    saveListRect(
      listIndex,
      (contentRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [listIndex]);

  return (
    <CardContent ref={contentRef}>
      <CardHeader>
        <p>{list.title}</p>
      </CardHeader>
      <TaskContainer ref={taskContainerRef}>
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
