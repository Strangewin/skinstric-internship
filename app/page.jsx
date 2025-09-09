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
      <div className="hidden lg:block">
        <div
          ref={leftRectRef}
          className="absolute border-2 border-dashed opacity-100 pointer-events-none"
          style={{
            width: 502,
            height: 502,
            top: 319,
            left: -301,
            borderColor: "#bbb",
            transform: "rotate(45deg)",
            zIndex: 5,
          }}
        />
        <div
          ref={rightRectRef}
          className="absolute border-2 border-dashed opacity-100 pointer-events-none"
          style={{
            width: 502,
            height: 502,
            top: 319,
            right: -301,
            borderColor: "#bbb",
            transform: "rotate(-45deg)",
            zIndex: 5,
          }}
        />

        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1
            ref={centerTextDesktopRef}
            className="z-10 text-center"
            style={{
              fontFamily: "Roobert TRIAL, sans-serif",
              fontWeight: 300,
              fontSize: "100px",
              lineHeight: "120px",
              letterSpacing: "-0.07em",
            }}
          >
            Sophisticated
            <br />
            skincare
          </h1>
        </div>

        <div
          ref={leftArrowRef}
          onMouseEnter={handleLeftHover}
          onMouseLeave={handleLeftHoverOut}
          className="absolute z-30 flex items-center"
          style={{
            width: "max-content",
            left: 100,
            top: 560,
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

        <div
          ref={rightArrowRef}
          onMouseEnter={handleRightHover}
          onMouseLeave={handleRightHoverOut}
          className="absolute z-30 flex items-center"
          style={{
            width: "max-content",
            right: 100,
            top: 560,
            transform: "translateY(-50%)",
          }}
        >
          <Link href="/testing" className="flex items-center group">
            <span className="text-xs text-black group-hover: whitespace-nowrap mr-2">
              TAKE TEST
            </span>
            <span className="inline-flex items-center justify-center w-7 h-7 border border-black rotate-45">
              <IoTriangleSharp className="-rotate-320" size={12} />
            </span>
          </Link>
        </div>

        <div>
          <div className="hidden lg:block absolute left-30 bottom-40 m-8 max-w-xs text-xs font-bold text-black opacity-80 leading-snug font-Roobert TRIAL">
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
            HIGHLY-PERSONALIZED ROUTINE TAILORED TO
            <br />
            WHAT YOUR SKIN NEEDS.
          </div>

          <div className="hidden sm:block lg:hidden absolute left-8 bottom-8 m-4 max-w-xs text-xs font-semibold text-black opacity-80 leading-snug font-Roobert TRIAL">
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED
            ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
          </div>

          <div className="block sm:hidden absolute left-4 bottom-4 m-2 max-w-[90vw] text-[10px] font-medium text-black opacity-80 leading-tight font-Roobert TRIAL">
            SKINSTRIC: A.I. for your personalized skincare routine.
          </div>
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
