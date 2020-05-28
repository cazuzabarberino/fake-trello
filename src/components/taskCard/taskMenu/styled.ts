import styled from "styled-components";
import { darken, lighten } from "polished";

interface MenuProps {
  top: number;
  left: number;
}

export const Container = styled.div<MenuProps>`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  /* background:  ${({ theme }) => theme.transparency}; */
  cursor: auto;

  & > div {
    position: absolute;
    top: ${({ top }) => top + "px"};
    left: ${({ left }) => left + "px"};
    display: flex;
    padding-right: 8px;
    /* background: ${({ theme }) => theme.transparencyLight};
    box-shadow: 0 0 10px 10px ${({ theme }) => theme.transparencyLight}; */
  }
`;

interface EditZoneProps {
  width: number;
}

export const EditZone = styled.div<EditZoneProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  & > textarea {
    resize: none;
    width: ${({ width }) => width + "px"};
    height: 100px;

    border: none;
    border-radius: 4px;
    padding: 8px;
  }

  & > button {
    margin-top: 16px;
    padding: 8px 16px;
    background: ${({ theme }) => theme.green};
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    transition: 0.1s;

    :hover {
      background: ${({ theme }) => lighten(0.1, theme.green)};
    }

    :active {
      background: ${({ theme }) => darken(0.1, theme.green)};
    }
  }
`;

export const OptionsZone = styled.div`
  margin-left: 8px;

  & > button {
    background: ${({ theme }) => theme.transparency};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    & > p {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 700;
    }

    transition: 0.1s;

    :hover {
      transform: translateX(8px);
      background: ${({ theme }) => darken(0.1, theme.transparency)};
    }
  }
`;
