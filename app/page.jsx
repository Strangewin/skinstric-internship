"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";

export default function Home() {
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const leftRectRef = useRef(null);
  const rightRectRef = useRef(null);
  const centerTextDesktopRef = useRef(null);
  const centerTextMobileRef = useRef(null);

  const glideDistance = 400;

  useEffect(() => {
    if (centerTextDesktopRef.current) {
      gsap.fromTo(
        centerTextDesktopRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power3.in" }
      );
    }

    if (centerTextMobileRef.current) {
      gsap.fromTo(
        centerTextMobileRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power3.in" }
      );
    }
  }, []);
const handleLeftHover = () => {
  gsap.to(centerTextDesktopRef.current, {
    x: glideDistance,
    duration: 0.8,
    ease: "power2.inOut",
    onStart: () => {
      centerTextDesktopRef.current.style.textAlign = "right";
    },
  });
    gsap.to(rightRectRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(rightArrowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(leftArrowRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleLeftHoverOut = () => {
    gsap.to(centerTextDesktopRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        centerTextDesktopRef.current.style.textAlign = "center";
      }
    });
    gsap.to(rightRectRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(rightArrowRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(leftArrowRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    
  };

  const handleRightHover = () => {
    gsap.to(centerTextDesktopRef.current, {
      x: -glideDistance,
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        centerTextDesktopRef.current.style.textAlign = "left";
      }
    });
    gsap.to(leftRectRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(leftArrowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(rightArrowRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleRightHoverOut = () => {
    gsap.to(centerTextDesktopRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        centerTextDesktopRef.current.style.textAlign = "center";
      }
    });
    gsap.to(leftRectRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(leftArrowRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(rightArrowRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* DESKTOP LAYOUT (>=1024px) */}
     <div className="hidden lg:flex flex-col items-center justify-center min-h-screen relative">
  {/* Left Rect */}
  <div
    ref={leftRectRef}
    className="absolute border-2 border-dashed pointer-events-none"
    style={{
      width: 502,
      height: 502,
      top: "50%",
      left: "-250px",
      transform: "translateY(-50%) rotate(45deg)",
      borderColor: "#bbb",
      zIndex: 5,
    }}
  />
  {/* Right Rect */}
  <div
    ref={rightRectRef}
    className="absolute border-2 border-dashed pointer-events-none"
    style={{
      width: 502,
      height: 502,
      top: "50%",
      right: "-250px",
      transform: "translateY(-50%) rotate(-45deg)",
      borderColor: "#bbb",
      zIndex: 5,
    }}
  />

  {/* Center text */}
  <h1
    ref={centerTextDesktopRef}
    className="z-10 text-center px-4"
    style={{
      fontFamily: "Roobert TRIAL, sans-serif",
      fontWeight: 300,
      fontSize: "clamp(48px, 8vw, 100px)", 
      lineHeight: "1.1",
      letterSpacing: "-0.07em",
    }}
  >
    Sophisticated
    <br />
    skincare
  </h1>

 {/* LEFT ARROW */}
<div
  ref={leftArrowRef}
  onMouseEnter={handleLeftHover}
  onMouseLeave={handleLeftHoverOut}
  className="absolute z-30 flex items-center"
  style={{
    width: "max-content",
    left: "5%",       
    top: "50vh",      
    transform: "translateY(-50%)",
  }}
>
  <Link href="/" className="flex items-center group">
    <span className="inline-flex items-center justify-center w-7 h-7 border border-black rotate-45 mr-2">
      <IoTriangleSharp className="-rotate-20" size={12} />
    </span>
    <span className="text-xs text-black group-hover: whitespace-nowrap">
      DISCOVER A.I.
    </span>
  </Link>
</div>

{/* RIGHT ARROW */}
<div
  ref={rightArrowRef}
  onMouseEnter={handleRightHover}
  onMouseLeave={handleRightHoverOut}
  className="absolute z-30 flex items-center"
  style={{
    width: "max-content",
    right: "5%",     
    top: "50vh",      
    transform: "translateY(-50%)",
  }}
>
  <Link href="/testing" className="flex items-center group">
    <span className="text-xs text-black group-hover:whitespace-nowrap mr-2">
      TAKE TEST
    </span>
    <span className="inline-flex items-center justify-center w-7 h-7 border border-black rotate-45">
      <IoTriangleSharp className="-rotate-320" size={12} />
    </span>
  </Link>
</div>

  {/* Bottom tagline */}
  <div className="absolute left-4 sm:left-8 lg:left-12 bottom-[5vh] max-w-[90vw] sm:max-w-sm lg:max-w-md px-2">
    <p className="
      text-black opacity-80 font-Roobert TRIAL leading-snug
      text-[10px] sm:text-xs lg:text-sm
      font-medium sm:font-semibold lg:font-bold
    ">
      <span className="hidden lg:inline">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO<br />
        WHAT YOUR SKIN NEEDS.
      </span>
      <span className="hidden sm:inline lg:hidden">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </span>
      <span className="inline sm:hidden">
        SKINSTRIC: A.I. for your personalized skincare routine.
      </span>
    </p>
  </div>
</div>

      {/* MOBILE LAYOUT (<1024px) */}
      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen relative">
        <div className="absolute w-100 h-100 rotate-132 border-2 border-gray-200 -translate-y-10"></div>
        <div className="absolute w-80 h-80 rotate-132 border-2 border-gray-200  -translate-y-10"></div>
        <div className="z-10 text-center px-6">
          <h1
            ref={centerTextMobileRef}
            className="text-3xl font-bold -translate-y-10"
            style={{
              fontFamily: "Roobert TRIAL, sans-serif",
              fontWeight: 300,
              fontSize: "60px",
              lineHeight: "64px",
              letterSpacing: "-0.07em",
            }}
          >
            Sophisticated <br />
            skincare{" "}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed font-bold -translate-y-10 ">
            Skinstric developed an A.I. that creates a <br />
            highly-personalized routine tailored to <br />
            what your skin needs.
          </p>

          <Link
            href="/testing"
            className="group flex items-center justify-center mt-4 space-x-2 transition-transform duration-300 hover:scale-110"
          >
            <span className="text-sm font-bold -translate-y-10">
              Enter Experience
            </span>
            <span className="inline-flex rotate-45 items-center justify-center w-5 h-5 border border-black -translate-y-10">
              <IoTriangleSharp className="-rotate-320" size={10} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
