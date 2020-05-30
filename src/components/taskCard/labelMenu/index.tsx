import React from "react";
import { FiArrowLeft, FiCheck, FiX, FiEdit2 } from "react-icons/fi";
import { ThemeContext } from "styled-components";
import { LabelContext } from "../../../Contexts/LabelContext";
import useKeyMouseToSaveClose from "../../../hooks/useKeyMouseToSaveClose";
import {
  ColorBoxWrapper,
  ColorSelectBox,
  ConfirmBtn,
  Container,
  Content,
  Division,
  LabelSelectBox,
  LabelSelectBoxWrapper,
  OptionBtn,
} from "./styled";
import {
  TaskListContext,
  TaskListContextValue,
} from "../../../Contexts/TaskListContext";

interface Props {
  top: number;
  left: number;
  listIndex: number;
  taskIndex: number;
  close: () => void;
  labels: string[];
}

enum LabelMenuPage {
  main,
  newLabel,
}

export default ({
  top,
  left,
  listIndex,
  taskIndex,
  close,
  labels: taskLabels,
}: Props) => {
  const { containerRef } = useKeyMouseToSaveClose(() => {}, close);
  const { state, actions } = React.useContext(LabelContext);
  const [page, setPage] = React.useState<LabelMenuPage>(LabelMenuPage.main);
  const [selectedColor, setSelectedColor] = React.useState("");
  const [input, setInput] = React.useState("");
  const { editLabel } = React.useContext(
    TaskListContext
  ) as TaskListContextValue;

  // console.log(state);

  const {
    green,
    yellow,
    orange,
    red,
    purple,
    blue,
    sky,
    lime,
    pink,
    black,
  } = React.useContext(ThemeContext);

  const colorBoxes = React.useMemo(() => {
    const colorArr = [
      green,
      yellow,
      orange,
      red,
      purple,
      blue,
      sky,
      lime,
      pink,
      black,
    ];
    return colorArr.map((color) => (
      <ColorSelectBox
        key={color}
        color={color}
        onClick={() => setSelectedColor(color)}
      >
        {selectedColor === color && <FiCheck color="white" size={20} />}
      </ColorSelectBox>
    ));
  }, [
    green,
    yellow,
    orange,
    red,
    purple,
    blue,
    sky,
    lime,
    pink,
    black,
    selectedColor,
  ]);

  const header = React.useMemo(() => {
    switch (page) {
      case LabelMenuPage.newLabel:
        return (
          <>
            <p>Create Label</p>
            <button onClick={() => setPage(LabelMenuPage.main)}>
              <FiArrowLeft size={16} />
            </button>
          </>
        );
      default:
        return (
          <>
            <p>Labels</p>
            <button onClick={close}>
              <FiX size={16} />
            </button>
          </>
        );
    }
  }, [close, page, setPage]);

  const content = React.useMemo(() => {
    switch (page) {
      case LabelMenuPage.newLabel:
        return (
          <>
            <label htmlFor="name">Name</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="name"
            />
            <p>Select a color</p>
            <ColorBoxWrapper>{colorBoxes}</ColorBoxWrapper>
            <ConfirmBtn
              onClick={() => {
                if (!input || !selectedColor) return;
                actions.createLabel(input, selectedColor);
                setPage(LabelMenuPage.main);
              }}
            >
              Confirm
            </ConfirmBtn>
          </>
        );
      default:
        return (
          <>
            <p>LABELS</p>
            <LabelSelectBoxWrapper>
              {state.labels.map((label) => (
                <React.Fragment key={label.id + "btnfrag"}>
                  <LabelSelectBox
                    key={label.id}
                    color={label.color}
                    onClick={() => editLabel(label.id, taskIndex, listIndex)}
                  >
                    <p>{label.title}</p>
                    {taskLabels.findIndex((l) => l === label.id) >= 0 && (
                      <FiCheck color="white" size={20} />
                    )}
                  </LabelSelectBox>
                  <button key={label.id + "btn"}>
                    <FiEdit2 size={16} />
                  </button>
                </React.Fragment>
              ))}
            </LabelSelectBoxWrapper>

            <OptionBtn onClick={() => setPage(LabelMenuPage.newLabel)}>
              Create a new Label
            </OptionBtn>
          </>
        );
    }
  }, [
    page,
    colorBoxes,
    input,
    actions,
    selectedColor,
    state.labels,
    taskLabels,
    editLabel,
    listIndex,
    taskIndex,
  ]);

  return (
    <Container
      ref={containerRef}
      top={top}
      left={left}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <header>{header}</header>
      <Division />
      <Content>{content}</Content>
    </Container>
  );
};
