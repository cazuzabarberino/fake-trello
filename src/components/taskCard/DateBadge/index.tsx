import moment from "moment";
import React from "react";
import { FiClock, FiSquare, FiCheckSquare } from "react-icons/fi";
import styled, { css } from "styled-components";
import { TaskListContext } from "../../../Contexts/TaskListContext";

enum DueState {
  dueSoon = 0,
  overDue = 1,
  normal = 2,
  done = 3,
}

interface Props {
  taskIndex: number;
  listIndex: number;
  date: string;
  complete: boolean;
}

export default ({ date, complete, taskIndex, listIndex }: Props) => {
  const due = React.useMemo(() => moment(date, "DD MM YY"), [date]);
  const {
    taskListActions: { editCompleteState },
  } = React.useContext(TaskListContext);

  const dueState = React.useMemo<DueState>(() => {
    if (complete) return DueState.done;
    const today = moment();
    if (today.isSame(due, "day")) return DueState.dueSoon;
    else if (today.isAfter(due, "day")) return DueState.overDue;
    else return DueState.normal;
  }, [due, complete]);

  return (
    <DateBadge
      dueState={dueState}
      onClick={(e) => {
        if (e.button !== 0) return;
        editCompleteState(!complete, taskIndex, listIndex);
      }}
    >
      {complete ? <FiCheckSquare /> : <FiSquare />}
      <FiClock />
      <p>{due.format("MMMM Do YYYY")}</p>
    </DateBadge>
  );
};

interface DateBadgeProps {
  dueState: DueState;
}

const DateBadge = styled.div<DateBadgeProps>`
  cursor: pointer;
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto auto 1fr;
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
      case DueState.done:
        return css`
          background: ${({ theme }) => theme.green};
          color: white;
        `;
      default:
        return css``;
    }
  }}
`;
