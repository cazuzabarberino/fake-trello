import axios from "axios";
import React from "react";
import { ThemeContext } from "styled-components";
import { LabelContext } from "../../Contexts/LabelContext";
import { TaskListContext } from "../../Contexts/TaskListContext";
import moment from "moment";

export default function useInit() {
  const [loading, setLoading] = React.useState(true);
  const placeHolderRef = React.useRef(false);
  const responseRef = React.useRef<string[]>([]);
  const theme = React.useContext(ThemeContext);
  const {
    state,
    actions: { createLabel },
  } = React.useContext(LabelContext);
  const {
    taskListActions: {
      addList,
      addNewTask,
      editLabel,
      editTaskDate,
      editCompleteState,
    },
  } = React.useContext(TaskListContext);

  const init = React.useCallback(() => {
    const colors = [
      theme.red,
      theme.green,
      theme.lime,
      theme.pink,
      theme.purple,
      theme.black,
      theme.blue,
      theme.sky,
    ];

    shuffleArray(colors);

    const texts = responseRef.current
      .map((text) => text.split(". "))
      .flat()
      .map((text) => text.split(", "))
      .flat()
      .map((text) => {
        let newText = text;
        if (newText[0] === " ") newText = text.slice(1);
        return Capitalize(newText);
      });

    const labelTextIndex = Math.floor(Math.random() * texts.length);
    const labelText = texts[labelTextIndex].split(" ");
    texts.splice(labelTextIndex, 1);
    const numberOfLabels = Math.min(labelText.length, 5);
    for (let i = 0; i < numberOfLabels; i++)
      createLabel(Capitalize(labelText[i]), colors[i]);

    addList("Backlog");
    addList("Sprint");
    addList("Overdue");

    const tasksPerList = [];
    let totalTasks = texts.length;
    tasksPerList[0] = Math.floor(totalTasks / 2);
    totalTasks -= Math.floor(totalTasks / 2);
    tasksPerList[1] = Math.floor(totalTasks / 2);
    totalTasks -= Math.floor(totalTasks / 2);
    tasksPerList[2] = totalTasks;

    const allLabels = [...state.labels];

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < tasksPerList[i]; j++) {
        const init = i === 0 ? 0 : tasksPerList[i - 1];
        addNewTask(texts[init + j], i);
        const nTaskLabels = Math.floor(Math.random() * numberOfLabels);
        shuffleArray(allLabels);
        for (let k = 0; k < nTaskLabels; k++) {
          editLabel(allLabels[k].id, j, i);
        }

        const dueStatus = Math.floor(Math.random() * 4);

        if (dueStatus > 0) {
          const offset = Math.floor(Math.random() * 5) - 2;
          const date = moment().add(offset, "days").format("DD/MM/YY");
          editTaskDate(date, j, i);
          if (dueStatus === 1) editCompleteState(true, j, i);
        }
      }

    setLoading(false);
  }, [
    theme,
    addList,
    createLabel,
    addNewTask,
    editLabel,
    state.labels,
    editTaskDate,
    editCompleteState,
  ]);

  React.useEffect(() => {
    async function FetchText() {
      try {
        responseRef.current = (
          await axios.get<string[]>(
            "https://baconipsum.com/api/?type=meat-and-fille&paras=3&start-with-lorem=1"
          )
        ).data;

        init();
      } catch (err) {
        console.log(err);
      }
    }
    if (!placeHolderRef.current) {
      FetchText();
      placeHolderRef.current = true;
    }
  }, [init]);

  return loading;
}

function Capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
