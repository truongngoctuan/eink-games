import React from "react";
import Cell from "./Cell";
import { CELL_BORDER, CELL_DIMENSION, GROUP_BORDER } from "./constants";
import CellGroup from "./CellGroup";

function getGroups(puzzle: number[]) {
  const size = 9;
  const result = [];
  for (let i = 0; i < puzzle.length; i += size) {
    result.push(puzzle.slice(i, i + size));
  }
  return result;
}

function SudokuBoard() {
  const boardDimension = CELL_DIMENSION * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  const puzzle = [
    6, 3, 5, 0, 1, 0, 4, 0, 2, 9, 0, 1, 0, 3, 0, 0, 7, 5, 0, 0, 0, 4, 9, 5, 0,
    0, 6, 1, 0, 0, 6, 4, 0, 0, 0, 0, 0, 6, 7, 8, 0, 0, 0, 1, 3, 3, 0, 9, 0, 0,
    0, 6, 2, 0, 0, 9, 0, 0, 0, 4, 2, 5, 0, 0, 0, 4, 0, 5, 7, 9, 0, 0, 0, 1, 6,
    0, 0, 2, 0, 0, 0,
  ];

  const groups = getGroups(puzzle);
  return (
    <div
      className="bg-black flex flex-wrap gap-1 p-1"
      style={{
        width: boardDimension + borderDimension,
        height: boardDimension + borderDimension,
      }}
    >
      {groups.map((group) => (
        <CellGroup cells={group} />
      ))}
    </div>
  );
}

export default SudokuBoard;
