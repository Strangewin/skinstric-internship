"use client";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";

export default function SummaryPage() {
  const squareSize = 150; 
  const gap = 3; 

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white">
   
      <div className="relative w-[370px] h-[370px]">
        {/* Top */}
        <button
          className="absolute border-none bg-gray-200 cursor-pointer border-black flex items-center justify-center"
          style={{
            width: squareSize,
            height: squareSize,
            top: 0,
            left: "50%",
            transform: `translateX(-50%) translateY(0) rotate(45deg)`,
          }}
        >
          <span className="rotate-315">DEMOGRAPHICS</span>
        </button>

        {/* Left */}
        <button
          className="absolute border-none bg-gray-100 cursor-not-allowed border-black flex items-center justify-center"
          style={{
            width: squareSize,
            height: squareSize,
            top: "50%",
            left: 0,
            transform: `translateY(-50%) rotate(45deg)`,
          }}
        >
          <span className="rotate-315">SKIN TYPE DETAILS</span>
        </button>

        {/* Right */}
        <button
          className="absolute border-none bg-gray-100 cursor-not-allowed border-black flex items-center justify-center"
          style={{
            width: squareSize,
            height: squareSize,
            top: "50%",
            right: 0,
            transform: `translateY(-50%) rotate(45deg)`,
          }}
        >
          <span className="rotate-315">COSMETIC CONSCERNS</span>
        </button>

        {/* Bottom */}
        <button
          className="absolute border-none bg-gray-100 cursor-not-allowed border-black flex items-center justify-center"
          style={{
            width: squareSize,
            height: squareSize,
            bottom: 0,
            left: "50%",
            transform: `translateX(-50%) rotate(45deg)`,
          }}
        >
          <span className="rotate-315">WEATHER</span>
        </button>
      </div>

  
      <div className="absolute bottom-44 w-full flex justify-between px-8">
        {/* Back */}
        <Link
          href="/"
          className="flex items-center space-x-8 group hover:scale-110 transition-transform duration-500"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-gray-800">
            <IoTriangleSharp className="text-black -rotate-[16deg]" size={14} />
          </span>
          <span className="font-bold text-sm">BACK</span>
        </Link>

        {/* Get Summary */}
        <Link
          href="/summary"
          className="flex items-center space-x-8 group  transition-transform duration-500 hover:scale-110 transition"
        >
          <span className="font-bold text-sm">GET SUMMARY</span>
          <span className="inline-flex items-center justify-center w-10 h-10 -rotate-45 border border-gray-800">
            <IoTriangleSharp className="text-black rotate-[10deg]" size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}

