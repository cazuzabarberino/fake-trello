import React from "react";
import CardList from "../../components/cardlist";
import List from "../../models/List";
import { Container, ListContainter } from "./styles";
import shortid from "shortid";

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
    return mock.map((list) => ({ ...list, id: shortid.generate() }));
  });

  return (
    <Container>
      <ListContainter>
        {allLists.map((list, index) => (
          <CardList key={list.id} index={index} list={list} />
        ))}
      </ListContainter>
    </Container>
  );
};

export default Panel;
