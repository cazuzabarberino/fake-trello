import React from "react";
import shortid from "shortid";
import TaskList from "../models/List";
import Task from "../models/Task";
import { TaskListContextValue } from "../Contexts/TaskListContext";

export default function useTaskList(
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
        labels: [],
        title,
        id: shortid.generate(),
        date: "",
        complete: false,
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

  const editListTitle = React.useCallback(
    (title: string, listIndex: number) => {
      const newList = [...allLists];
      newList[listIndex].title = title;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editTaskTitle = React.useCallback(
    (title: string, taskIndex: number, listIndex: number) => {
      const newList = [...allLists];
      newList[listIndex].tasks[taskIndex].title = title;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editTaskDate = React.useCallback(
    (date: string, taskIndex: number, listIndex: number) => {
      const newList = [...allLists];
      newList[listIndex].tasks[taskIndex].date = date;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editCompleteState = React.useCallback(
    (state: boolean, taskIndex: number, listIndex: number) => {
      const newList = [...allLists];
      newList[listIndex].tasks[taskIndex].complete = state;
      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const editLabel = React.useCallback(
    (labelid: string, taskIndex: number, listIndex: number) => {
      const newList = [...allLists];
      const hasLabel = newList[listIndex].tasks[taskIndex].labels.findIndex(
        (label) => label === labelid
      );

      if (hasLabel >= 0)
        newList[listIndex].tasks[taskIndex].labels = newList[listIndex].tasks[
          taskIndex
        ].labels.filter((label) => label !== labelid);
      else
        newList[listIndex].tasks[taskIndex].labels = [
          ...newList[listIndex].tasks[taskIndex].labels,
          labelid,
        ];

      setAllLists(newList);
    },
    [allLists, setAllLists]
  );

  const taskListContextValue: TaskListContextValue = React.useMemo(
    () => ({
      addList,
      addNewTask,
      deleteTask,
      deleteList,
      editListTitle,
      editTaskTitle,
      editTaskDate,
      editCompleteState,
      editLabel,
    }),
    [
      addList,
      addNewTask,
      deleteList,
      deleteTask,
      editListTitle,
      editTaskTitle,
      editTaskDate,
      editCompleteState,
      editLabel,
    ]
  );

  return taskListContextValue;
}
