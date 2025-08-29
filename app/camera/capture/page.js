"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";
import { BsCamera } from "react-icons/bs";
import { PiDiamondThin } from "react-icons/pi";
export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [takingPhoto, setTakingPhoto] = useState(false);

  // Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setLoading(false);
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access denied or unavailable");
      }
    };
    startCamera();
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setTakingPhoto(true);

    // Draw current frame to canvas
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to Base64
    const base64Image = canvas.toDataURL("image/png").split(",")[1];

    // Upload to API
    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        }
      );
      const result = await response.json();
      console.log("AI Response:", result);

      // Save to session and navigate
      sessionStorage.setItem("demographicData", JSON.stringify(result));
      router.push("/result");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Try again.");
    } finally {
      setTakingPhoto(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {loading ? (
        <div className="text-lg font-bold">Accessing Camera...</div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[100%] h-[100%] rounded-lg border border-gray-300"
          />
            <div className="absolute mt-164 text-center w-full text-white">
      <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
    </div>
              <div className="absolute mt-184 w-full text-white flex items-center justify-center text-center">
                <PiDiamondThin className="inline-block mr-2 ml-10" />
                <p className="m-0 text-xs">NEUTRAL EXPRESSION</p>
                      <PiDiamondThin className="inline-block mr-2 ml-10" />
                <p className="m-0 text-xs">FRONTAL POSE</p>
                 <PiDiamondThin className="inline-block mr-3 ml-10" />
                <p className="m-0 text-xs">ADEQUATE LIGHTING</p>
              </div>
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={handleCapture}
            disabled={takingPhoto}
            className="absolute right-8 top-1/2 -translate-y-1/2 px-6 py-3 text-sm text-white "
          >
            {takingPhoto ? "Analyzing..." : (
                <span className="flex items-center gap-2">
                  TAKE PICTURE <BsCamera className="w-12 h-12 cursor-pointer bg-white text-gray-200 transition transform hover:scale-105 border border-gray-200 rounded-full" />
                </span>
            )}
          </button>
        </div>
        
      )}
      <Link
        href="/"
        className="group absolute left-14 bottom-28 flex items-center z-20"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border-1 border-white mr-2  transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-white rotate-340" size={14} />
        </span>

        <div className="text-sm text-white font-bold ml-6 ">BACK</div>
      </Link>
    </div>
    
  );
}