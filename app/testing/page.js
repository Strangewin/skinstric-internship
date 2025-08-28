"use client";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function TestingPage() {
  const router = useRouter();
  const square1 = useRef(null);
  const square2 = useRef(null);
  const square3 = useRef(null);

  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [showProceed, setShowProceed] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  // Animate squares
  useEffect(() => {
    const animateSquare = (square, duration) => {
      if (square.current) {
        square.current.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          { duration, iterations: Infinity, easing: "linear" }
        );
      }
    };
    animateSquare(square1, 100000);
    animateSquare(square2, 80000);
    animateSquare(square3, 70000);
  }, []);

  // Show proceed button after success
  useEffect(() => {
    if (success) {
      const id = requestAnimationFrame(() => setShowProceed(true));
      return () => cancelAnimationFrame(id);
    } else {
      setShowProceed(false);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name.trim()) return alert("Please enter your name");
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!formData.location.trim()) return alert("Please enter your city");
      setLoading(true);
      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        console.log("Server response:", data);
        if (!response.ok) throw new Error(data.message || "Failed to submit");
        setSuccess(true);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // CAMERA BUTTON: Request permission and redirect
  const handleCameraClick = async () => {
    setCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop immediately; we'll request again on /camera page
      stream.getTracks().forEach((track) => track.stop());
      setTimeout(() => {
        setCameraLoading(false);
        router.push("/camera");
      }, 500); // small delay for UX
    } catch (err) {
      console.error("Camera access failed:", err);
      setCameraLoading(false);
      alert("Camera access denied or unavailable");
    }
  };

  if (cameraLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center font-bold">SETTING UP CAMERA...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative squares */}
      <div ref={square3} className="absolute w-[500px] h-[500px] border-3 border-dotted border-gray-100 mb-60"></div>
      <div ref={square2} className="absolute w-[450px] h-[450px] border-3 border-dotted border-gray-200 mb-60"></div>
      <div ref={square1} className="absolute w-[400px] h-[400px] border-3 border-dotted border-gray-300 mb-60"></div>

      {/* Form / Inputs */}
      <div className="absolute w-[400px] h-[400px] flex flex-col items-center justify-center mb-60">
        {!success ? (
          loading ? (
            <div>Processing Submission...</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              {step === 1 && (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Introduce Yourself"
                    className="text-2xl border-b-2 border-gray-700 text-center outline-none"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Your City Name"
                    className="text-2xl border-b-2 border-gray-700 text-center outline-none"
                  />
                </>
              )}
              <button type="submit" className="hidden" />
            </form>
          )
        ) : (
          <div>Thank you! Proceed to next step.</div>
        )}
      </div>

      {/* Camera + Gallery Buttons */}
      <div className="absolute bottom-40 flex gap-16">
        <button onClick={handleCameraClick} className="flex flex-col items-center">
          <img src="/camera-shutter.png" alt="Camera" className="w-20 h-20" />
          <span className="text-sm text-center">ACCESS CAMERA</span>
        </button>

        <Link href="/gallery" className="flex flex-col items-center">
          <img src="/image-gallery.png" alt="Gallery" className="w-20 h-20" />
          <span className="text-sm text-center">ACCESS GALLERY</span>
        </Link>
      </div>

      {/* Back Button */}
      <Link href="/" className="absolute left-14 bottom-28 flex items-center z-20">
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-gray-800 mr-2 transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-black rotate-340" size={14} />
        </span>
        <div className="text-sm text-black font-bold ml-6">BACK</div>
      </Link>

      {/* Proceed Button */}
      {success && (
        <Link
          href="/result"
          className={`absolute right-14 bottom-28 flex items-center z-20 transition-all duration-700 ${
            showProceed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50vw]"
          }`}
        >
          <div className="text-sm text-black font-bold mr-6">PROCEED</div>
          <span className="inline-flex items-center justify-center w-10 h-10 -rotate-45 border border-gray-800 ml-2 transition-transform duration-300 group-hover:scale-110">
            <IoTriangleSharp className="text-black rotate-[10deg]" size={14} />
          </span>
        </Link>
      )}
    </div>
  );
}


