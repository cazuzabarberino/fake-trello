import styled, { css } from "styled-components";

interface CardProps {
  dragging?: boolean;
  taskDragging?: boolean;
}

export const Card = styled.div<CardProps>`
  position: relative;
  max-width: 256px;
  flex: 1;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid ${({ dragging }) => (dragging ? "#ddd" : "#bbb")};
  word-wrap: break-word;
  font-size: 14px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  user-select: none;

  cursor: inherit;

  & + div {
    margin-top: 8px;
  }

  ${({ taskDragging }) =>
    !taskDragging &&
    css`
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    `}
`;

interface ShadowProps {
  dragging: boolean;
}

export const Shadow = styled.div<ShadowProps>`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: #ddd;
`;
