import React from "react";
import styled from "styled-components";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../../hooks/useFocusInput";
import {
  TaskListContext,
  TaskListContextValue,
} from "../../../Contexts/TaskListContext";

interface Props {
  title: string;
  close: () => void;
  listIndex: number;
}

const CardlistEditTitle = ({ title, close, listIndex }: Props) => {
  const [input, setInput] = React.useState("");

  const { editListTitle } = React.useContext(
    TaskListContext
  ) as TaskListContextValue;

  const save = React.useCallback(() => {
    if (!input) return;
    editListTitle(input, listIndex);
    close();
  }, [input, close, editListTitle, listIndex]);

  const contentRef = useKeyMouseToSaveClose(save, close);
  const inputRef = useFocusInput<HTMLInputElement>();

  React.useEffect(() => {
    setInput(title);
  }, [title]);

  return (
    <Container ref={contentRef}>
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
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

const Input = styled.input`
  width: calc(100% - 32px);
  height: calc(100% - 4px);
  border: none;
  background: none;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 700;
  background: ${({ theme }) => theme.taskColor};
  border: 2px solid ${({ theme }) => theme.green};
  border-radius: 4px;
  color: ${({ theme }) => theme.fontColor};
`;

export default CardlistEditTitle;
