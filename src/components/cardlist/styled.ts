import styled from "styled-components";

interface CardContentProps {
  dragging?: boolean;
}

export const Container = styled.div`
  border: 2px solid red;
  min-width: 272px;

  height: 100%;

  & + div {
    margin-left: 8px;
  }
`;

export const CardContent = styled.div<CardContentProps>`
  position: relative;
  max-width: 272px;
  width: 100%;
  max-height: 100%;
  padding: 0 4px;

  display: flex;
  flex-direction: column;

  background: ${({ dragging }) => (dragging ? "none" : "#ebecf0")};

  font-size: 14px;
  border-radius: 4px;
`;

interface ShadowProps {
  dragging: boolean;
}

export const Shadow = styled.div<ShadowProps>`
  display: ${({ dragging }) => (dragging ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  top: 0;
  left: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.35);
`;

export const CardHeader = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  padding: 12px 8px;
  color: #172b4d;
  font-weight: 700;
  cursor: pointer;
`;

export const NewTaskBtn = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  display: flex;
  padding: 12px 8px;
`;

interface draggingProps {
  dragging?: boolean;
}

export const TaskContainer = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  display: flex;
  flex-direction: column;
  padding: 0 4px 8px 4px;
  flex: 1 1 auto;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #d9dce2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bdc3ce;
    border-radius: 10px;
  }
`;
