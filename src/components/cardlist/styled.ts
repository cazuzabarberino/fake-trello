import styled from "styled-components";

const transitionDuration = ".2s ease-out";

interface ElementShadowProps {
  height: number;
  index: number;
}

export const ElementShadow = styled.div<ElementShadowProps>`
  /* position: relative; */
  /* position: absolute;
  left: ${({ index }) => 8 * (index + 1) + index * 272 + "px"}; */
  width: 272px;
  /* background: rgba(0, 0, 0, 0.32); */
  border-radius: 4px;
  height: ${({ height }) => height + "px"};
`;

interface MovingShadowProps {
  x: number;
  y: number;
  height: number;
}

export const MovingShadow = styled.div<MovingShadowProps>`
  position: fixed;
  top: ${({ y }) => y + "px"};
  left: ${({ x }) => x + "px"};
  transition: ${transitionDuration};
  background: rgba(0, 0, 0, 0.32);
  width: 272px;
  height: ${({ height }) => height + "px"};
`;

export const ElementContainer = styled.div`
  position: fixed;
  width: 272px;
  flex: none;
  background: #ebecf0;
  z-index: 1;

  font-size: 14px;
  border-radius: 4px;
  transition: ${transitionDuration};
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
