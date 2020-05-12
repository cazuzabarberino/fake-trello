import React from "react";
import { Container } from "./styled";
import List from "../../models/List";

interface Props {
  list: List;
  index: number;
}

const CardList = ({ list }: Props) => {
  return (
    <Container>
      <p>{list.title}</p>
    </Container>
  );
};

export default CardList;
