import Coord from "../models/Coord";

export let listRects: DOMRect[] = new Array<DOMRect>();

let element: null | HTMLDivElement = null;

const getScroll = () => {
  if (!element) {
    element = document.getElementById("scroll-test") as HTMLDivElement;
  }

  return element.scrollLeft;
};

export const getRectX = (index: number): number => {
  const rect = listRects[index];
  const scroll = getScroll();
  return rect.x - scroll;
};

export const saveListRect = (linstIndex: number, rect: DOMRect) => {
  const scroll = getScroll();

  rect.x += scroll;
  listRects[linstIndex] = rect;
};

export const rectInRangeX = (rect: DOMRect, coord: Coord): boolean => {
  const scroll = getScroll();
  coord.x += scroll;

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

export const checkRangeY = (rect: DOMRect, coord: Coord): number => {
  if (coord.y >= rect.y + rect.height * 0.5) return 0;
  else if (coord.y <= rect.y + rect.height * 0.5) return -1;
  else return 1;
};
