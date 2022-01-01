import React, { Component } from "react";
import Cell from "./Cell";
import { cloneDeep } from "lodash";
import "./index.css";

const getInitialGrid = (rowCount, columnCount) => {
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

const getBlocks = (blockCount) => {
  const blocks = [];
  for (let index = 0; index < blockCount; index++) {
    blocks.push({ isMoved: false });
  }
  return blocks;
};

class WaterSimulator extends Component {
  constructor(props) {
    super(props);
    const { rowCount, columnCount, blockCount } = this.props;
    this.state = {
      columnChosen: false,
      simulationStarted: false,
      simulationCompleted: false,
      blocks: getBlocks(blockCount),
      grid: getInitialGrid(rowCount, columnCount)
    };
  }

  handleSelectStartColumn = (col) => {
    const { grid } = this.state;
    const updatedGrid = cloneDeep(grid);
    this.setState({ columnChosen: true });

    setTimeout(() => {
      const currentCellsProcessed = [];
      const selectedStartCell = updatedGrid[0][col];
      selectedStartCell.isVisited = true;
      this.setState({ grid: updatedGrid });
      currentCellsProcessed.push(selectedStartCell);

      const interval = setInterval(() => {
        const currentCell = currentCellsProcessed.shift();
        currentCellsProcessed.push(
          ...this.getNextCell(currentCell, updatedGrid)
        );
        this.setState({ grid: updatedGrid });
        if (currentCellsProcessed.length === 0) {
          clearInterval(interval);
          this.setState({ simulationCompleted: true });
        }
      }, 100);
    }, 100);
  };

  handleBlockCell = (row, col) => {
    const { grid } = this.state;
    const updatedGrid = cloneDeep(grid);
    updatedGrid[row][col].isBlock = true;
    this.setState({ grid: updatedGrid });
  };

  getNextCell({ row, col }, updatedGrid) {
    let nextCells = [];
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

  handleDragEnd = (e, index) => {
    const { dropEffect } = e.dataTransfer;
    if (dropEffect === "move" || dropEffect === "copy") {
      const { blocks } = this.state;
      const updatedBlocks = cloneDeep(blocks);
      updatedBlocks[index].isMoved = true;
      this.setState({
        blocks: updatedBlocks
      });
    }
  };

  startSimulation = () => {
    this.setState({ simulationStarted: true });
  };

  handleReset = () => {
    const { rowCount, columnCount, blockCount } = this.props;
    this.setState({
      columnChosen: false,
      simulationStarted: false,
      simulationCompleted: false,
      blocks: getBlocks(blockCount),
      grid: getInitialGrid(rowCount, columnCount)
    });
  };

  getHeaderText = (blocksMovedCount) => {
    const { blockCount } = this.props;
    return blocksMovedCount === blockCount ? (
      <p>
        Select the waterflow start point by clicking on any of the blue boxes
      </p>
    ) : (
      <p>Drag the obstructions and place it inside grid</p>
    );
  };

  render() {
    const { handleCurrentScreenChange, blockCount } = this.props;
    const {
      grid,
      blocks,
      columnChosen,
      simulationStarted,
      simulationCompleted
    } = this.state;
    const blocksMovedCount = blocks.filter((block) => block.isMoved).length;

    return (
      <>
        {this.getHeaderText(blocksMovedCount)}
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
                        handleSelectStartColumn={(col) =>
                          this.handleSelectStartColumn(col)
                        }
                        handleBlockCell={(row, col) =>
                          this.handleBlockCell(row, col)
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
                    onDragEnd={(e) => this.handleDragEnd(e, idx)}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn margin-right"
            onClick={handleCurrentScreenChange}
          >
            Back
          </button>
          {!simulationStarted && (
            <button
              className="btn"
              disabled={blocksMovedCount !== blockCount}
              onClick={this.startSimulation}
            >
              Start Simulation
            </button>
          )}
          {simulationCompleted && (
            <button className="btn" onClick={this.handleReset}>
              Reset
            </button>
          )}
        </div>
      </>
    );
  }
}

export default WaterSimulator;
