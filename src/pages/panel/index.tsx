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

const Panel = (props: Props) => {
  const [allLists, setList] = React.useState<List[]>(() => {
    return mock.map((list) => ({
      ...list,
      id: shortid.generate(),
      rect: new DOMRect(),
    }));
  });

  const draggingList = React.useCallback(
    (draggedIndex: number) => (cood: Coord) => {
      for (let index = 0; index < allLists.length; index++) {
        if (draggedIndex === index) continue;
      }
    },
    [allLists]
  );

  const saveRect = React.useCallback((index: number, rect: DOMRect) => {
    const newList = [...allLists];
    newList[index].rect = rect;
    setList(newList);
  }, [allLists]);

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
