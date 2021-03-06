import {useState} from 'react';
import GridCell from "../../components/GridCell";
import { cloneDeep } from "lodash";
import "./index.css";
interface IWaterFlowSimulator
{
  gridRowCount:number
  gridColumnCount:number
  gridBlockCount:number
  setShowWaterSimulator:(e:any)=>void;
}

export default function  WaterFlowSimulator( {
  gridRowCount,gridColumnCount,gridBlockCount,setShowWaterSimulator
}:IWaterFlowSimulator)  {

  // Info: Creating grid array 
  const getInitialGrid = (rowCount:number, columnCount:number) => {
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
  
  // Info: Creating blocks array and setting the array value with isMoved: false
  const getBlocks = (blockCount:any) => {
    const blocks = [];
    for (let index = 0; index < blockCount; index++) {
      blocks.push({ isMoved: false });
    }
    return blocks;
  };

  
  const[columnSelected, setColumnSelected]= useState<boolean>(false);
  const[waterFlowSimulationStarted, setWaterFlowSimulationStarted]= useState<boolean>(false);
  const[waterFlowSimulationCompleted, setWaterFlowSimulationCompleted]= useState<boolean>(false);
  const[gridBlocks, setGridBlocks]= useState(getBlocks(gridBlockCount));
  const[waterFlowGrid, setWaterFlowGrid]= useState(getInitialGrid(gridRowCount, gridColumnCount));


  const handleBlockCell = (row:any, col:any) => {
    const updatedWaterGrid = cloneDeep(waterFlowGrid);
    updatedWaterGrid[row][col].isBlock = true;
    setWaterFlowGrid(updatedWaterGrid)
  };

  const getNextCell  =({ row, col }:any, updatedGrid:any) => {
    let nextGridCells :any = [];
    //If the flow reaches the last row, then end the simulation
    if (row === updatedGrid.length - 1) {
      return nextGridCells;
    }

    //If direct node which is below current node is not a wall or already visisted, then its a valid nextNode
    let nextCell = updatedGrid[row + 1][col];
    if (nextCell && !nextCell.isVisited && !nextCell.isBlock) {
      nextCell.isVisited = true;
      nextGridCells.push(nextCell);
    } else {
      let leftCell;
      let rightCell;

      if (col > 0) {
        leftCell = updatedGrid[row][col - 1];
        if (leftCell && !leftCell.isVisited && !leftCell.isBlock) {
          leftCell.isVisited = true;
          nextGridCells.push(leftCell);
        }
      }

      if (col < updatedGrid[0].length) {
        rightCell = updatedGrid[row][col + 1];
        if (rightCell && !rightCell.isVisited && !rightCell.isBlock) {
          rightCell.isVisited = true;
          nextGridCells.push(rightCell);
        }
      }
    }
    return nextGridCells;
  }

  const handleDragEnd = (e:any, index:any) => {
    const { dropEffect } = e.dataTransfer;
    if (dropEffect === "move" || dropEffect === "copy") {
      const updatedCellBlocks = cloneDeep(gridBlocks);
      updatedCellBlocks[index].isMoved = true;
      setGridBlocks(updatedCellBlocks)
    }
  };

  const handleClickedStartColumn = (col:any) => {
    const updatedWaterGrid = cloneDeep(waterFlowGrid);
    setColumnSelected(true);

    setTimeout(() => {
      const currentCellsProcessed:any = [];
      const selectedStartCell :any= updatedWaterGrid[0][col];
      selectedStartCell.isVisited = true;
      setWaterFlowGrid(updatedWaterGrid)
      currentCellsProcessed.push(selectedStartCell);

      const interval = setInterval(() => {
        const currentCell = currentCellsProcessed.shift();
        currentCellsProcessed.push(
          ...getNextCell(currentCell, updatedWaterGrid)
        );
        setWaterFlowGrid(updatedWaterGrid)
        if (currentCellsProcessed.length === 0) {
          clearInterval(interval);
          setWaterFlowSimulationCompleted(true)
        }
      }, 100);
    }, 100);
  };


  // Info: To reset All data
  const resetAllData = () => {
    setColumnSelected(false);
    setWaterFlowSimulationStarted(false);
    setWaterFlowSimulationCompleted(false);
    setGridBlocks(getBlocks(gridBlockCount));
    setWaterFlowGrid(getInitialGrid(gridRowCount, gridColumnCount));
  };

  // Info: Displaying header dynamically
  const getDynamicHeader = (blocksMovedCount:any) => {
    return blocksMovedCount === gridBlockCount ? (
      <p>
        Select the waterflow start point by clicking on any of the blue boxes on first row
      </p>
    ) : (
      <p>Drag the obstructions and drop it any grid cell</p>
    );
  };


    const blocksMovedCount = gridBlocks.filter((block) => block.isMoved).length;

    return (
      <>
      {/* Info: Getting dynamic header */}
        {getDynamicHeader(blocksMovedCount)}

        <div className="grid-container">
          <div className="grid">
            {waterFlowGrid.map((row, rowIndex) => {
              return (
                <div
                  key={rowIndex}
                  className={`
                  grid-row
                  ${rowIndex === 0 && waterFlowSimulationStarted ? "show" : ""}
                `}
                >
                  {row.map((cell, cellIndex) => {
                    const { row, col, isBlock, isVisited } = cell;
                    return (
                      <GridCell
                        col={col}
                        row={row}
                        key={cellIndex}
                        isBlock={isBlock}
                        isVisited={isVisited}
                        columnSelected={columnSelected}
                        handleClickedStartColumn={(col:any) =>
                          handleClickedStartColumn(col)
                        }
                        handleBlockCell={(row:any, col:any) =>
                          handleBlockCell(row, col)
                        }
                      ></GridCell>
                    );
                  })}
                </div>
              );
            })}
          </div>

    {/* Info: Blocks are displayed */}
          <div className="blocks">
            {gridBlocks.map((block, idx) => {
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
          {/* Info: on click of back button, grid property grid component will be displayed */}
          <button
            className="btn margin-right"
            onClick={()=>setShowWaterSimulator(false)}
          >
            Back
          </button>

          {/* Info: Based on simulation status, text is displayed dynamically */}
          {!waterFlowSimulationStarted && (
            <button
              className="btn"
              disabled={blocksMovedCount !== gridBlockCount}
              onClick={()=>setWaterFlowSimulationStarted(true)}
            >
              Start Simulation
            </button>
          )}
          {waterFlowSimulationCompleted && (
            <button className="btn" onClick={()=>resetAllData()}>
              Reset
            </button>
          )}
        </div>
      </>
    );
}


