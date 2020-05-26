import React from "react";
import { Container } from "./styled";
import { FiX } from "react-icons/fi";
import { withTheme, DefaultTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../hooks/useKeyMouseToSaveClose";

interface Props {
  theme: DefaultTheme;
  listIndex: number;
  closeNewTask: () => void;
}

const NewTask = ({ theme, closeNewTask }: Props) => {
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  const saveInput = React.useCallback(() => {
    setInput("");
  }, [setInput]);

  const containerRef = useKeyMouseToSaveClose(saveInput, closeNewTask);

  React.useLayoutEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  React.useLayoutEffect(() => {
    return () => {};
  }, [closeNewTask, saveInput]);

  return (
    <Container ref={containerRef}>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Insira um título para este cartão..."
      />
      <div>
        <button
          onClick={() => {
            saveInput();
          }}
        >
          Adicionar Cartão
        </button>
        <button onClick={closeNewTask}>
          <FiX size={24} color={theme.fontColor} />
        </button>
      </div>
    </Container>
  );
};

export default withTheme(NewTask);
