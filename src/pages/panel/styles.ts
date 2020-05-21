import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow-x: auto;
`;

export const ListContainter = styled.div`
  position: absolute;
  display: flex;
  padding: 8px;
  height: 100%;
  align-items: flex-start;
`;

export const FakeCard = styled.div`
  position: fixed;
  background: red;
  width: 272px;
  height: 50px;
`;
