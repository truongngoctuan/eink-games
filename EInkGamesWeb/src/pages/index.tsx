import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import SudokuBoard from "@/components/SudokuBoard";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function GameSeletorPage() {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="font-extrabold font-serif text-xl">Built for Kindle</h1>

      <Link className="" href="/sudoku">
        <div className="my-2 p-2 flex flex-col items-center">
          <Image
            className="mr-2"
            width={128}
            height={128}
            src="/game-icons/sudoku.svg"
            alt="Sudoku icon"
          />
          <b className="font-xl font-semibold">Sudoku Game </b>
        </div>
      </Link>
      {/* <SudokuBoard /> */}
    </div>
  );
}
