import React, { useState } from "react";
import NoteCard from "./NoteCard";
import { IoAddOutline } from "react-icons/io5";

function AddNote() {
  const cardInfo = JSON.parse(localStorage.getItem("card details")) || {};

  const maxOfIds = Object.keys(cardInfo).length;
  const [cnt, setCnt] = useState(maxOfIds);
  const [cards, setCards] = useState(cardInfo);
  const [selectedId, setSelectedId] = useState(null);

  function handleNoteAdd(
    note,
    position = {
      x: Math.floor(Math.random() * (window.innerWidth - 400)),
      y: Math.floor(Math.random() * (window.innerHeight - 400)),
    }
  ) {
    setCnt((prevCnt) => {
      const newCnt = prevCnt + 1;
      setCards((prev) => ({
        ...prev,
        [newCnt]: {
          note,
          position,
          color: "#FEE5FD",
        },
      }));
      return newCnt;
    });
  }

  function handleNoteUpdate(id, updatedNote, updatedPosi) {
    setCards((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        note: updatedNote,
        position: updatedPosi,
      },
    }));
  }

  function handleColorChange(newColor) {
    setCards((prev) => {
      const updated = {};

      Object.entries(cards).forEach(([id, { note, position, color }]) => {
        updated[id] = {
          ...prev[id],
          color: id == selectedId ? newColor : color,
        };
      });

      return updated;
    });
  }

  function handleRemove(Nid) {
    setCards((prev) => {
      return Object.fromEntries(
        Object.entries(cards).filter(([id]) => {
          return id !== String(Nid);
        })
      );
    });
  }

  localStorage.setItem("card details", JSON.stringify(cards));

  return (
    <div>
      <div className="buttons">
        <button id="addButton" onClick={() => handleNoteAdd("")}>
          <IoAddOutline size={32} className="addIcon" />
        </button>
        <button
          className="colorChoose"
          style={{
            backgroundColor: "#FEE5FD",
          }}
          onClick={() => handleColorChange("#FEE5FD")}
        ></button>
        <button
          className="colorChoose"
          style={{
            backgroundColor: "#A6DCE9",
          }}
          onClick={() => handleColorChange("#A6DCE9")}
        ></button>
        <button
          className="colorChoose"
          style={{
            backgroundColor: "#FFF5DF",
          }}
          onClick={() => handleColorChange("#FFF5DF")}
        ></button>
      </div>

      {Object.entries(cards).map(([id, { note, position, color }]) => (
        <NoteCard
          key={id}
          id={id}
          note={note}
          color={color}
          initialPos={position}
          onUpdate={handleNoteUpdate}
          onSelect={() => setSelectedId(id)}
          removal={handleRemove}
        />
      ))}
    </div>
  );
}

export default AddNote;
