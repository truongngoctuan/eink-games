import React from "react";
import { CELL_DIMENSION } from "./constants";

type CellProps = {
  num: number;
};

function Cell(props: CellProps) {
  const { num } = props;
  const displayText = num === 0 ? "" : num;
  return (
    <div
      className="bg-white flex flex-col justify-center items-center"
      style={{ width: CELL_DIMENSION, height: CELL_DIMENSION }}
    >
      <span className="font-bold font-serif text-4xl">{displayText}</span>
    </div>
  );
}

export default Cell;
