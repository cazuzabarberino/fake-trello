import React from "react";

export interface DndTaskContextValue {
  taskDragging: boolean;
  listIndex: number;
  taskIndex: number;
  beginTaskDrag: (
    taskIndex: number,
    listIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rect: DOMRect
  ) => void;
  moveTaskVertically: (toTaskIndex: number) => void;
  moveTaskHorizontally: (toIndex: number) => void;
}

const DndTaskContext = React.createContext<DndTaskContextValue | null>(null);

export default DndTaskContext;
