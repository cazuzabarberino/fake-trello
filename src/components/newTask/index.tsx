import React from "react";
import { Container } from "./styled";
import { FiX } from "react-icons/fi";
import { withTheme, DefaultTheme } from "styled-components";
import useKeyMouseToSaveClose from "../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../hooks/useFocusInput";

interface Props {
  theme: DefaultTheme;
  listIndex: number;
  closeNewTask: () => void;
}

const NewTask = ({ theme, closeNewTask }: Props) => {
  const [input, setInput] = React.useState("");
  const inputRef = useFocusInput();
  const saveInput = React.useCallback(() => {
    setInput("");
  }, [setInput]);

  const containerRef = useKeyMouseToSaveClose(saveInput, closeNewTask);

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
