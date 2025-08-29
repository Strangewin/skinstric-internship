"use client";
import { useRef, useEffect } from "react";

function RotatingSquares({ imgSrc, imgAlt, onClick }) {
  const squares = [useRef(null), useRef(null), useRef(null)];
  const sizes = [300, 350, 400];
  const durations = [50000, 70000, 90000];
  const colors = ["border-gray-400", "border-gray-300", "border-gray-200"];

  useEffect(() => {
    squares.forEach((square, idx) => {
      if (square.current) {
        square.current.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          {
            duration: durations[idx],
            iterations: Infinity,
            easing: "linear",
          }
        );
      }
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[550px] h-[250px] -mt-20">
      {squares.map((ref, idx) => (
        <div
          key={idx}
          ref={ref}
          style={{ width: `${sizes[idx]}px`, height: `${sizes[idx]}px` }}
          className={`absolute border-4 border-dotted ${colors[idx]} rounded-lg`}
        />
      ))}

      <button
        type="button"
        aria-label={imgAlt}
        className="cursor-pointer transition-transform duration-200 hover:scale-105 relative z-10"
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-[140px] h-[140px] mx-auto mb-2"
        />
      </button>
    </div>
  );
}

export default RotatingSquares;
