import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";
import List from "../../models/List";
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
  list: List;
  index: number;
  saveRect: (index: number, rect: DOMRect) => void;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
}

const CardList = ({ list, saveRect, index, draggingList }: Props) => {
  const [containerRect, containerRef] = useElementRect(index);
  const [contentRect, contentRef] = useElementRect(index);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRef);

  React.useLayoutEffect(() => {
    saveRect(index, containerRect);
  }, [containerRect, saveRect, index]);

  React.useLayoutEffect(() => {
    if (dragging) {
      if (draggingList(moveDirection.x, mouseCoord)) {
      }
    }
  }, [coord]);

  return (
    <ElementContainer
      index={index}
      height={contentRect.height}
      ref={containerRef}
    >
      <ElementContent
        ref={contentRef}
        style={
          dragging
            ? {
                position: "fixed",
                top: coord.y,
                left: coord.x,
                zIndex: 2,
                transition: "0s",
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
