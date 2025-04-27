import React from "react";
import { CELL_DIMENSION } from "./constants";
import classNames from "classnames";

export type CellState = {
  Idx: number;
  Num: number;
  selected: boolean;
  isUserInput: boolean;
  isHightlighted: boolean;
  isSameNum: boolean;
};

type CellProps = {
  state: CellState;
  onSelect: (idx: number) => void;
};

function Cell(props: CellProps) {
  const { state, onSelect } = props;
  const displayText = state.Num === 0 ? "" : state.Num;
  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center cell",
        {
          "bg-white":
            !state.isUserInput &&
            !state.selected &&
            !state.isHightlighted &&
            !state.isSameNum,
        },
        {
          "bg-white":
            state.isUserInput &&
            !state.selected &&
            !state.isHightlighted &&
            !state.isSameNum,
        },
        {
          "bg-amber-400": state.selected,
        },
        {
          "bg-amber-100": state.isHightlighted,
        },
        {
          "bg-amber-200": state.isSameNum,
        }
      )}
      style={{ width: CELL_DIMENSION, height: CELL_DIMENSION }}
      onClick={(e) => onSelect(state.Idx)}
      onTouchEnd={(e) => onSelect(state.Idx)}
      onTouchStart={(e) => onSelect(state.Idx)}
    >
      <span className="font-bold font-san text-4xl">{displayText}</span>
    </div>
  );
}

export default Cell;
