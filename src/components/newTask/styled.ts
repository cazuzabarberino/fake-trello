import styled from "styled-components";
import { transparentize, darken } from "polished";

export const Container = styled.div`
  /* border: 2px solid red; */
  margin: 0 4px 8px 4px;
  display: flex;
  flex-direction: column;

  div {
    margin-top: 8px;
    display: flex;
    justify-content: start;
    align-content: center;
  }

  input {
    width: 100%;
    background: ${({ theme }) => theme.taskColor};
    border-radius: 4px;
    border: none;
    border-bottom: 1px solid #bbb;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    padding: 8px;
    resize: vertical;
    font-size: 14px;
    color: ${({ theme }) => theme.fontColor};
    padding-bottom: 39px;

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
