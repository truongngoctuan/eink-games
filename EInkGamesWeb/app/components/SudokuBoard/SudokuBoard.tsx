import React, { useState } from "react";
import Cell from "./Cell";
import {
  CELL_BORDER,
  CELL_DIMENSION,
  GROUP_BORDER,
  type CellState,
} from "./constants";
import CellGroup from "./CellGroup";

type SudokuGameState = {
  puzzle: number[];
  selectingIdx?: number;
  solution: number[];
};

type Coordinate = {
  iRow: number;
  iCol: number;
  iGroupRow: number;
  iGroupCol: number;
  groupIdx: number;
};

function getCoordinate(idx: number, size: number) {
  const iRow = Math.floor(idx / (size * 3));
  const iCol = idx % (size * 3);

  const iGroupRow = Math.floor(iRow / size);
  const iGroupCol = Math.floor(iCol / size);
  const groupIdx = iGroupRow * size + iGroupCol;

  var coor: Coordinate = {
    iRow,
    iCol,
    iGroupCol,
    iGroupRow,
    groupIdx,
  };

  return coor;
}

function getGroups(gameState: SudokuGameState) {
  const size = 3;

  const groups: Array<CellState[]> = [];
  for (let i = 0; i < size * 3; i++) {
    groups.push([]);
  }

  for (let i = 0; i < gameState.puzzle.length; i++) {
    // result.push(gameState.puzzle.slice(i, i + size));
    const coordinate = getCoordinate(i, size);
    // console.log("groupIdx", groupIdx, iGroupRow, iGroupCol, iRow, iCol);

    groups[coordinate.groupIdx].push({
      Idx: i,
      Num: gameState.puzzle[i],
    });
  }
  return groups;
}

function SudokuBoard() {
  const boardDimension = CELL_DIMENSION * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;
  const [gameState, setGameState] = useState<SudokuGameState>({
    puzzle: [
      6, 3, 5, 0, 1, 0, 4, 0, 2, 9, 0, 1, 0, 3, 0, 0, 7, 5, 0, 0, 0, 4, 9, 5, 0,
      0, 6, 1, 0, 0, 6, 4, 0, 0, 0, 0, 0, 6, 7, 8, 0, 0, 0, 1, 3, 3, 0, 9, 0, 0,
      0, 6, 2, 0, 0, 9, 0, 0, 0, 4, 2, 5, 0, 0, 0, 4, 0, 5, 7, 9, 0, 0, 0, 1, 6,
      0, 0, 2, 0, 0, 0,
    ],
    solution: [],
  });

  const groups = getGroups(gameState);
  return (
    <div
      className="bg-black flex flex-wrap gap-1 p-1"
      style={{
        width: boardDimension + borderDimension,
        height: boardDimension + borderDimension,
      }}
    >
      {groups.map((group, groupIdx) => (
        <CellGroup key={groupIdx} cells={group} />
      ))}
    </div>
  );
}

export default SudokuBoard;
