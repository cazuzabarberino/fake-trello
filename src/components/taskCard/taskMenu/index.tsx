import React from "react";
import { FiArchive, FiClock, FiTag } from "react-icons/fi";
import { TaskListContext } from "../../../Contexts/TaskListContext";
import useFocusInput from "../../../hooks/useFocusInput";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import Task from "../../../models/Task";
import DateBadge from "../DateBadge";
import DateMenu from "../dateMenu";
import { Container, EditZone, OptionsZone } from "./styled";
import LabelMenu from "../labelMenu";
import { LabelWrapper } from "../styled";

interface Props {
  close: () => void;
  rect: DOMRect;
  task: Task;
  taskIndex: number;
  listIndex: number;
  taskLabels: JSX.Element[];
}

const TaskMenu = ({
  close,
  rect,
  task,
  listIndex,
  taskIndex,
  taskLabels,
}: Props) => {
  const inputRef = useFocusInput<HTMLTextAreaElement>();
  const [input, setInput] = React.useState("");
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const [labelMenuOpen, setLabelMenuOpen] = React.useState(false);
  const {
    taskListActions: { deleteTask, editTaskTitle },
  } = React.useContext(TaskListContext);

  React.useEffect(() => {
    setInput(task.title);
  }, [task.title]);

  const save = React.useCallback(() => {
    if (input === "") return;
    editTaskTitle(input, taskIndex, listIndex);
    close();
  }, [input, close, editTaskTitle, taskIndex, listIndex]);

  const { containerRef, pauseRef } = useKeyMouseToSaveClose(save, close);

  console.log(window.innerHeight);

  const y = Math.min(rect.y, window.innerHeight - 250);

  return (
    <Container onMouseDown={(e) => e.stopPropagation()} top={y} left={rect.x}>
      <div ref={containerRef}>
        <EditZone height={rect.height} width={rect.width}>
          <div>
            <LabelWrapper>{taskLabels}</LabelWrapper>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            {task.date && (
              <DateBadge
                taskIndex={taskIndex}
                listIndex={listIndex}
                complete={task.complete}
                date={task.date}
              />
            )}
          </div>
          <button onClick={save}>Save</button>
        </EditZone>
        <OptionsZone>
          <button
            onClick={() => {
              setLabelMenuOpen(true);
              pauseRef.current = true;
            }}
          >
            <FiTag />
            <p>Edit Labels</p>
          </button>
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
        {labelMenuOpen && (
          <LabelMenu
            close={() => {
              setLabelMenuOpen(false);
              pauseRef.current = false;
            }}
            top={y}
            left={rect.x + rect.width + 8}
            taskIndex={taskIndex}
            listIndex={listIndex}
            labels={task.labels}
          />
        )}
        {dateMenuOpen && (
          <DateMenu
            date={task.date}
            close={() => {
              setDateMenuOpen(false);
              pauseRef.current = false;
            }}
            top={y}
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
