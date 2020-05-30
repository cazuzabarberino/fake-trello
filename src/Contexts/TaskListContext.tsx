import React from "react";

export interface TaskListContextValue {
  deleteTask: (taskIndex: number, listIndex: number) => void;
  addNewTask: (title: string, listIndex: number) => void;
  deleteList: (listIndex: number) => void;
  addList: (title: string) => void;
  editListTitle: (title: string, listIndex: number) => void;
  editTaskTitle: (title: string, taskIndex: number, listIndex: number) => void;
  editTaskDate: (data: string, taskIndex: number, listIndex: number) => void;
  editCompleteState: (
    state: boolean,
    taskIndex: number,
    listIndex: number
  ) => void;
  editLabel: (labelid: string, taskIndex: number, listIndex: number) => void;
  deleteEveryLabel: (labelid: string) => void;
}

export const TaskListContext = React.createContext<TaskListContextValue | null>(
  null
);
