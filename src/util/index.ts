export let taskRects: DOMRect[][];

export const initTaskRect = (arr: DOMRect[][]) => {
  taskRects = arr;
};

export const saveTaskRect = (
  listIndex: number,
  taskIndex: number,
  rect: DOMRect
) => {
  taskRects[listIndex][taskIndex] = rect;
};
