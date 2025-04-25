import React from "react";
import { CELL_DIMENSION, type CellState } from "./constants";

type CellProps = {
  state: CellState;
};

function Cell(props: CellProps) {
  const { state } = props;
  const displayText = state.Num === 0 ? "" : state.Num;
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
