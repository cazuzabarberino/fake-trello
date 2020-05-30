import React from "react";
import { FiX } from "react-icons/fi";
import { DefaultTheme, withTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../hooks/useKeyMouseToSaveClose";
import { Container } from "./styled";
import {
  TaskListContextValue,
  TaskListContext,
} from "../../Contexts/TaskListContext";

interface Props {
  theme: DefaultTheme;
  scrollToRight: () => void;
}

const NewList = ({ theme, scrollToRight }: Props) => {
  const { addList } = React.useContext(TaskListContext) as TaskListContextValue;

  const [creatingNewList, setCreatingNewList] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [input, setInput] = React.useState("");
  const saveInput = React.useCallback(() => {
    if (!creatingNewList || !input) return;
    addList(input);
    setInput("");
    scrollToRight();
  }, [setInput, input, addList, creatingNewList, scrollToRight]);

  const close = React.useCallback(() => setCreatingNewList(false), []);
  const open = React.useCallback(() => {
    setCreatingNewList(true);
  }, []);

  React.useLayoutEffect(() => {
    if (creatingNewList) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [creatingNewList]);

  const { containerRef } = useKeyMouseToSaveClose(saveInput, close);

  return (
    <Container creating={creatingNewList} ref={containerRef}>
      <div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Insira o título da lista..."
        />
        <div>
          <button
            onClick={() => {
              saveInput();
            }}
          >
            Adicionar Lista
          </button>
          <button onClick={close}>
            <FiX size={24} color={theme.fontColor} />
          </button>
        </div>
      </div>
      <p onClick={open}>Adicionar outra lista</p>
    </Container>
  );
};

export default withTheme(NewList);
