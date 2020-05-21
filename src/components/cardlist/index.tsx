import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";
import TaskList from "../../models/List";
import {
  ElementContent,
  ElementContainer,
  ElementHeader,
  TaskContainer,
  NewCardBtn,
  ElementShadow,
} from "./styled";
import { FiPlus } from "react-icons/fi";
import TaskCard from "../taskCard";
import { saveListRect } from "../../util";

interface Props {
  list: TaskList;
  listIndex: number;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
}

const CardList = ({ list, listIndex, draggingList }: Props) => {
  const [containerRect, containerRef] = useElementRect(listIndex);
  const [contentRect, contentRef] = useElementRect(listIndex);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRef);

  React.useLayoutEffect(() => {
    saveListRect(listIndex, containerRect);
  }, [containerRect, listIndex]);

  React.useLayoutEffect(() => {
    if (dragging) {
      if (draggingList(moveDirection.x, mouseCoord)) {
      }
    }
  }, [coord]);

  return (
    <ElementContainer
      index={listIndex}
      height={contentRect.height}
      ref={containerRef}
    >
      <ElementContent
        ref={contentRef}
        dragging={dragging}
        style={
          dragging
            ? {
                top: coord.y,
                left: coord.x,
              }
            : {
                top: containerRect.y,
                left: containerRect.x,
              }
        }
      >
        <ElementHeader onMouseDown={handleMouseDown}>
          <p>{list.title}</p>
        </ElementHeader>
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
        <NewCardBtn>
          <FiPlus />
          <p>Adicionar outro cartão</p>
        </NewCardBtn>
      </ElementContent>
      <ElementShadow
        dragging={dragging}
        x={containerRect.x}
        y={containerRect.y}
        height={contentRect.height}
      />
    </ElementContainer>
  );
};
export default CardList;
