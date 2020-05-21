import styled from "styled-components";

export const Card = styled.div`
  width: 256px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border-bottom: 1px solid #aaa;
  word-wrap: break-word;

  & + div {
    margin-top: 8px;
  }
`;
