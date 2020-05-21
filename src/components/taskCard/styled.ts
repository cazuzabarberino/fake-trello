import styled from "styled-components";

interface CardProps {
  dragging?: boolean;
}

export const Card = styled.div<CardProps>`
  position: relative;
  max-width: 256px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border-bottom: ${({ dragging }) => (dragging ? 0 : "1px")} solid #bbb;
  word-wrap: break-word;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

  & + div {
    margin-top: 8px;
  }

  &:hover {
    background: #eee;
  }
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
