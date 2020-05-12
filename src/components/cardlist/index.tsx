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
  draggingList: (coord: Coord) => void;
}

const CardList = ({ list, saveRect, index }: Props) => {
  const { coord, dragging, handleMouseDown } = useDnD();
  const { rect, elementRef } = useElementRect();

  if (dragging) {
  }

  React.useLayoutEffect(() => {
    saveRect(index, rect);
  }, [rect]);

  return (
    <Container height={rect.height}>
      <Card
        ref={elementRef}
        style={{
          top: coord.y,
          left: coord.x,
        }}
        onMouseDown={handleMouseDown}
      >
        <p>{list.title}</p>
      </Card>
    </Container>
  );
};

export default CardList;
