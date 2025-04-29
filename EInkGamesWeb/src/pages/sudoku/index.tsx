import { DIFFICULTY_LEVELS } from "@/components/SudokuBoard/constants";
import Image from "next/image";
import Link from "next/link";

import React from "react";

type DifficultyBtnProps = {
  difficulty: string;
};
export function DifficultyBtn({ difficulty }: DifficultyBtnProps) {
  return (
    <Link
      className="mb-2 bg-black text-white font-semibold rounded-full p-4 px-8 w-32 text-center"
      href={{
        pathname: "/sudoku/[difficulty]",
        query: { difficulty },
      }}
    >
      {difficulty.toUpperCase()}
    </Link>
  );
}

export default function SudokuPage() {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="font-extrabold font-serif text-xl">Built for Kindle</h1>

      <div className="flex flex-col items-center">
        <Image
          className="mr-2"
          width={128}
          height={128}
          src="/game-icons/sudoku.svg"
          alt="Sudoku icon"
        />
        <h2 className="font-extrabold font-serif text-2xl mb-8">Sudoku Game</h2>
        <p className="mb-4 font-semibold">Select game level:</p>
        {DIFFICULTY_LEVELS.map((d) => (
          <DifficultyBtn key={d} difficulty={d} />
        ))}
      </div>
    </div>
  );
}
