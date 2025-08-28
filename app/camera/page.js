"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[900px] h-[900px] rounded-lg border border-gray-300"
          />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={handleCapture}
            disabled={takingPhoto}
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {takingPhoto ? "Analyzing..." : "Take Snapshot"}
          </button>
        </>
      )}
    </div>
  );
}
