import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 300px;
  background: ${({ theme }) => theme.taskColor};
  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  header {
    position: relative;
    display: grid;
    place-content: center;
    padding: 8px 16px;

    p {
      font-size: 14px;
      text-align: center;
      opacity: 0.5;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 12px;
      display: grid;
      place-content: center;
      border: none;
      background: none;
      opacity: 0.5;

      :hover {
        opacity: 1;
      }
    }
  }

  ul {
    list-style: none;
    padding: 8px 0;

    li {
      button {
        width: 100%;
        border: none;
        background: none;
        font-size: 14px;
        padding: 8px 12px;
        text-align: start;

        :hover {
          background: ${({ theme }) => theme.listColor};
        }
      }
    }
  }
`;

export const Division = styled.div`
  height: 1px;
  background: #ddd;
  margin: 0 12px;
`;
