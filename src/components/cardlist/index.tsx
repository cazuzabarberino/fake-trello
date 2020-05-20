import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";
import TaskList from "../../models/List";
import {
  ElementContent,
  ElementContainer,
  ElementHeader,
  CardContainer,
  NewCardBtn,
  ElementShadow,
} from "./styled";
import { FiPlus } from "react-icons/fi";
import TaskCard from "../taskCard";


interface Props {
  list: TaskList;
  listIndex: number;
  saveRect: (index: number, rect: DOMRect) => void;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
  beginTaskDrag: (
    taskIndex: number,
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => void;
}

const CardList = ({
  list,
  saveRect,
  listIndex,
  draggingList,
  beginTaskDrag,
}: Props) => {
  const [containerRect, containerRef] = useElementRect(listIndex);
  const [contentRect, contentRef] = useElementRect(listIndex);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRef);

  //===

  React.useLayoutEffect(() => {
    saveRect(listIndex, containerRect);
  }, [containerRect, saveRect, listIndex]);

  React.useLayoutEffect(() => {
    if (dragging) {
      if (draggingList(moveDirection.x, mouseCoord)) {
      }
    }
  }, [coord]);

  //===

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
        <CardContainer>
          {list.tasks.map((task, taskIndex) => (
            <TaskCard
              key={task.id}
              task={task}
              listIndex={listIndex}
              index={taskIndex}
              beginTaskDrag={beginTaskDrag}
            />
          ))}
        </CardContainer>
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
