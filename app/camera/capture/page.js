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

        // Optional: stop stream when unmount
        return () => {
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access denied or unavailable");
      }
    };
    startCamera();
  }, []);

  // Handle capture and upload
  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setTakingPhoto(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/png").split(",")[1];

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
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black overflow-hidden">
      {loading ? (
        <div className="text-lg font-bold text-white">Accessing Camera...</div>
      ) : (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full rounded-lg border border-gray-300 object-cover"
          />

          {/* Overlay tips */}
          <div className="absolute top-[10%] w-full text-center text-white space-y-2">
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE:</p>
          </div>
          <div className="absolute top-[18%] w-full flex justify-center gap-6 text-xs text-white">
            <div className="flex items-center gap-1">
              <PiDiamondThin />
              <span>NEUTRAL EXPRESSION</span>
            </div>
            <div className="flex items-center gap-1">
              <PiDiamondThin />
              <span>FRONTAL POSE</span>
            </div>
            <div className="flex items-center gap-1">
              <PiDiamondThin />
              <span>ADEQUATE LIGHTING</span>
            </div>
          </div>

          {/* Hidden canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Capture button */}
          <button
            onClick={handleCapture}
            disabled={takingPhoto}
            className="absolute right-10 px-6 py-3 flex items-center gap-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            {takingPhoto ? "Analyzing..." : (
              <>
                TAKE PICTURE <BsCamera size={24} />
              </>
            )}
          </button>

             <Link
        href="/"
        className="group absolute left-8 bottom-8 flex items-center z-20"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-white mr-2 transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-white rotate-[-20deg]" size={14} />
        </span>
        <div className="text-sm text-white font-bold ml-6">BACK</div>
      </Link>
        </div>
      )}
    </div>
  );
}