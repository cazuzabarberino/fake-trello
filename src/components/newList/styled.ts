import styled from "styled-components";
import { transparentize, darken } from "polished";

interface ContainerProps {
  creating: boolean;
}

export const Container = styled.div<ContainerProps>`
  min-width: 272px;
  height: max-content;
  background: ${({ theme, creating }) =>
    creating ? theme.listColor : theme.transparency};
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  p {
    display: ${({ creating }) => (creating ? "none" : "block")};
    padding: 4px;
    color: white;
  }

  & > div {
    display: ${({ creating }) => (creating ? "block" : "none")};

    & > div {
      margin-top: 8px;
      display: flex;
      justify-content: start;
      align-content: center;
    }
  }

  input {
    width: 100%;
    background: ${({ theme }) => theme.taskColor};
    border-radius: 4px;
    border: none;
    padding: 8px;
    resize: vertical;
    font-size: 14px;
    color: ${({ theme }) => theme.fontColor};

    ::placeholder {
      color: ${({ theme }) => transparentize(0.5, theme.fontColor)};
    }
  }

  button {
    border: none;

    & + button {
      margin-left: 4px;
    }

    :nth-of-type(1) {
      background: ${({ theme }) => theme.green};
      border-radius: 4px;
      font-size: 14px;
      color: white;
      padding: 8px;

      :hover {
        background: ${({ theme }) => transparentize(0.2, theme.green)};
      }

      :active {
        background: ${({ theme }) => darken(0.2, theme.green)};
      }
    }

    :nth-of-type(2) {
      background: none;

      opacity: 0.5;

      :hover {
        opacity: 1;
      }
    }
  }
`;
