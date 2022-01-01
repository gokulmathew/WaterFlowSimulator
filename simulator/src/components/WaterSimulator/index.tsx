import {useState} from 'react';
import Cell from "./Cell";
import { cloneDeep } from "lodash";
import "./index.css";

const getInitialGrid = (rowCount:any, columnCount:any) => {
  const grid = [];
  for (let row = 0; row < rowCount + 2; row++) {
    const currentRow = [];
    for (let col = 0; col < columnCount; col++) {
      currentRow.push({
        col,
        row,
        isBlock: false,
        isVisited: false
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const getBlocks = (blockCount:any) => {
  const blocks = [];
  for (let index = 0; index < blockCount; index++) {
    blocks.push({ isMoved: false });
  }
  return blocks;
};

interface IWaterSimulator
{
  rowCount:number
  columnCount:number
  blockCount:number
  handleCurrentScreenChange:(e:any)=>void;
}
export default function  WaterSimulator( {
  rowCount,columnCount,blockCount,handleCurrentScreenChange
}:IWaterSimulator)  {

  const[columnChosen, setColumnChosen]= useState<boolean>(false);
  const[simulationStarted, setSimulationStarted]= useState<boolean>(false);
  const[simulationCompleted, setSimulationCompleted]= useState<boolean>(false);
  const[blocks, setBlocks]= useState(getBlocks(blockCount));
  const[grid, setGrid]= useState(getInitialGrid(rowCount, columnCount));



  // constructor(props) {
  //   super(props);
  //   const { rowCount, columnCount, blockCount } = this.props;
  //   this.state = {
  //     columnChosen: false,
  //     simulationStarted: false,
  //     simulationCompleted: false,
  //     blocks: getBlocks(blockCount),
  //     grid: getInitialGrid(rowCount, columnCount)
  //   };
  // }

  const handleSelectStartColumn = (col:any) => {
    const updatedGrid = cloneDeep(grid);
    setColumnChosen(true);

    setTimeout(() => {
      const currentCellsProcessed:any = [];
      const selectedStartCell :any= updatedGrid[0][col];
      selectedStartCell.isVisited = true;
      setGrid(updatedGrid)
      currentCellsProcessed.push(selectedStartCell);

      const interval = setInterval(() => {
        const currentCell = currentCellsProcessed.shift();
        currentCellsProcessed.push(
          ...getNextCell(currentCell, updatedGrid)
        );
        setGrid(updatedGrid)
        if (currentCellsProcessed.length === 0) {
          clearInterval(interval);
          setSimulationCompleted(true)
        }
      }, 100);
    }, 100);
  };

  const handleBlockCell = (row:any, col:any) => {
    const updatedGrid = cloneDeep(grid);
    updatedGrid[row][col].isBlock = true;
    setGrid(updatedGrid)
  };

  const getNextCell  =({ row, col }:any, updatedGrid:any) => {
    let nextCells :any = [];
    //If the flow reaches the last row, then end the simulation
    if (row === updatedGrid.length - 1) {
      return nextCells;
    }

    //If direct node which is below current node is not a wall or already visisted, then its a valid nextNode
    let nextCell = updatedGrid[row + 1][col];
    if (nextCell && !nextCell.isVisited && !nextCell.isBlock) {
      nextCell.isVisited = true;
      nextCells.push(nextCell);
    } else {
      let leftCell;
      let rightCell;

      if (col > 0) {
        leftCell = updatedGrid[row][col - 1];
        if (leftCell && !leftCell.isVisited && !leftCell.isBlock) {
          leftCell.isVisited = true;
          nextCells.push(leftCell);
        }
      }

      if (col < updatedGrid[0].length) {
        rightCell = updatedGrid[row][col + 1];
        if (rightCell && !rightCell.isVisited && !rightCell.isBlock) {
          rightCell.isVisited = true;
          nextCells.push(rightCell);
        }
      }
    }
    return nextCells;
  }

  const handleDragEnd = (e:any, index:any) => {
    const { dropEffect } = e.dataTransfer;
    if (dropEffect === "move" || dropEffect === "copy") {
      const updatedBlocks = cloneDeep(blocks);
      updatedBlocks[index].isMoved = true;
      setBlocks(updatedBlocks)
    }
  };

  const startSimulation = () => {
    setSimulationStarted(true)
  };

  const handleReset = () => {
    setColumnChosen(false);
    setSimulationStarted(false);
    setSimulationCompleted(false);
    setBlocks(getBlocks(blockCount));
    setGrid(getInitialGrid(rowCount, columnCount));
  };

  const getHeaderText = (blocksMovedCount:any) => {
    return blocksMovedCount === blockCount ? (
      <p>
        Select the waterflow start point by clicking on any of the blue boxes
      </p>
    ) : (
      <p>Drag the obstructions and place it inside grid</p>
    );
  };

  // return() {
    // const { handleCurrentScreenChange, blockCount } = this.props;
    // const {
    //   grid,
    //   blocks,
    //   columnChosen,
    //   simulationStarted,
    //   simulationCompleted
    // } = this.state;
    const blocksMovedCount = blocks.filter((block) => block.isMoved).length;

    return (
      <>
        {getHeaderText(blocksMovedCount)}
        <div className="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div
                  key={rowIdx}
                  className={`
                  grid-row
                  ${rowIdx === 0 && simulationStarted ? "show" : ""}
                `}
                >
                  {row.map((cell, cellIdx) => {
                    const { row, col, isBlock, isVisited } = cell;
                    return (
                      <Cell
                        col={col}
                        row={row}
                        key={cellIdx}
                        isBlock={isBlock}
                        isVisited={isVisited}
                        columnChosen={columnChosen}
                        handleSelectStartColumn={(col:any) =>
                          handleSelectStartColumn(col)
                        }
                        handleBlockCell={(row:any, col:any) =>
                          handleBlockCell(row, col)
                        }
                      ></Cell>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="blocks">
            {blocks.map((block, idx) => {
              return (
                <div
                  className={`block-container ${block.isMoved ? "moved" : ""}`}
                  key={idx}
                >
                  <div
                    draggable
                    className={`block ${block.isMoved ? "moved" : ""}`}
                    onDragEnd={(e) => handleDragEnd(e, idx)}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn margin-right"
            onClick={()=>handleCurrentScreenChange(false)}
          >
            Back
          </button>
          {!simulationStarted && (
            <button
              className="btn"
              disabled={blocksMovedCount !== blockCount}
              onClick={()=>startSimulation()}
            >
              Start Simulation
            </button>
          )}
          {simulationCompleted && (
            <button className="btn" onClick={()=>handleReset()}>
              Reset
            </button>
          )}
        </div>
      </>
    );
  // }
}


