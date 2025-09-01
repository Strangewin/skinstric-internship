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
  const [previewImage, setPreviewImage] = useState(null);
useEffect(() => {
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setLoading(false);
      return () => stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera access denied or unavailable");
    }
  };

  
    void startCamera();
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/png");
    setPreviewImage(base64Image); // set preview state
  };

  const handleRetake = () => {
    setPreviewImage(null);
  };

  const handleUsePhoto = async () => {
    if (!previewImage) return;

    setTakingPhoto(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: previewImage }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      console.log("AI Response:", result);

      sessionStorage.setItem("demographicData", JSON.stringify(result));
      router.push("/select");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image or get predictions. Try again.");
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
         
          {!previewImage ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full rounded-lg border border-gray-300 object-cover"
            />
          ) : (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}

        
          {!previewImage && (
            <>
              <div className="absolute bottom-[10%] w-full text-center text-white space-y-2">
                <p>TO GET BETTER RESULTS MAKE SURE TO HAVE:</p>
              </div>
              <div className="absolute bottom-[8%] w-full flex justify-center gap-6 text-xs text-white">
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
            </>
          )}

          {/* Hidden canvas */}
          <canvas ref={canvasRef} className="hidden" />

        
          {!previewImage ? (
            <button
              onClick={handleCapture}
              className="absolute right-10 px-6 py-3 flex items-center gap-3 cursor-pointer text-gray-200 rounded-full transition"
            >
              <span className="text-white text-sm">TAKE PICTURE</span>
              <BsCamera
                className="border-3  rounded-full bg-white hover:scale-110 transition-transform ease"
                size={48}
              />
            </button>
          ) : (
            <div className="absolute bottom-28 flex flex-col items-center gap-4">
              <p className="text-white text-lg font-semibold">Preview</p>
              <div className="flex gap-6">
                <button
                  onClick={handleRetake}
                  className="px-5 py-3 bg-white text-gray-600 text-sm cursor-pointer"
                >
                  Retake
                </button>
                <button
                  onClick={handleUsePhoto}
                  disabled={takingPhoto}
                  className="px-5 py-3 bg-black text-white text-sm cursor-pointer"
                >
                {takingPhoto ? "PREPARING YOUR ANALYSIS..." : "Use This Photo"}
                </button>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="group absolute left-20 bottom-28 flex items-center z-20"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-white mr-2 transition-transform duration-300 group-hover:scale-110">
              <IoTriangleSharp
                className="text-white rotate-[-20deg]"
                size={14}
              />
            </span>
            <div className="text-sm text-white font-bold ml-6">BACK</div>
          </Link>
        </div>
      )}
    </div>
  );
}
