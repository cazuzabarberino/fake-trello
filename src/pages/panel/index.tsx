import React from "react";
import CardList from "../../components/cardlist";
import List from "../../models/List";
import { Container, ListContainter } from "./styles";
import shortid from "shortid";
import Coord from "../../models/Coord";

interface Props {}

const mock = [
  {
    title: "Backlog",
    tasks: [],
  },
  {
    title: "To dos",
    tasks: [],
  },
  {
    title: "Done",
    tasks: [],
  },
];

const rectContains = (rect: DOMRect, coord: Coord): boolean => {
  return (
    coord.x >= rect.x &&
    coord.x <= rect.x + rect.width &&
    coord.y >= rect.y &&
    coord.y <= rect.y + rect.height
  );
};

const rectInRangeX = (rect: DOMRect, coord: Coord): boolean => {
  return coord.x >= rect.x && coord.x <= rect.x + rect.width;
};

const Panel = (props: Props) => {
  const [allLists, setList] = React.useState<List[]>(() => {
    return mock.map((list) => ({
      ...list,
      id: shortid.generate(),
    }));
  });

  const rects = React.useRef<DOMRect[]>(new Array(3));

  const draggingList = React.useCallback(
    (draggedIndex: number) => (coord: Coord, globalCoord: Coord): boolean => {
      const indexOff = draggedIndex + coord.x / Math.abs(coord.x) || 0;

      if (
        indexOff < 0 ||
        indexOff >= allLists.length ||
        !rectInRangeX(rects.current[indexOff], globalCoord)
      )
        return false;

      // console.log("Coord: ", globalCoord);
      // console.log("Rect: ", rects.current[indexOff]);
      // console.log("=============");

      const newArr = [...allLists];
      const tmp = newArr[indexOff];
      newArr[indexOff] = newArr[draggedIndex];
      newArr[draggedIndex] = tmp;

      setList(newArr);
      return true;
    },
    [allLists]
  );

  const saveRect = React.useCallback((index: number, rect: DOMRect) => {
    rects.current[index] = rect;
    // console.log("saving...");
    // console.log("index ", index);
    // console.log("rect ", rect);
    // console.log("===================");
  }, []);

  return (
    <Container>
      <ListContainter>
        {allLists.map((list, index) => (
          <CardList
            draggingList={draggingList(index)}
            saveRect={saveRect}
            key={list.id}
            index={index}
            list={list}
          />
        ))}
      </ListContainter>
    </Container>
  );
};

export default Panel;
