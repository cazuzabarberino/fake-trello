import styled from "styled-components";

interface CardContentProps {
  dragging?: boolean;
}

export const Container = styled.div`
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

  display: grid;
  grid-auto-flow: row;

  background: ${({ dragging, theme }) => (dragging ? "none" : theme.listColor)};

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
  top: 0;
  left: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.transparency};
`;

export const CardHeader = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  padding: 12px 8px;
  font-weight: 700;
  cursor: pointer;
`;

export const NewTaskBtn = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  display: grid;
  grid-auto-flow: column;
  align-content: center;
  place-content: start;

  column-gap: 8px;
  padding: 8px 8px;
  cursor: pointer;
  margin: 0 4px;
  margin-bottom: 8px;

  :hover {
    background: rgba(9, 30, 66, 0.08);
  }
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
    background: ${({ theme }) => theme.scrollBar};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollThumb};
    border-radius: 10px;
  }
`;
