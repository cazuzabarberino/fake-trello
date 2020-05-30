import styled, { css } from "styled-components";

interface draggingProps {
  dragging?: boolean;
  selfTaskDragging?: boolean;
}

export const Container = styled.div`
  min-width: 272px;

  height: 100%;

  & + div {
    margin-left: 8px;
  }
`;

export const CardContent = styled.div<draggingProps>`
  position: relative;
  max-width: 272px;
  width: 100%;
  padding: 0 4px;

  max-height: 100%;

  /* display: flex;
  flex-direction: column; */

  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 4px;
  /* grid-auto-flow: row; */

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
  font-weight: 700;
  cursor: ${({ selfTaskDragging }) =>
    selfTaskDragging ? "inherit" : "pointer"};
  padding-top: 4px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;

  & > button {
    height: 32px;
    width: 32px;
    /* border: 2px solid red; */
    display: grid;
    place-content: center;
    border-radius: 4px;
    opacity: 0.5;
    border: none;

    :hover {
      opacity: 1;
      background: ${({ theme }) => theme.transparencyLight};
    }
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
    width: 100%;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  p {
  }
`;

export const NewTaskBtn = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  display: grid;
  grid-auto-flow: column;
  align-content: center;
  place-content: start;

  column-gap: 8px;
  padding: 8px 8px;
  cursor: ${({ selfTaskDragging }) =>
    selfTaskDragging ? "inherit" : "pointer"};
  margin: 0 4px;
  margin-bottom: 8px;

  ${({ selfTaskDragging }) =>
    !selfTaskDragging &&
    css`
      :hover {
        background: rgba(9, 30, 66, 0.08);
      }
    `}
`;

export const TaskContainer = styled.div<draggingProps>`
  opacity: ${({ dragging }) => (dragging ? 0 : 1)};
  display: flex;
  flex-direction: column;
  padding: 0 4px 0 4px;
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
