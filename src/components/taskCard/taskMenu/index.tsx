import React from "react";
import { Container, EditZone, OptionsZone } from "./styled";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import useFocusInput from "../../../hooks/useFocusInput";
import { FiArchive, FiClock } from "react-icons/fi";
import {
  TaskListContextValue,
  TaskListContext,
} from "../../../Contexts/TaskListContext";
import DateMenu from "../dateMenu";
import Task from "../../../models/Task";
import { DateBadge } from "../styled";
import moment from "moment";

interface Props {
  close: () => void;
  rect: DOMRect;
  task: Task;
  taskIndex: number;
  listIndex: number;
}

const TaskMenu = ({ close, rect, task, listIndex, taskIndex }: Props) => {
  const inputRef = useFocusInput<HTMLTextAreaElement>();
  const [input, setInput] = React.useState("");
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const { deleteTask, editTaskTitle } = React.useContext(
    TaskListContext
  ) as TaskListContextValue;

  React.useEffect(() => {
    setInput(task.title);
  }, [task.title]);

  const save = React.useCallback(() => {
    if (input === "") return;
    editTaskTitle(input, taskIndex, listIndex);
    close();
  }, [input, close, editTaskTitle, taskIndex, listIndex]);

  const { containerRef, pauseRef } = useKeyMouseToSaveClose(save, close);

  return (
    <Container
      onMouseDown={(e) => e.stopPropagation()}
      top={rect.y}
      left={rect.x}
    >
      <div ref={containerRef}>
        <EditZone height={rect.height} width={rect.width}>
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            {task.date && (
              <DateBadge>
                <FiClock />
                <p>{moment(task.date, "DD MM YY").calendar()}</p>
              </DateBadge>
            )}
          </div>
          <button onClick={save}>Salvar</button>
        </EditZone>
        <OptionsZone>
          <button
            onClick={() => {
              setDateMenuOpen(true);
              pauseRef.current = true;
            }}
          >
            <FiClock />
            <p>Alterar Data de Entrega</p>
          </button>
          <button
            onClick={() => {
              deleteTask(taskIndex, listIndex);
            }}
          >
            <FiArchive />
            <p>Arquivar</p>
          </button>
        </OptionsZone>
        {dateMenuOpen && (
          <DateMenu
            close={() => {
              setDateMenuOpen(false);
              pauseRef.current = false;
            }}
            top={rect.y}
            left={rect.x + rect.width + 8}
            taskIndex={taskIndex}
            listIndex={listIndex}
          />
        )}
      </div>
    </Container>
  );
};

export default TaskMenu;
