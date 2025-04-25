import React from "react";
import Cell from "./Cell";
import { CELL_BORDER, CELL_DIMENSION, type CellState } from "./constants";

type CellGroupProps = {
  cells: CellState[];
};
function CellGroup(props: CellGroupProps) {
  const { cells } = props;
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
          <Cell key={cell.Idx} state={cell} />
        ))}
      </div>
    </div>
  );
}

export default CellGroup;
