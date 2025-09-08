// components/HoverButton.js
"use client";
import { useRef } from "react";
import { gsap } from "gsap";

export default function HoverButton({
  children,
  style,
  isDisabled = false,
  bgColor = "bg-gray-200", // Default background color
  borderColor = "border-gray-400", // Default border color for the outline
  size = 150, // Default size
}) {
  const outlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(outlineRef.current, {
      scale: 1.25,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(outlineRef.current, {
      scale: 1,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const cursorClass = isDisabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div
      className="relative"
      style={{
        ...style, // Spread the incoming style props
        width: size, // Use the new size prop
        height: size, // Use the new size prop
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`absolute border-none ${
          isDisabled ? "bg-gray-100" : bgColor
        } border-black flex items-center justify-center z-10 ${cursorClass}`}
        style={{
          width: "100%",
          height: "100%",
          transform: "rotate(45deg)",
        }}
        disabled={isDisabled}
      >
        {children}
      </button>
      <div
        ref={outlineRef}
        className={`absolute w-full h-full border-2 border-dashed ${borderColor} opacity-0 pointer-events-none`}
        style={{
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}