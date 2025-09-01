"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [demographics, setDemographics] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("demographicData");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setDemographics(parsed);
      } catch (err) {
        console.error("Failed to parse demographics", err);
      }
    } else {
      router.push("/camera");
    }
  }, [router]);

  if (!demographics) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">AI Demographic Predictions</h1>

      <div className="w-full max-w-md space-y-8">
        {Object.entries(demographics).map(([category, values]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-3 capitalize">{category}</h2>

            {values && typeof values === "object" ? (
              Object.entries(values).map(([label, rawVal]) => {
               
                const percent =
                  typeof rawVal === "number"
                    ? rawVal
                    : parseFloat(rawVal) || 0;

                return (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{label}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
             
              <p>{String(values)}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/camera")}
        className="mt-10 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Retake Picture
      </button>
    </div>
  );
}



