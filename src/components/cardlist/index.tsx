import React from "react";
import { FiPlus } from "react-icons/fi";
import Coord from "../../models/Coord";
import TaskList from "../../models/List";
import { saveListRect } from "../../util";
import TaskCard from "../taskCard";
import { CardContent, CardHeader, NewTaskBtn, TaskContainer } from "./styled";
import { setTimeout, clearTimeout } from "timers";

interface Props {
  list: TaskList;
  listIndex: number;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
  taskDragging: boolean;
  mouseCoord: Coord;
}

const smooth = (t: number) => {
  return t;
  t--;
  return t * t * t + 1;
};

const CardList = ({ list, listIndex, taskDragging, mouseCoord }: Props) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const taskContainerRef = React.useRef<HTMLDivElement | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useLayoutEffect(() => {
    (taskContainerRef.current as HTMLDivElement).scrollTop = (taskContainerRef.current as HTMLDivElement).scrollHeight;
  }, []);

  React.useLayoutEffect(() => {
    saveListRect(
      listIndex,
      (contentRef.current as HTMLDivElement).getBoundingClientRect()
    );
  }, [listIndex]);

  const scrollToX = React.useCallback(
    (
      element: HTMLDivElement,
      from: number,
      to: number,
      percent: number,
      speed: number,
      step: number
    ) => {
      if (percent < 0 || percent > 1 || speed <= 0) {
        element.scrollTop = to;
        return;
      }

      element.scrollTop = from - (from - to) * smooth(percent);
      percent += (speed / 100000) * step;

      console.log(percent);

      timeoutRef.current = setTimeout(
        () => scrollToX(element, from, to, percent, speed, step),
        step
      );
    },
    []
  );

  React.useEffect(() => {
    if (taskDragging) {
      const rect = (contentRef.current as HTMLDivElement).getBoundingClientRect();
      const y = mouseCoord.y - rect.y;

      const speed = 20;
      const step = 10;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (y / rect.height >= 0.7) {
        const element = taskContainerRef.current as HTMLDivElement;
        scrollToX(
          element,
          0,
          element.scrollHeight,
          element.scrollTop / element.scrollHeight,
          speed,
          step
        );
      } else if (y / rect.height <= 0.2) {
        const element = taskContainerRef.current as HTMLDivElement;
        scrollToX(
          element,
          element.scrollHeight,
          0,
          1 - element.scrollTop / element.scrollHeight,
          speed,
          step
        );
      }
    } else if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [taskDragging, mouseCoord, scrollToX]);

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
