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

const rectInRangeY = (
  rect: DOMRect,
  coord: Coord,
  yDirection: number
): boolean => {
  return yDirection > 0
    ? coord.y >= rect.y + rect.height * 0.6
    : coord.y <= rect.y + rect.height * 0.4;
};

interface Props {
  list: TaskList;
  index: number;
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
  index,
  draggingList,
  beginTaskDrag,
}: Props) => {
  const [containerRect, containerRef] = useElementRect(index);
  const [contentRect, contentRef] = useElementRect(index);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRef);

  //===

  React.useLayoutEffect(() => {
    saveRect(index, containerRect);
  }, [containerRect, saveRect, index]);

  React.useLayoutEffect(() => {
    if (dragging) {
      if (draggingList(moveDirection.x, mouseCoord)) {
      }
    }
  }, [coord]);

  //===

  return (
    <ElementContainer
      index={index}
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
          {list.tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              listIndex={index}
              index={index}
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
