import moment from "moment";
import React from "react";
import { FiClock } from "react-icons/fi";
import styled from "styled-components";

interface Props {
  date: string;
}

export default ({ date }: Props) => {
  return (
    <DateBadge>
      <FiClock />
      <p>{moment(date, "DD MM YY").calendar()}</p>
    </DateBadge>
  );
};

const DateBadge = styled.div`
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  place-items: center;
  place-content: center;
  column-gap: 8px;
  padding: 4px;
  background: ${({ theme }) => theme.green};
  color: white;
  border-radius: 4px;
`;
