import "./index.css";

interface IGridCell
{
  col:any
  row:any
  key:any
  isBlock:any
  isVisited:any
  columnSelected:any
  handleClickedStartColumn:any
  handleBlockCell:any
}

export default function GridCell({col,row,key,isBlock,isVisited,columnSelected,handleClickedStartColumn,handleBlockCell}:IGridCell) {


  const handleColumnSelection = (row:any, col:any) => {
    if (row === 0) {
      handleClickedStartColumn(col);
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
      } ${row === 0 && !isVisited && columnSelected ? "hide" : ""}`}
      onClick={() => handleColumnSelection(row, col)}
    ></div>
  );
}
