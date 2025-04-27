import React from "react";
import Cell, { type CellState } from "./Cell";
import { CELL_BORDER, CELL_DIMENSION } from "./constants";

type CellGroupProps = {
  cells: CellState[];
  onSelect: (idx: number) => void;
};
function CellGroup(props: CellGroupProps) {
  const { cells, onSelect } = props;
  return (
    <div
      className=""
      style={{
        width: CELL_DIMENSION * 3 + 2 * CELL_BORDER,
        height: CELL_DIMENSION * 3 + 2 * CELL_BORDER,
      }}
    >
      <div className="flex flex-wrap" style={{ gap: 1 }}>
        {cells.map((cell) => (
          <Cell key={cell.Idx} state={cell} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default CellGroup;
