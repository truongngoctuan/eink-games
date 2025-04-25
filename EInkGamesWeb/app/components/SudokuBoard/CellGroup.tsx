import React from "react";
import Cell from "./Cell";
import { CELL_BORDER, CELL_DIMENSION } from "./constants";

type CellGroupProps = {
  cells: number[];
};
function CellGroup(props: CellGroupProps) {
  const { cells } = props;
  return (
    <div
      className="bg-black"
      style={{
        width: CELL_DIMENSION * 3 + 2 * CELL_BORDER,
        height: CELL_DIMENSION * 3 + 2 * CELL_BORDER,
      }}
    >
      <div className="flex flex-wrap" style={{ gap: 1 }}>
        {cells.map((cell) => (
          <Cell num={cell} />
        ))}
      </div>
    </div>
  );
}

export default CellGroup;
