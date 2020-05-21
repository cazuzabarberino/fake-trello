import styled, { css } from "styled-components";

interface ElementContainerProps {
  height: number;
  index: number;
}

export const ElementContainer = styled.div<ElementContainerProps>`
  width: 272px;
  border-radius: 4px;
  height: ${({ height }) => height + "px"};

  & + div {
    margin-left: 8px;
  }
`;

interface ElementContentProps {
  dragging: boolean;
}

export const ElementContent = styled.div<ElementContentProps>`
  width: 272px;
  flex: none;
  background: #ebecf0;

  font-size: 14px;
  border-radius: 4px;

  transition: box-shadow 0.2s, transform 0.2s;

  display: flex;
  flex-direction: column;
  max-height: 500px;

  ${({ dragging }) =>
    dragging &&
    css`
      z-index: 2;
      transform: rotate(5deg);
      position: fixed;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    `}
`;

interface ElementShadowProps {
  x: number;
  y: number;
  height: number;
  dragging: boolean;
}

export const ElementShadow = styled.div<ElementShadowProps>`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  top: ${({ y }) => y + "px"};
  left: ${({ x }) => x + "px"};
  background: rgba(0, 0, 0, 0.32);
  width: 272px;
  height: ${({ height }) => height + "px"};
`;

export const ElementHeader = styled.div`
  padding: 12px 16px;
  color: #172b4d;
  font-weight: 700;
`;

export const NewCardBtn = styled.div`
  display: flex;
  padding: 12px 16px;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px 8px 8px;
  flex: 1 1 auto;
  overflow-y: auto;
`;
