import { useEffect, useState } from "react";

export function checkPosition(currPos, moveDir = { x: 0, y: 0 }) {
  const xOffSet = currPos.offsetLeft - moveDir.x;
  const yOffSet = currPos.offsetTop - moveDir.y;

  return {
    x: xOffSet < 0 ? 0 : xOffSet,
    y: yOffSet < 0 ? 0 : yOffSet,
  };
}

export function zIndexP(currPos) {
  currPos.style.zIndex = 99;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== currPos) {
      card.style.zIndex = currPos.style.zIndex - 1;
    }
  });
}

export function debouncer(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debouncedValue;
}
