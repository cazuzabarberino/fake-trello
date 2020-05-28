import React from "react";
import { Container, EditZone, OptionsZone } from "./styled";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../../hooks/useFocusInput";
import { FiArchive } from "react-icons/fi";
import {
  TaskListContextValue,
  TaskListContext,
} from "../../../Contexts/TaskListContext";

interface Props {
  close: () => void;
  rect: DOMRect;
  title: string;
  taskIndex: number;
  listIndex: number;
}

const TaskMenu = ({ close, rect, title, listIndex, taskIndex }: Props) => {
  const inputRef = useFocusInput<HTMLTextAreaElement>();
  const [input, setInput] = React.useState("");
  const { deleteTask, editTaskTitle } = React.useContext(
    TaskListContext
  ) as TaskListContextValue;

  React.useEffect(() => {
    setInput(title);
  }, [title]);

  const save = React.useCallback(() => {
    if (input === "") return;
    editTaskTitle(input, taskIndex, listIndex);
    close();
  }, [input, close, editTaskTitle, taskIndex, listIndex]);

  const contentRef = useKeyMouseToSaveClose(save, close);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      top={rect.y}
      left={rect.x}
    >
      <div ref={contentRef}>
        <EditZone height={rect.height} width={rect.width}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button>Salvar</button>
        </EditZone>
        <OptionsZone>
          <button
            onClick={() => {
              deleteTask(taskIndex, listIndex);
            }}
          >
            <FiArchive />
            <p>Arquivar</p>
          </button>
        </OptionsZone>
      </div>
    </Container>
  );
};

export default TaskMenu;
