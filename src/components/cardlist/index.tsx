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
  if (yDirection > 0) {
    return coord.y >= rect.y + rect.height * 0.5;
  } else {
    return coord.y <= rect.y + rect.height * 0.5;
  }
};

interface Props {
  list: TaskList;
  index: number;
  saveRect: (index: number, rect: DOMRect) => void;
  draggingList: (xDirection: number, globalCoord: Coord) => boolean;
  swapChild: (
    listIndex: number,
    taskIndex1: number,
    taskIndex2: number
  ) => void;
  draggingTaskToOtherList: (
    taskIndex: number,
    listIndex: number,
    xDirection: number,
    mouseCoord: Coord
  ) => boolean;
}

const CardList = ({
  list,
  saveRect,
  index,
  draggingList,
  swapChild,
  draggingTaskToOtherList,
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

  const childRects = React.useRef<DOMRect[]>(new Array(list.tasks.length));

  const saveChildRect = React.useCallback((index: number, rect: DOMRect) => {
    childRects.current[index] = rect;
    // console.log("saving child rect...");
    // console.log(index);
    // console.log(rect);
    // console.log("==============");
  }, []);

  const draggingTask = React.useCallback(
    (
      taskIndex: number,
      direction: { x: number; y: number },
      mouseCoord: Coord
    ): boolean => {
      draggingTaskToOtherList(taskIndex, index, direction.x, mouseCoord);

      const indexOff = taskIndex + direction.y;

      if (
        indexOff < 0 ||
        indexOff >= list.tasks.length ||
        !rectInRangeY(childRects.current[indexOff], mouseCoord, direction.y)
      )
        return false;

      swapChild(index, taskIndex, indexOff);

      return true;
    },
    []
  );

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
              saveChildRect={saveChildRect}
              draggingTask={draggingTask}
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
