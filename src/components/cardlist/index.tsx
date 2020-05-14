import React from "react";
import { Container, Card } from "./styled";
import List from "../../models/List";
import useDnD from "../../hooks/useDnD";
import useElementRect from "../../hooks/useElementRect";
import Coord from "../../models/Coord";

interface Props {
  list: List;
  index: number;
  saveRect: (index: number, rect: DOMRect) => void;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
}

const CardList = ({ list, saveRect, index, draggingList }: Props) => {
  const [containerRect, containerRef] = useElementRect(index);
  const [cardRect, cardRef] = useElementRect(index);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRect);

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
    <Container height={cardRect.height} ref={containerRef}>
      <Card
        ref={cardRef}
        style={
          dragging
            ? {
                position: "fixed",
                top: coord.y,
                left: coord.x,
              }
            : {}
        }
        onMouseDown={handleMouseDown}
      >
        <p>{list.title}</p>
      </Card>
    </Container>
  );
};
export default CardList;
