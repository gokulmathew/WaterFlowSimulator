import React from "react";
import "./index.css";

export default function Node(props) {
  const {
    col,
    row,
    isBlock,
    isVisited,
    columnChosen,
    handleBlockCell,
    handleSelectStartColumn
  } = props;

  const handleColumnSelection = (row, col) => {
    if (row === 0) {
      handleSelectStartColumn(col);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={() => handleBlockCell(row, col)}
      onDragOver={allowDrop}
      id={`cell-${row}-${col}`}
      className={`cell ${isBlock ? "cell-block" : ""} ${
        isVisited ? "cell-visited" : ""
      } ${row === 0 && !isVisited && columnChosen ? "hide" : ""}`}
      onClick={() => handleColumnSelection(row, col)}
    ></div>
  );
}
