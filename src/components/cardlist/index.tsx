import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";
import List from "../../models/List";
import {
  ElementContainer,
  ElementShadow,
  ElementHeader,
  CardContainer,
  NewCardBtn,
  MovingShadow,
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
  const [shadowRect, shadowRef] = useElementRect(index);
  const [containerRect, containerRef] = useElementRect(index);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(shadowRef);

  React.useLayoutEffect(() => {
    saveRect(index, shadowRect);
  }, [shadowRect, saveRect, index]);

  React.useLayoutEffect(() => {
    if (dragging) {
      if (draggingList(moveDirection.x, mouseCoord)) {
      }
    }
  }, [coord]);

  return (
    <ElementShadow index={index} height={containerRect.height} ref={shadowRef}>
      <ElementContainer
        ref={containerRef}
        style={
          dragging
            ? {
                top: coord.y,
                left: coord.x,
                zIndex: 2,
                transition: "0s",
              }
            : {
                top: shadowRect.y,
                left: shadowRect.x,
              }
        }
      >
        <ElementHeader onMouseDown={handleMouseDown}>
          <p>{list.title}</p>
        </ElementHeader>
        <CardContainer>
          {list.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </CardContainer>
        <NewCardBtn>
          <FiPlus />
          <p>Adicionar outro cartão</p>
        </NewCardBtn>
      </ElementContainer>
      <MovingShadow
        x={shadowRect.x}
        y={shadowRect.y}
        height={containerRect.height}
      />
    </ElementShadow>
  );
};
export default CardList;
