import styled from "styled-components";

const transitionDuration = ".2s ease-out";

interface ElementContainerProps {
  height: number;
  index: number;
}

export const ElementContainer = styled.div<ElementContainerProps>`
  width: 272px;
  border-radius: 4px;
  height: ${({ height }) => height + "px"};
`;

export const ElementContent = styled.div`
  /* position: fixed; */
  /* z-index: 1; */
  width: 272px;
  flex: none;
  background: #ebecf0;

  font-size: 14px;
  border-radius: 4px;
  transition: ${transitionDuration};
`;

interface ElementShadowProps {
  x: number;
  y: number;
  height: number;
  dragging: boolean;
}

export const ElementShadow = styled.div<ElementShadowProps>`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  /* position: fixed; */
  top: ${({ y }) => y + "px"};
  left: ${({ x }) => x + "px"};
  transition: ${transitionDuration};
  background: rgba(0, 0, 0, 0.32);
  width: 272px;
  height: ${({ height }) => height + "px"};
`;

export const ElementHeader = styled.div`
  /* border: 1px solid red; */
  padding: 12px 16px;
  color: #172b4d;
  font-weight: 700;
`;

export const NewCardBtn = styled.div`
  display: flex;
  padding: 12px 16px;
`;

export const CardContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 0 8px 8px 8px;
`;
