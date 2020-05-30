import React from "react";
import { FiArchive, FiClock } from "react-icons/fi";
import {
  TaskListContext,
  TaskListContextValue,
} from "../../../Contexts/TaskListContext";
import useFocusInput from "../../../hooks/useFocusInput";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import Task from "../../../models/Task";
import DateBadge from "../DateBadge";
import DateMenu from "../dateMenu";
import { Container, EditZone, OptionsZone } from "./styled";

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
            {task.date && <DateBadge date={task.date} />}
          </div>
          <button onClick={save}>Save</button>
        </EditZone>
        <OptionsZone>
          <button
            onClick={() => {
              setDateMenuOpen(true);
              pauseRef.current = true;
            }}
          >
            <FiClock />
            <p>Change Due Date</p>
          </button>
          <button
            onClick={() => {
              deleteTask(taskIndex, listIndex);
            }}
          >
            <FiArchive />
            <p>Archive</p>
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
