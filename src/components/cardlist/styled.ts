import styled from "styled-components";

interface ContainerProps {
  height: number;
}

export const ElementShadow = styled.div<ContainerProps>`
  /* position: relative; */
  width: 272px;
  background: #555;
  border-radius: 4px;
  height: ${({ height }) => height + "px"};
`;

export const ElementContainer = styled.div`
  width: 272px;
  flex: none;
  background: #ebecf0;

  font-size: 14px;
  border-radius: 4px;
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
