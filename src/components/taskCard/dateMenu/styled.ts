import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.div`
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 300px;

  min-height: 300px;

  background: ${({ theme }) => theme.taskColor};

  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  cursor: auto;

  header {
    position: relative;
    display: grid;
    place-content: center;
    padding: 8px 16px;

    p {
      font-size: 14px;
      text-align: center;
      opacity: 0.7;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 12px;
      display: grid;
      place-content: center;
      border: none;
      background: none;
      opacity: 0.5;

      :hover {
        opacity: 1;
      }
    }
  }
`;

export const Division = styled.div`
  height: 1px;
  background: #ddd;
  margin: 0 12px;
`;

export const DataWrapper = styled.div`
  margin: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 4px;

  & > p {
    font-size: 14px;
    font-weight: 700;
  }

  & > div {
    padding: 8px;
    border: 2px solid ${({ theme }) => theme.listColor};
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const CalendarNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;

export const Calendar = styled.div`
  display: grid;
  margin: 8px;
  grid-template-columns: repeat(7, 1fr);

  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
  border-right: 1px solid ${({ theme }) => theme.fontColor};
`;

interface CalendarElementProps {
  today?: boolean;
  selected?: boolean;
}

export const CalendarElement = styled.div<CalendarElementProps>`
  background: ${({ theme }) => theme.listColor};
  border-top: 1px solid ${({ theme }) => theme.fontColor};
  border-left: 1px solid ${({ theme }) => theme.fontColor};
  height: 30px;
  display: grid;
  place-content: center;
  font-size: 14px;
`;

export const CalendarWeekDay = styled(CalendarElement)`
  background: ${({ theme }) => darken(0.1, theme.listColor)};
  font-weight: 700;
`;

export const CalendarDate = styled(CalendarElement)`
  cursor: pointer;

  font-weight: ${({ today }) => (today ? "bold" : "500")};

  ${({ selected, today }) =>
    selected
      ? css`
          background: ${({ theme }) => theme.blue};
          color: white;
        `
      : css`
          background: ${({ theme }) => theme.taskColor};

          :hover {
            background: ${({ theme }) => darken(0.1, theme.listColor)};
          }

          color: ${({ theme }) => (today ? theme.blue : "auto")};
        `};
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
`;

interface BtnProps {
  color: string;
}

export const Btn = styled.button<BtnProps>`
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background: ${({ color }) => color};
  color: white;
  font-size: 14px;

  transition: background 0.1s;

  :hover {
    background: ${({ color }) => lighten(0.1, color)};
  }

  :active {
    background: ${({ color }) => darken(0.1, color)};
  }
`;
