"use client";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function TestingPage() {
  const square1 = useRef(null);
  const square2 = useRef(null);
  const square3 = useRef(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const animateSquare = (square, duration) => {
      if (square.current) {
        square.current.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          {
            duration,
            iterations: Infinity,
            easing: "linear",
          }
        );
      }
    };
    animateSquare(square1, 100000);
    animateSquare(square2, 80000);
    animateSquare(square3, 70000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1 → just go to step 2, no API call yet
    if (step === 1) {
      if (!formData.name.trim()) {
        alert("Please enter your name");
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 → submit full data
    if (step === 2) {
      if (!formData.location.trim()) {
        alert("Please enter your city");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              location: formData.location,
            }),
          }
        );

        const data = await response.json();
        console.log("Server response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit");
        }

        alert("Form completed! 🎉");
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Rotating squares */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Top left label */}
        <div className="absolute top-0.5 left-16 text-xs font-bold text-black z-10">
          TO START ANALYSIS
        </div>

        <div
          ref={square3}
          className="absolute w-[500px] h-[500px] border-2 border-dashed border-gray-100 flex items-center justify-center mb-60"
          style={{ zIndex: 1 }}
        ></div>
        <div
          ref={square2}
          className="absolute w-[450px] h-[450px] border-2 border-dashed border-gray-200 flex items-center justify-center mb-60"
          style={{ zIndex: 2 }}
        ></div>
        <div
          ref={square1}
          className="absolute w-[400px] h-[400px] border-2 border-dashed border-gray-300 mb-60"
          style={{ zIndex: 3 }}
        ></div>

        {/* Centered form */}
        <div
          className="absolute w-[400px] h-[400px] flex flex-col items-center justify-center mb-60"
          style={{ zIndex: 4 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {step === 1 && (
              <>
                <span className="text-xs font-semibold text-gray-400 mb-2">
                  ENTER YOUR NAME
                </span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="text-2xl text-gray-700 underline text-center bg-transparent border-none outline-none"
                  required
                />
              </>
            )}
            {step === 2 && (
              <>
                <span className="text-xs font-semibold text-gray-400 mb-2">
                  ENTER YOUR CITY
                </span>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Your city"
                  className="text-2xl text-gray-700 underline text-center bg-transparent border-none outline-none"
                  required
                />
              </>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 px-4 py-2 bg-black text-white rounded-md text-sm disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : step === 1
                ? "Next"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Back button bottom left */}
      <Link
        href="/"
        className="absolute left-14 bottom-28 flex items-center z-20"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border-1 border-gray-800 mr-2">
          <IoTriangleSharp className="text-black rotate-340" size={14} />
        </span>
        <div className="text-sm text-black font-bold ml-6">BACK</div>
      </Link>
    </div>
  );
}


