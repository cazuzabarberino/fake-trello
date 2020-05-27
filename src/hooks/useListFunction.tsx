import React from "react";
import shortid from "shortid";
import TaskList from "../models/List";
import Task from "../models/Task";

export default function useListFunction(
  allLists: TaskList[],
  setAllLists: React.Dispatch<React.SetStateAction<TaskList[]>>
) {
  const deleteTask = React.useCallback(
    (taskIndex: number, listIndex: number) => {
      const newList = [...allLists];

      newList[listIndex].tasks.splice(taskIndex, 1);

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const addNewTask = React.useCallback(
    (title: string, listIndex: number) => {
      const newList = [...allLists];
      const newTask: Task = {
        title,
        id: shortid.generate(),
      };
      newList[listIndex].tasks.push(newTask);
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const deleteList = React.useCallback(
    (listIndex: number) => {
      const newList = [...allLists];

      newList.splice(listIndex, 1);

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const addList = React.useCallback(
    (title: string) => {
      const newList = [...allLists];

      newList.push({
        id: shortid.generate(),
        tasks: [],
        title,
      });

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  return { addList, addNewTask, deleteList, deleteTask };
}
