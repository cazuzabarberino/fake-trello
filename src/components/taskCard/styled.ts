import styled, { css } from "styled-components";
import { darken } from "polished";

interface DragginProps {
  dragging?: boolean;
  taskDragging?: boolean;
}

export const Card = styled.div<DragginProps>`
  position: relative;
  max-width: 256px;
  flex: 1;
  background: ${({ theme }) => theme.taskColor};
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid ${({ dragging }) => (dragging ? "#ddd" : "#bbb")};
  word-wrap: break-word;
  font-size: 14px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  user-select: none;

  cursor: inherit;

  & > button {
    position: absolute;
    top: 4px;
    right: 4px;
    border: none;
    background: none;
    display: none;
    opacity: 0.5;
    border-radius: 4px;

    place-content: center;
    width: 20px;
    height: 20px;

    :hover {
      opacity: 1;
      background: ${({ theme }) => theme.transparencyLight};
    }
  }

  ${({ dragging }) =>
    !dragging &&
    css`
      :hover > button {
        display: grid;
      }
    `}

  p {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }

  ${({ taskDragging }) =>
    !taskDragging &&
    css`
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => darken(0.1, theme.taskColor)};
      }
    `}

  p {
    opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  }
`;

export const Shadow = styled.div<DragginProps>`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.transparency};
`;
