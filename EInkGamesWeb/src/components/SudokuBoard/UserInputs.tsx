import React from "react";
import { Button } from "../ui/button";
import { KEY_VALUES } from "./constants";

type UserInputsProps = {
  restrictions: number[];
  onUserInput: (value: number) => void;
};

function UserInputs(props: UserInputsProps) {
  const { restrictions, onUserInput } = props;
  return (
    <>
      {/* <div className="mb-2 flex flex-row justify-between">
        <div>
          <Button variant="secondary" className="">
            Normal
          </Button>
          <Button variant="secondary">Candidate</Button>
        </div>
        <Button variant="secondary">Undo</Button>
      </div> */}
      <div className="flex flex-row flex-wrap justify-between">
        {KEY_VALUES.map((v) => (
          <Button
            variant="secondary"
            size="lg"
            className="sudoku__input_button mb-2"
            disabled={restrictions.includes(v)}
            key={v}
            onClick={() => onUserInput(v)}
          >
            {v}
          </Button>
        ))}
        <Button variant="secondary" size="lg" className="sudoku__input_button">
          X
        </Button>
      </div>
    </>
  );
}

export default UserInputs;
