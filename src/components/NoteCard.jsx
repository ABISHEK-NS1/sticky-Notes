import React, { useState, useRef, useEffect, forwardRef } from "react";
import Trash from "../icons/Trash";
import { checkPosition, zIndexP, debouncer } from "../utils/util";

const NoteCard = ({
  note,
  id,
  onUpdate,
  initialPos,
  color,
  onSelect,
  removal,
}) => {
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  let coord = { x: 0, y: 0 };
  let newPos;

  const [posi, setPosi] = useState(initialPos);
  const [body, setBody] = useState(note);
  const val = debouncer(body, 350);

  useEffect(() => {
    if (textAreaRef?.current) {
      autoGrow(textAreaRef);
    }
  }, []);

  useEffect(() => {
    onUpdate(id, val, posi);
  }, [val]);

  function autoGrow(passedArea) {
    if (!passedArea.current) return;
    const currH = passedArea.current;
    currH.style.height = "auto";
    currH.style.height = currH.scrollHeight + "px";
  }

  function mouseDown(e) {
    coord.x = e.clientX;
    coord.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.body.style.userSelect = "none";

    zIndexP(cardRef.current);

    onSelect();
  }

  function mouseMove(e) {
    if (!cardRef.current) return;

    const moveDir = {
      x: coord.x - e.clientX,
      y: coord.y - e.clientY,
    };

    coord.x = e.clientX;
    coord.y = e.clientY;

    newPos = checkPosition(cardRef.current, moveDir);
    setPosi(newPos);
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    onUpdate(id, body, newPos);
  }

  function handleBlur() {
    onUpdate(id, body, posi); // update only on blur
  }

  function handleRemoval() {}

  return (
    <div
      style={{ backgroundColor: color, left: posi.x, top: posi.y }}
      id="card"
      className="card"
      ref={cardRef}
    >
      <div
        id="card-header"
        style={{ backgroundColor: color }}
        onMouseDown={mouseDown}
      >
        <button
          style={{ backgroundColor: "inherit", border: "none" }}
          onClick={() => removal(id)}
        >
          <Trash />
        </button>
      </div>
      <div id="card-body">
        <textarea
          value={body}
          ref={textAreaRef}
          style={{ color: "black", fontFamily: "monospace" }}
          onInput={(e) => autoGrow({ current: e.target })}
          onFocus={() => {
            zIndexP(cardRef.current), onSelect();
          }}
          onChange={(e) => setBody(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default NoteCard;
