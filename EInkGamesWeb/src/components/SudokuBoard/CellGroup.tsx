import React from "react";
import Cell, { type CellState } from "./Cell";
import { CELL_BORDER, GROUP_BORDER } from "./constants";

type CellGroupState = {
  iGroupRow: number;
  iGroupCol: number;
  groupIdx: number;
};

type CellGroupProps = {
  cellDimension: number;
  cells: CellState[];
  state: CellGroupState;
  onSelect: (idx: number) => void;
};

function CellGroup(props: CellGroupProps) {
  const { cellDimension, cells, state, onSelect } = props;

  let marginRight = GROUP_BORDER;
  if ((state.iGroupCol + 1) % 3 === 0) {
    marginRight = 0;
  }

  let marginBottom = GROUP_BORDER;
  if ((state.iGroupRow + 1) % 3 === 0) {
    marginBottom = 0;
  }

  return (
    <div
      style={{
        width: cellDimension * 3 + 2 * CELL_BORDER,
        height: cellDimension * 3 + 2 * CELL_BORDER,
        marginRight,
        marginBottom,
      }}
    >
      <div className="flex flex-wrap">
        {cells.map((cell) => (
          <Cell
            key={cell.idx}
            cellDimension={cellDimension}
            state={cell}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default CellGroup;
