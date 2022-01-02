import React from "react";
import "./index.css";

interface INode
{

  col:any
  row:any
  key:any
  isBlock:any
  isVisited:any
  columnChosen:any
  handleSelectStartColumn:any
  handleBlockCell:any
}

export default function Node({col,row,key,isBlock,isVisited,columnChosen,handleSelectStartColumn,handleBlockCell}:INode) {


  const handleColumnSelection = (row:any, col:any) => {
    if (row === 0) {
      handleSelectStartColumn(col);
    }
  };

  const allowDrop = (e:any) => {
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