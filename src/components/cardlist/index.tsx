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
  Container,
} from "./styled";
import NewTask from "../newTask";

interface Props {
  list: TaskList;
  listIndex: number;
  selfTaskDragging: boolean;
  draggingList: boolean;
  draggingSelf: boolean;
  beginDragList: (
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => void;
  moveListHorizontally: (toIndex: number) => void;
}

const CardList = ({
  list,
  listIndex,
  selfTaskDragging,
  beginDragList,
  draggingSelf,
  draggingList,
  moveListHorizontally,
}: Props) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const taskContainerRef = useMouseScroll(selfTaskDragging);
  const [addingTask, setAddingTask] = React.useState(false);

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

  const handleMouseEnter = () => {
    if (!draggingList || draggingSelf) return;
    moveListHorizontally(listIndex);
  };

  return (
    <Container onMouseEnter={handleMouseEnter}>
      <CardContent dragging={draggingSelf} ref={contentRef}>
        <CardHeader
          selfTaskDragging={selfTaskDragging}
          dragging={draggingSelf}
          onMouseDown={handleMouseDown}
        >
          <p>{list.title}</p>
        </CardHeader>
        <TaskContainer dragging={draggingSelf} ref={taskContainerRef}>
          {list.tasks.map((task, taskIndex) => (
            <TaskCard
              key={task.id}
              task={task}
              listIndex={listIndex}
              index={taskIndex}
            />
          ))}
        </TaskContainer>
        {addingTask ? (
          <NewTask
            listIndex={listIndex}
            closeNewTask={() => setAddingTask(false)}
          />
        ) : (
          <NewTaskBtn
            selfTaskDragging={selfTaskDragging}
            dragging={draggingSelf}
            onClick={() => setAddingTask(true)}
          >
            <FiPlus size={16} />
            <p>Adicionar outro cartão</p>
          </NewTaskBtn>
        )}
        <Shadow dragging={draggingSelf} />
      </CardContent>
    </Container>
  );
};
export default CardList;
