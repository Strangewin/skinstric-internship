"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RotatingSquares from "../components/RotatingSquares"; // adjust the path if needed
import { PiDiamondThin } from "react-icons/pi";

export default function CameraPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/camera/capture");
    }, 4000); // redirect after 4 seconds
    return () => clearTimeout(timer);
  }, [router]);

return (
  <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
    <RotatingSquares
      imgSrc="/camera-shutter.png"
      imgAlt="Camera Loading"
      onClick={() => {}}
    />

    <div className="absolute mt-24 text-center w-full text-black">
      <p>Setting Up Camera...</p>
    </div>
    <div className="absolute mt-124 text-center w-full text-black">
      <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
    </div>
    <div className="absolute mt-144 w-full text-black flex items-center justify-center text-center">
      <PiDiamondThin className="inline-block mr-2 ml-10" />
      <p className="m-0 text-xs">NEUTRAL EXPRESSION</p>
            <PiDiamondThin className="inline-block mr-2 ml-10" />
      <p className="m-0 text-xs">FRONTAL POSE</p>
       <PiDiamondThin className="inline-block mr-3 ml-10" />
      <p className="m-0 text-xs">ADEQUATE LIGHTING</p>
    </div>
  </div>
);
}