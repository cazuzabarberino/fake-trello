import styled from "styled-components";

interface ShadowProps {
  height: number;
}

export const Shadow = styled.div<ShadowProps>`
  background: black;
  border-radius: 4px;
  height: ${({ height }) => (height > 0 ? height + "px" : "max-content")};
`;

export const Card = styled.div`
  width: 256px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid #aaa;
`;
