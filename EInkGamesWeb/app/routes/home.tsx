import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import SudokuBoard from "~/components/SudokuBoard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="p-6 pb-12 font-extrabold font-serif text-4xl">
        Sudoku Game for Kindle
      </h1>
      <div className="flex flex-col items-center">
        <SudokuBoard />
      </div>

      {/* <Welcome /> */}
    </div>
  );
}
