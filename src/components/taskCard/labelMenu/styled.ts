import styled from "styled-components";
import { darken, lighten } from "polished";

interface ContainerProps {
  top: number;
  left: number;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  z-index: 20;
  top: ${({ top }) => top + "px"};
  left: ${({ left }) => left + "px"};

  width: 300px;

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

export const Content = styled.div`
  padding: 8px;
  display: grid;
  grid-auto-flow: row;
  row-gap: 8px;
  place-items: start;

  & > p,
  label {
    font-size: 12px;
    font-weight: 700;
  }

  & > input {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
  }
`;

interface ColorSelectBoxProps {
  color: string;
}

export const ColorBoxWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 8px;
  row-gap: 8px;
`;

export const ColorSelectBox = styled.div<ColorSelectBoxProps>`
  background: ${({ color }) => color};
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  display: grid;
  place-content: center;
`;

interface ConfirmBtnProps {
  negative?: boolean;
}

export const ConfirmBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmBtn = styled.button<ConfirmBtnProps>`
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background: ${({ theme, negative }) => (negative ? theme.red : theme.green)};
  color: white;
  font-size: 14px;
  transition: 0.1s;

  :hover {
    background: ${({ theme, negative }) =>
      lighten(0.1, negative ? theme.red : theme.green)};
  }

  :active {
    background: ${({ theme, negative }) =>
      darken(0.1, negative ? theme.red : theme.green)};
  }
`;

export const OptionBtn = styled.button`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: ${({ theme }) => theme.listColor};

  transition: 0.1s;

  :hover {
    background: ${({ theme }) => lighten(0.1, theme.listColor)};
  }

  :active {
    background: ${({ theme }) => darken(0.1, theme.listColor)};
  }
`;

export const LabelSelectBoxWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 8px;
  column-gap: 4px;

  & > p {
    columns: 1 / 3;
    font-size: 14px;
  }

  & > button {
    width: 32px;
    background: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    :hover {
      background: ${({ theme }) => theme.listColor};
    }
  }
`;

export const LabelSelectBox = styled.div<ColorSelectBoxProps>`
  background: ${({ color }) => color};
  width: 100%;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 0.1s;

  :hover {
    border-left: 8px solid ${({ color }) => darken(0.1, color)};
  }
`;
