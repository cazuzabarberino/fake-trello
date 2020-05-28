import React from "react";

export interface TaskListContextValue {
  deleteTask: (taskIndex: number, listIndex: number) => void;
  addNewTask: (title: string, listIndex: number) => void;
  deleteList: (listIndex: number) => void;
  addList: (title: string) => void;
}

export const TaskListContext = React.createContext<TaskListContextValue | null>(
  null
);
