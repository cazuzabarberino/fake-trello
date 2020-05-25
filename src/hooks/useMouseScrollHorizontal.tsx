import React from "react";
import { clearInterval, setInterval } from "timers";
import Coord from "../models/Coord";

export default function useMouseScrollHorizontal(condition: boolean) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const mouseCoordRef = React.useRef<Coord>({ x: 0, y: 0 });

  const edgeSize = 150;
  const maxStep = 20;

  const saveMouseCoord = React.useCallback((event: MouseEvent) => {
    mouseCoordRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const checkMoveScroll = React.useCallback(() => {
    const element = scrollRef.current as HTMLDivElement;
    const rect = element.getBoundingClientRect();
    const leftEdge = edgeSize + rect.x;
    const rightEdge = rect.x + rect.width - edgeSize;

    const inLeftEdge = mouseCoordRef.current.x >= rightEdge;
    const inRightEdge = mouseCoordRef.current.x <= leftEdge;

    const canScrollLeft = element.scrollLeft > 0;
    const canScrollRight =
      element.scrollLeft < element.scrollWidth - rect.width;

    if ((!inLeftEdge || !canScrollRight) && (!inRightEdge || !canScrollLeft)) {
      return false;
    }

    let nextScroll = element.scrollLeft;

    if (canScrollRight && inLeftEdge) {
      const intensity = (mouseCoordRef.current.x - rightEdge) / edgeSize;
      nextScroll = nextScroll + Math.min(maxStep * intensity, maxStep);
    } else if (canScrollLeft && inRightEdge) {
      const intensity = (leftEdge - mouseCoordRef.current.x) / edgeSize;
      nextScroll = nextScroll - Math.min(maxStep * intensity, maxStep);
    }

    if (nextScroll !== element.scrollLeft) {
      element.scrollTo({
        left: nextScroll,
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    if (condition) {
      intervalRef.current = setInterval(checkMoveScroll, 30);
      window.addEventListener("mousemove", saveMouseCoord);
    } else {
      window.removeEventListener("mousemove", saveMouseCoord);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      window.removeEventListener("mousemove", saveMouseCoord);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [saveMouseCoord, checkMoveScroll, condition]);

  return scrollRef;
}
