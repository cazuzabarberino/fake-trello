import moment from "moment";
import React from "react";
import { FiX } from "react-icons/fi";
import {
  Container,
  Division,
  Calendar,
  CalendarElement,
  CalendarWeekDay,
  CalendarDate,
  BtnWrapper,
  Btn,
  CalendarNavWrapper,
  DataWrapper,
} from "./styled";
import { ThemeContext } from "styled-components";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import { TaskListContext } from "../../../Contexts/TaskListContext";

interface Props {
  top: number;
  left: number;
  listIndex: number;
  taskIndex: number;
  close: () => void;
  date: string;
}

export default ({ top, left, listIndex, taskIndex, close, date }: Props) => {
  const [selected, setSelected] = React.useState<moment.Moment>(
    date ? moment(date, "DD MM YY") : moment()
  );
  const [calendarView, serCalendarView] = React.useState(
    (date ? moment(date, "DD MM YY") : moment()).date(1)
  );
  const {
    taskListActions: { editTaskDate },
  } = React.useContext(TaskListContext);

  const save = React.useCallback(
    (val: string) => {
      editTaskDate(val, taskIndex, listIndex);
      close();
    },
    [close, editTaskDate, taskIndex, listIndex]
  );

  const { containerRef } = useKeyMouseToSaveClose(() => {}, close);
  const start = calendarView.weekday();
  const daysInMonth = calendarView.daysInMonth();
  const end =
    (start + daysInMonth) % 7 === 0 ? 0 : 7 - ((start + daysInMonth) % 7);

  const weekDays = React.useMemo(
    () => ["dom", "2ª", "3ª", "4ª", "5ª", "6ª", "sáb"],
    []
  );

  const years = React.useMemo(() => {
    const arr: number[] = [];
    const year = moment().year();

    for (let i = 0; i < 21; i++) arr.push(year - 10 + i);

    return arr;
  }, []);

  const { green, red } = React.useContext(ThemeContext);

  const dates = () => {
    let arr: JSX.Element[] = [];
    for (let i = 0; i < daysInMonth; i++)
      arr.push(
        <CalendarDate
          key={i}
          today={
            calendarView.year() === moment().year() &&
            calendarView.month() === moment().month() &&
            moment().date() === i + 1
          }
          selected={
            calendarView.year() === selected.year() &&
            calendarView.month() === selected.month() &&
            selected.date() === i + 1
          }
          onClick={() => setSelected(calendarView.clone().date(i + 1))}
        >
          {i + 1}
        </CalendarDate>
      );
    return arr;
  };

  const emptyDate = (n: number) => {
    let arr: JSX.Element[] = [];
    for (let i = 0; i < n; i++) arr.push(<CalendarElement key={i} />);
    return arr;
  };

  return (
    <Container
      ref={containerRef}
      top={top}
      left={left}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <header>
        <p>Change Due Date</p>
        <button onClick={close}>
          <FiX size={16} />
        </button>
      </header>
      <Division />
      <DataWrapper>
        <p>Date</p>
        <p>Time</p>
        <div>{selected.format("MMMM Do YYYY")}</div>
        <div>{selected.format("H:mm")}</div>
      </DataWrapper>
      <CalendarNavWrapper>
        <button
          onClick={() => serCalendarView((val) => val.clone().subtract(1, "M"))}
        >
          Prev
        </button>
        <select
          value={calendarView.month()}
          onChange={(e) => {
            const newMonth = Number(e.target.value);
            serCalendarView((val) => val.clone().month(newMonth));
          }}
        >
          {moment.months().map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={calendarView.year()}
          onChange={(e) => {
            const newYear = Number(e.target.value);
            serCalendarView((val) => val.clone().year(newYear));
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => serCalendarView((val) => val.clone().add(1, "M"))}
        >
          Next
        </button>
      </CalendarNavWrapper>
      <Calendar>
        {weekDays.map((day, index) => (
          <CalendarWeekDay key={index}>{day}</CalendarWeekDay>
        ))}
        {emptyDate(start)}
        {dates()}
        {emptyDate(end)}
      </Calendar>
      <BtnWrapper>
        <Btn color={green} onClick={() => save(selected.format("DD/MM/YY"))}>
          Save
        </Btn>
        <Btn color={red} onClick={() => save("")}>
          Remove
        </Btn>
      </BtnWrapper>
    </Container>
  );
};
