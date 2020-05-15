import styled from "styled-components";

interface ShadowProps {
  height: number;
}

export const Shadow = styled.div<ShadowProps>`
  background: rgba(0, 0, 0, .32);
  border-radius: 4px;
  height: ${({ height }) => (height > 0 ? height + "px" : "max-content")};
`;

export const Card = styled.div`
  width: 256px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid #aaa;
  word-wrap: break-word;
`;
