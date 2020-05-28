import React from "react";
import { Container, Division } from "./styled";
import { FiX } from "react-icons/fi";
import Coord from "../../../models/Coord";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import {
  TaskListContextValue,
  TaskListContext,
} from "../../../Contexts/TaskListContext";

interface Props {
  menuPosition: Coord;
  close: () => void;
  openNewTask: () => void;
  listIndex: number;
}

const CardlistAction = ({
  menuPosition,
  close,
  openNewTask,
  listIndex,
}: Props) => {
  const containerRef = useKeyMouseToSaveClose(() => {}, close);
  const { deleteList } = React.useContext(
    TaskListContext
  ) as TaskListContextValue;
  return (
    <Container
      ref={containerRef}
      style={{
        top: menuPosition.y,
        left: menuPosition.x,
      }}
    >
      <header>
        <p>Ações da Lista</p>
        <button onClick={close}>
          <FiX size={16} />
        </button>
      </header>
      <Division />
      <ul>
        <li>
          <button
            onClick={() => {
              openNewTask();
              close();
            }}
          >
            Adicionar Cartão...
          </button>
        </li>
      </ul>
      <Division />
      <ul>
        <li>
          <button
            onClick={() => {
              deleteList(listIndex);
              close();
            }}
          >
            Arquivar esta Lista
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default CardlistAction;
