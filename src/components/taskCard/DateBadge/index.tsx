import moment from "moment";
import React from "react";
import { FiClock } from "react-icons/fi";
import styled, { css } from "styled-components";

enum DueState {
  dueSoon = 0,
  overDue = 1,
  normal = 2,
}

interface Props {
  date: string;
}

export default ({ date }: Props) => {
  const due = React.useMemo(() => moment(date, "DD MM YY"), [date]);

  const dueState = React.useMemo<DueState>(() => {
    const today = moment();
    if (today.isSame(due, "day")) return DueState.dueSoon;
    else if (today.isAfter(due, "day")) return DueState.overDue;
    else return DueState.normal;
  }, [due]);

  return (
    <DateBadge dueState={dueState}>
      <FiClock />
      <p>{due.format("MMMM Do YYYY")}</p>
    </DateBadge>
  );
};

interface DateBadgeProps {
  dueState: DueState;
}

const DateBadge = styled.div<DateBadgeProps>`
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  place-items: center;
  place-content: center;
  column-gap: 8px;
  padding: 4px;
  color: ${({ theme }) => theme.fontColor};
  border-radius: 4px;

  ${({ dueState }) => {
    switch (dueState) {
      case DueState.dueSoon:
        return css`
          background: ${({ theme }) => theme.yellow};
          color: white;
        `;
      case DueState.overDue:
        return css`
          background: ${({ theme }) => theme.red};
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;
