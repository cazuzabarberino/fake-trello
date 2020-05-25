import React from "react";
import { FiPlus } from "react-icons/fi";
import useMouseScroll from "../../hooks/useMouseScrollVertical";
import TaskList from "../../models/List";
import { saveListRect } from "../../util";
import TaskCard from "../taskCard";
import {
  CardContent,
  CardHeader,
  NewTaskBtn,
  TaskContainer,
  Shadow,
} from "./styled";

interface Props {
  list: TaskList;
  listIndex: number;
  taskDragging: boolean;
  dragging: boolean;
  beginDragList: (
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => void;
}

const CardList = ({
  list,
  listIndex,
  taskDragging,
  beginDragList,
  dragging,
}: Props) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const taskContainerRef = useMouseScroll(taskDragging);

  React.useLayoutEffect(() => {
    saveListRect(
      listIndex,
      (contentRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [listIndex]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    beginDragList(
      listIndex,
      event,
      (contentRef.current as HTMLDivElement).getBoundingClientRect()
    );
  };

  return (
    <CardContent dragging={dragging} ref={contentRef}>
      <CardHeader dragging={dragging} onMouseDown={handleMouseDown}>
        <p>{list.title}</p>
      </CardHeader>
      <TaskContainer dragging={dragging} ref={taskContainerRef}>
        {list.tasks.map((task, taskIndex) => (
          <TaskCard
            key={task.id}
            task={task}
            listIndex={listIndex}
            index={taskIndex}
          />
        ))}
      </TaskContainer>
      <NewTaskBtn dragging={dragging}>
        <FiPlus />
        <p>Adicionar outro cartão</p>
      </NewTaskBtn>
      <Shadow dragging={dragging} />
    </CardContent>
  );
};
export default CardList;
