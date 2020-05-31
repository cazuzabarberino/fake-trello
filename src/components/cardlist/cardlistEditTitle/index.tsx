import React from "react";
import styled, { withTheme, DefaultTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../../hooks/useFocusInput";
import { TaskListContext } from "../../../Contexts/TaskListContext";
import { FiX } from "react-icons/fi";

interface Props {
  title: string;
  close: () => void;
  listIndex: number;
  theme: DefaultTheme;
}

const CardlistEditTitle = ({ title, close, listIndex, theme }: Props) => {
  const [input, setInput] = React.useState("");

  const {
    taskListActions: { editListTitle },
  } = React.useContext(TaskListContext);

  const save = React.useCallback(() => {
    if (!input) return;
    editListTitle(input, listIndex);
    close();
  }, [input, close, editListTitle, listIndex]);

  const { containerRef } = useKeyMouseToSaveClose(save, close);
  const inputRef = useFocusInput<HTMLInputElement>();

  React.useEffect(() => {
    setInput(title);
  }, [title]);

  return (
    <Container ref={containerRef}>
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Btn
        onClick={(e) => {
          close();
          e.stopPropagation();
        }}
      >
        <FiX size={20} color={theme.red} />
      </Btn>
    </Container>
  );
};

const Container = styled.div`
  top: 4px;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Btn = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  display: grid;
  place-content: center;
  height: 20px;
  width: 20px;

  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  width: calc(100% - 32px);
  height: calc(100% - 4px);
  border: none;
  background: none;
  padding: 8px 12px;
  padding-right: 28px;
  font-size: 14px;
  font-weight: 700;
  background: ${({ theme }) => theme.taskColor};
  border: 2px solid ${({ theme }) => theme.red};
  border-radius: 4px;
  color: ${({ theme }) => theme.fontColor};
`;

export default withTheme(CardlistEditTitle);
