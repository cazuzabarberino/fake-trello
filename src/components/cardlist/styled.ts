import styled from "styled-components";

interface ContainerProps {
  height: number;
}

export const Container = styled.div<ContainerProps>`
  /* position: relative; */
  min-width: 272px;
  background: #555;
  border-radius: 4px;
  height: ${({ height }) => height + "px"};
`;

export const Card = styled.div`
  min-width: 272px;
  background: #ddd;
  padding: 4px;
  border-radius: 4px;
`;
