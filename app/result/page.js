"use client";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";

function RotatingSquares({ imgSrc, imgAlt, onClick, callout }) {
  const squares = [useRef(null), useRef(null), useRef(null)];
  const sizes = [300, 350, 400];
  const durations = [50000, 70000, 90000];
  const colors = ["border-gray-400", "border-gray-300", "border-gray-200"];

  useEffect(() => {
    squares.forEach((square, idx) => {
      if (square.current) {
        square.current.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          {
            duration: durations[idx],
            iterations: Infinity,
            easing: "linear",
          }
        );
      }
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[550px] h-[250px] -mt-20">
      {squares.map((ref, idx) => (
        <div
          key={idx}
          ref={ref}
          className={`absolute w-[${sizes[idx]}px] h-[${sizes[idx]}px] border-3 border-dotted ${colors[idx]} rounded-lg`}
        />
      ))}

      {/* Center image button */}
      <button
        type="button"
        aria-label={imgAlt}
        className="cursor-pointer transition-transform duration-200 hover:scale-105 relative z-10"
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-[140px] h-[140px] mx-auto mb-2"
        />
      </button>

      {/* Optional callout */}
      {callout && (
        <div className={`absolute flex items-center ${callout.position}`}>
          <div
            className={`w-[110px] h-[2px] bg-black origin-left ${callout.lineRotation}`}
          ></div>
          <div className={`flex items-center relative ${callout.offset}`}>
            {callout.reverse ? (
              <>
                <span className="ml-3 text-sm text-black whitespace-pre-line">
                  {callout.text}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-white border border-black ml-2"></div>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-white border border-black ml-2"></div>
                <span className="ml-3 text-sm text-black whitespace-pre-line">
                  {callout.text}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultPage() {
  const [selectedImage, setSelectedImage] = useState(null);




  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      alert("Camera access granted! (Stream available in console)");
      console.log(stream);
    } catch (err) {
      alert("Camera access denied or not available.");
      console.error(err);
    }
  };

  const openGallery = () => {
    alert("Gallery access (to be implemented)");
  };

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result; // Base64 string
    setSelectedImage(base64Image);
    setLoading(true);

    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("AI predictions:", data);
      setAiPredictions(data); // store the results for later use
    } catch (err) {
      console.error("Error sending image:", err);
      alert("There was an error uploading the image.");
    } finally {
      setLoading(false);
    }
  };
  reader.readAsDataURL(file);
};

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-16 z-10">
        {/* First square, camera */}
        <RotatingSquares
          imgSrc="/camera-shutter.png"
          imgAlt="Open Camera"
          onClick={openCamera}
          callout={{
            position: "right-[-30px] top-1/2 translate-y-[-150%]",
            lineRotation: "rotate-[-30deg]",
            offset: "-top-14 -left-6",
            text: "ALLOW A.I. \nTO SCAN YOUR FACE",
          }}
        />

        {/* Second square, gallery */}
        <RotatingSquares
          imgSrc="/image-gallery.png"
          imgAlt="Open Photo Library"
          onClick={openGallery}
          callout={{
            position: "right-[30px] top-1/2 translate-y-[50%]",
            lineRotation: "rotate-[130deg]",
            offset: "top-21 -left-88",
            text: "ALLOW A.I. \nTO ACCESS GALLERY",
            reverse: true,
          }}
        />

        {/* Hidden file input for gallery */}
        <input
          id="galleryInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="group absolute left-14 bottom-28 flex items-center z-20"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border border-gray-800 mr-2 transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-black rotate-[-20deg]" size={14} />
        </span>
        <div className="text-sm text-black font-bold ml-6">BACK</div>
      </Link>
    </div>
  );
}


