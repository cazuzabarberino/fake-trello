import React from "react";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";
import List from "../../models/List";
import {
  ElementContainer,
  ElementShadow,
  Card,
  CardContainer,
  ElementHeader,
  NewCardBtn,
} from "./styled";
import { FiPlus } from "react-icons/fi";

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
  } = useDnD(shadowRect);

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
    <ElementShadow height={containerRect.height} ref={shadowRef}>
      <ElementContainer
        ref={containerRef}
        style={
          dragging
            ? {
                position: "fixed",
                top: coord.y,
                left: coord.x,
              }
            : {}
        }
      >
        <ElementHeader onMouseDown={handleMouseDown}>
          <p>{list.title}</p>
        </ElementHeader>
        <CardContainer>
          {list.tasks.map((task) => (
            <Card key={task.id}>{task.title}</Card>
          ))}
        </CardContainer>
        <NewCardBtn>
          <FiPlus />
          <p>Adicionar outro cartão</p>
        </NewCardBtn>
      </ElementContainer>
    </ElementShadow>
  );
};
export default CardList;
