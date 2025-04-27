import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import SudokuBoard from "@/components/SudokuBoard";

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

export default function Home() {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="p-6 pb-12 font-extrabold font-serif text-4xl">
        Sudoku Game for Kindle
      </h1>
      <div className="flex flex-col items-center">
        <SudokuBoard />
      </div>
    </div>
  );
}
