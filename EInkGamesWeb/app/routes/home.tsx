import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import SudokuBoard from "~/components/SudokuBoard";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [a, setA] = useState("aasdfasdf-");

  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="p-6 pb-12 font-extrabold font-serif text-4xl">
        Sudoku Game for Kindle
      </h1>
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "1px solid red",
          color: "black",
        }}
        onClick={(e) => {
          setA("clicked");
        }}
      >
        asdf {a}
      </div>
      <div className="flex flex-col items-center">
        <SudokuBoard />
      </div>

      {/* <Welcome /> */}
    </div>
  );
}
