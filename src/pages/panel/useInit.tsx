import axios from "axios";
import { DefaultTheme } from "styled-components";
import { TaskListContext } from "../../Contexts/TaskListContext";
import React from "react";

export default function useInit(
  addList: (title: string) => void,
  createLabel: (title: string, color: string) => void,
  theme: DefaultTheme
) {
  const responseRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    async function FetchText() {
      try {
        responseRef.current = (
          await axios.get<string[]>(
            "https://baconipsum.com/api/?type=meat-and-fille&paras=5&start-with-lorem=1"
          )
        ).data;

        init();
      } catch (err) {
        console.log(err);
      }
    }

    FetchText();
  }, []);

  function init() {
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

    addList("");
    addList("");
    addList("");
    addList("");
  }
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
