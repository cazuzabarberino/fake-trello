import Coord from "../models/Coord";

export let taskRects: DOMRect[][];
export let listRects: DOMRect[] = new Array<DOMRect>();

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

export const saveListRect = (linstIndex: number, rect: DOMRect) => {
  listRects[linstIndex] = rect;
};

export const rectInRangeX = (rect: DOMRect, coord: Coord): boolean => {
  return coord.x >= rect.x && coord.x <= rect.x + rect.width;
};

export const rectInRangeY = (
  rect: DOMRect,
  coord: Coord,
  yDirection: number
): boolean => {
  return yDirection > 0
    ? coord.y >= rect.y + rect.height * 0.6
    : coord.y <= rect.y + rect.height * 0.4;
};
