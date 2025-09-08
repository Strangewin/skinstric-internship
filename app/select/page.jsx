"use client";
import { useRef, useEffect } from "react";
import { IoTriangleSharp } from "react-icons/io5";
import gsap from "gsap";
import Link from "next/link";

export default function SelectPage() {
  const squareSize = 150;
  
 
  const demographicsButtonRef = useRef(null);
  const skinTypeButtonRef = useRef(null);
  const cosmeticButtonRef = useRef(null);
  const weatherButtonRef = useRef(null);
  const sharedOutlineRef = useRef(null); 

  
  const createHoverEffect = (buttonRef, maxScale = 1.9) => {
    if (!buttonRef.current || !sharedOutlineRef.current) return null;

    const button = buttonRef.current;
    const outline = sharedOutlineRef.current;

    const onEnter = () => {
      
      gsap.timeline()
        .to(outline, {
          scale: 0.1,
          opacity: 1,
          duration: 0.15,
          ease: "power2.in",
        })
        .to(outline, {
          scale: maxScale,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
    };

    const onLeave = () => {
      gsap.to(outline, {
        scale: 0.1, 
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    
    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

   
    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  };

  useEffect(() => {
    
    if (sharedOutlineRef.current) {
      gsap.set(sharedOutlineRef.current, { scale: 0.1, opacity: 0 });
    }

   
    const cleanupDemographics = createHoverEffect(demographicsButtonRef, 1.4); 
    const cleanupSkinType = createHoverEffect(skinTypeButtonRef, 1.5); 
    const cleanupCosmetic = createHoverEffect(cosmeticButtonRef, 1.5);
    const cleanupWeather = createHoverEffect(weatherButtonRef, 1.6); 

    // Cleanup function
    return () => {
      cleanupDemographics && cleanupDemographics();
      cleanupSkinType && cleanupSkinType();
      cleanupCosmetic && cleanupCosmetic();
      cleanupWeather && cleanupWeather();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white">
      
      <div className="absolute top-2 left-16 max-w-xs text-left text-gray-800 text-sm leading-snug">
        <span className="font-bold">A.I. ANALYSIS</span><br />
        A.I. has estimated the following.<br />
        Fix estimated information if needed.<br />
     
      </div>
      <div className="relative w-[312px] h-[312px]">
        
       
        <div
          ref={sharedOutlineRef} 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{
            border: "1px dotted rgba(128, 128, 128, 0.5)",
            transform: "rotate(45deg)",
          }}
        />

        {/* Top Button - Demographics */}
        <Link href="/summary">
          <button
            ref={demographicsButtonRef}
            className="absolute border-none bg-gray-200 hover:bg-gray-300 cursor-pointer border-black flex items-center justify-center group"
            style={{
              width: squareSize,
              height: squareSize,
              top: -32,
              left: "50%",
              transform: `translateX(-50%) rotate(45deg)`,
              zIndex: 20,
            }}
          >
            <span className="rotate-315 relative z-20 font-bold">DEMOGRAPHICS</span>
          </button>
        </Link>

        {/* Left Button - Skin Type Details */}
        <button
          ref={skinTypeButtonRef}
          className="absolute border-none bg-gray-100 hover:bg-gray-200 cursor-not-allowed border-black flex items-center justify-center group"
          style={{
            width: squareSize,
            height: squareSize,
            top: "50%",
            left: -32,
            transform: `translateY(-50%) rotate(45deg)`,
            zIndex: 20,
          }}
        >
          <span className="rotate-315 relative z-20 font-bold">SKIN TYPE DETAILS</span>
        </button>

        {/* Right Button - Cosmetic Concerns */}
        <button
          ref={cosmeticButtonRef}
          className="absolute border-none bg-gray-100 hover:bg-gray-200 cursor-not-allowed border-black flex items-center justify-center group"
          style={{
            width: squareSize,
            height: squareSize,
            top: "50%",
            right: -32,
            transform: `translateY(-50%) rotate(45deg)`,
            zIndex: 20,
          }}
        >
          <span className="rotate-315 relative z-20 font-bold">COSMETIC CONCERNS</span>
        </button>

        {/* Bottom Button - Weather */}
        <button
          ref={weatherButtonRef}
          className="absolute border-none bg-gray-100 hover:bg-gray-200 cursor-not-allowed border-black flex items-center justify-center group"
          style={{
            width: squareSize,
            height: squareSize,
            bottom: -32,
            left: "50%",
            transform: `translateX(-50%) rotate(45deg)`,
            zIndex: 20,
          }}
        >
          <span className="rotate-315 relative z-20 font-bold">WEATHER</span>
        </button>
      </div>
  
      <div className="absolute bottom-44 w-full flex justify-between px-8">
       
        <Link
          href="/"
          className="flex items-center space-x-8 group hover:scale-110 transition-transform duration-500"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-gray-800">
            <IoTriangleSharp className="text-black -rotate-[16deg]" size={14} />
          </span>
          <span className="font-bold text-sm">BACK</span>
        </Link>

      
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