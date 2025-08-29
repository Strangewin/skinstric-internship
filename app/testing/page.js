"use client";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function TestingPage() {
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

useEffect(() => {
  if (success) {
    // wait a tick so the element mounts, then animate
    const id = requestAnimationFrame(() => setShowProceed(true));
    return () => cancelAnimationFrame(id);
  } else {
    setShowProceed(false);
  }
}, [success]);

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

 
    if (step === 1) {
      if (!formData.name.trim()) {
        alert("Please enter your name");
        return;
      }
      setStep(2);
      return;
    }


    if (step === 2) {
      if (!formData.location.trim()) {
        alert("Please enter your city");
        return;
      }

      setLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 3000));
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


       setSuccess(true);
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

      
      <div className="absolute inset-0 flex items-center justify-center z-10">

      
        
        <div className="absolute top-0.5 left-16 text-xs font-bold text-black z-10  font-Roobert TRIAL">
          TO START ANALYSIS
        </div>

        <div
          ref={square3}
          className="absolute w-[500px] h-[500px] border-3 border-dotted border-gray-100 flex items-center justify-center mb-60"
          style={{ zIndex: 1 }}
        ></div>
        <div
          ref={square2}
          className="absolute w-[450px] h-[450px] border-3 border-dotted border-gray-200 flex items-center justify-center mb-60"
          style={{ zIndex: 2 }}
        ></div>
        <div
          ref={square1}
         
          className="absolute w-[400px] h-[400px] border-3 border-dotted border-gray-300 mb-60"
          style={{ zIndex: 3 }}
        ></div>

      
       
        <div
          className="absolute w-[400px] h-[400px] flex flex-col items-center justify-center mb-60"
          style={{ zIndex: 4 }}
        >
          {!success ? (
            loading ? (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-5 mt-2 text-base tracking-wider font-semibold text-gray-400">Processing Submission</div>
        <div className="flex">
          <span className="inline-block mx-3 w-2 h-2 tracking-wider bg-gray-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="inline-block mx-3 w-2 h-2 tracking-wider bg-gray-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="inline-block mx-3 w-2 h-2 tracking-wider bg-gray-400 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {step === 1 && (
          <>
            <span className="text-xs font-semibold text-gray-400 mb-2 font-Roobert TRIAL tracking-wider">
              CLICK TO TYPE
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Introduce Yourself"
              className="inline-block text-5xl font-Roobert TRIAL tracking-tight text-gray-700 border-b-2 border-gray-700 pb-1 w-[98%] text-center bg-transparent outline-none"
              required
            />
          </>
        )}
        {step === 2 && (
          <>
            <span className="text-xs font-semibold text-gray-400 mb-2 font-Roobert TRIAL tracking-wider">
              CLICK TO TYPE
            </span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="your city name"
              className="inline-block text-5xl font-Roobert TRIAL tracking-tight text-gray-700 border-b-2 border-gray-700 pb-1 w-[98%] text-center bg-transparent outline-none"
              required
            />
          </>
        )}
        {/* Visually hidden submit button for Enter key accessibility */}
        <button
          type="submit"
          disabled={loading}
          style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', border: 0, clip: 'rect(0,0,0,0)' }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </form>
    )
  ) : (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-Roobert TRIAL text-gray-700 mb-2">
        Thank you!
      </div>
      <div className="text-lg font-Roobert TRIAL text-gray-500">
        Proceed for the next step
      </div>
    </div>
  )}
</div>
        </div>

      {/* Back button bottom left */}
      
      <Link
        href="/"
        
        className="group absolute left-14 bottom-28 flex items-center z-20"
      >
       
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border-1 border-gray-800 mr-2  transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-black rotate-340" size={14} />
        </span>
        
        <div className="text-sm text-black font-bold ml-6 ">BACK</div>
      </Link>
  {success && (
  <Link
    href="/result"
    className={`absolute right-14 bottom-28 flex items-center z-20 group transform transition-all duration-700 ease-out
      ${showProceed ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-[-50vw]"}
    `}
  >
    <div className="text-sm text-black font-bold mr-6 ">
      PROCEED
    </div>
    <span className="inline-flex items-center justify-center w-10 h-10 -rotate-45 border border-gray-800 ml-2 transition-transform duration-300 group-hover:scale-110">
      <IoTriangleSharp className="text-black rotate-[10deg]" size={14} />
    </span>
  </Link>
)}

    </div> 
  );
}


