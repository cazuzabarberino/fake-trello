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
  x: number;
  y: number;
}

const CardList = ({ list, x, y }: Props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const {
    coord,
    dragging,
    handleMouseDown,
    mouseCoord,
    moveDirection,
  } = useDnD(containerRef);

  const contentRect = contentRef.current
    ? contentRef.current.getBoundingClientRect()
    : new DOMRect();

  return (
    <ElementContainer
      x={x}
      y={y}
      height={contentRect.height}
      ref={containerRef}
      style={
        dragging
          ? {
              zIndex: 2,
            }
          : {}
      }
    >
      <ElementShadow
        dragging={dragging}
        x={x}
        y={y}
        height={contentRect.height}
      />
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
                top: y,
                left: x,
              }
        }
      >
        <ElementHeader onMouseDown={handleMouseDown}>
          <p>{list.title}</p>
        </ElementHeader>
        <NewCardBtn>
          <FiPlus />
          <p>Adicionar outro cartão</p>
        </NewCardBtn>
      </ElementContent>
    </ElementContainer>
  );
};
export default CardList;
