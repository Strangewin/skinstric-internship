"use client"; 
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";

export default function SummaryPage() {
  const [demographicData, setDemographicData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedOptions, setSelectedOptions] = useState({
    race: null,
    age: null,
    sex: null,
  });
  const [confirmedOptions, setConfirmedOptions] = useState(null);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Define data formatters once, inside the component
  const getRaceData = (data) => {
    if (!data?.race) return [];
    return Object.entries(data.race)
      .map(([key, value]) => ({
        label: capitalize(key),
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  const getAgeData = (data) => {
    if (!data?.age) return [];
    return Object.entries(data.age)
      .map(([key, value]) => ({
        label: key,
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  const getSexData = (data) => {
    if (!data?.gender) return [];
    return Object.entries(data.gender)
      .map(([key, value]) => ({
        label: capitalize(key),
        value: `${Math.round(value * 100)}%`,
      }))
      .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  };

  // Call the functions to get the data arrays based on the current state
  const raceData = getRaceData(demographicData);
  const ageData = getAgeData(demographicData);
  const sexData = getSexData(demographicData);

useEffect(() => {
    const stored = sessionStorage.getItem("demographicData");
    console.log("Stored data from sessionStorage:", stored);
    if (stored) {
        const parsed = JSON.parse(stored);

        setDemographicData(parsed.data);

        const initialRace = getRaceData(parsed)[0]?.label || null;
        const initialAge = getAgeData(parsed)[0]?.label || null;
        const initialSex = getSexData(parsed)[0]?.label || null;

        setSelectedOptions({
            race: initialRace,
            age: initialAge,
            sex: initialSex,
        });
    }
}, []);

  const selectedData =
    selectedCategory === "race"
      ? raceData
      : selectedCategory === "age"
      ? ageData
      : sexData;

  const confirmedLabel = confirmedOptions
    ? confirmedOptions[selectedCategory]
    : null;
  const confirmedItem = confirmedLabel
    ? selectedData.find((item) => item.label === confirmedLabel)
    : null;

  const defaultItem = selectedData[0] || null;

  const handleSelectOption = (category, label) => {
    setSelectedOptions(prev => ({ ...prev, [category]: label }));
  };

  const handleConfirm = () => {
    setConfirmedOptions(selectedOptions);
  };

  const handleReset = () => {
   const getRaceData = (data) => {
  if (!data) return [];
  
  const raceData = data.race || data.Race || data.demographics?.race;
  if (!raceData) return [];
  
  return Object.entries(raceData).map(([key, value]) => ({
    label: capitalize(key),
    value: value <= 1 ? `${Math.round(value * 100)}%` : `${value}%`
  }));
};

const getAgeData = (data) => {
  const ageData = data.age || data.Age || data.demographics?.age;
  if (!ageData) return [];
  return Object.entries(ageData).map(([key, value]) => ({
    label: key,
    value: value <= 1 ? `${Math.round(value * 100)}%` : `${value}%`
  }));
};

const getSexData = (data) => {
  const sexData = data.sex || data.Sex || data.gender || data.Gender || data.demographics?.sex;
  if (!sexData) return [];
  return Object.entries(sexData).map(([key, value]) => ({
    label: capitalize(key),
    value: value <= 1 ? `${Math.round(value * 100)}%` : `${value}%`
  }));
};
    setSelectedOptions({ race, age, sex });
    setConfirmedOptions(null);
  };

  return (
    <div className="h-screen flex flex-col bg-white px-8 relative">
      <div className="mt-16 font-bold">A.I. ANALYSIS</div>
      <h1 className="text-[60px] max-md:text-[40px]">DEMOGRAPHICS</h1>
      <p className="text-sm">PREDICTED RACE & AGE</p>

      {/* Main grid */}
      <div className="flex-grow overflow-y-auto pb-32 mt-12">
        <div className="w-full flex lg:flex-row flex-col gap-4">
          {/* Left column */}
          <div className="lg:flex-[3] flex flex-col gap-[8px]">
            {[
              { key: "race", label: "RACE", value: confirmedOptions?.race || raceData[0]?.label },
              { key: "age", label: "AGE", value: confirmedOptions?.age || ageData[0]?.label },
              { key: "sex", label: "SEX", value: confirmedOptions?.sex || sexData[0]?.label },
            ].map(({ key, label, value }) => (
              <div
                key={key}
                className={`flex flex-col border-t border-black p-2 font-semibold cursor-pointer ${
                  selectedCategory === key
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                <span className="mb-6 uppercase font-bold">{value || "N/A"}</span>
                <span className="font-bold">{label}</span>
              </div>
            ))}
          </div>

          {/* Middle column */}
          <div className="lg:flex-[12] p-4 bg-gray-100 border-t border-black flex flex-col items-center justify-center">
            <div className="text-2xl font-semibold mb-8">
              {selectedOptions[selectedCategory] || "No data"}
            </div>
            <div className="w-72 h-72">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <circle
                  className="text-black"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray={`${
                    selectedData.find(item => item.label === selectedOptions[selectedCategory])?.value.replace("%", "") || 0
                  }, 100`}
                  transform="rotate(-90 18 18)"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <text
                  x="18"
                  y="20.5"
                  className="text-[4px] fill-black font-bold"
                  textAnchor="middle"
                >
                  {selectedData.find(item => item.label === selectedOptions[selectedCategory])?.value || "0%"}
                </text>
              </svg>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:flex-[5] p-4 bg-gray-100 border-t border-black flex flex-col">
            <div className="flex items-center justify-between py-2 font-bold">
              <span>{selectedCategory.toUpperCase()}</span>
              <span>A.I. CONFIDENCE</span>
            </div>
            {selectedData.map(({ label, value }) => (
              <div
                key={label}
                onClick={() => handleSelectOption(selectedCategory, label)}
                className={`flex items-center justify-between px-2 py-4 cursor-pointer ${
                  selectedOptions[selectedCategory] === label
                    ? "bg-black text-white"
                    : "hover:bg-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-black rotate-45" />
                  <span>{label}</span>
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <footer className="flex items-center justify-between px-8 py-8 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center space-x-3 group hover:scale-110 transition-transform duration-300"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rotate-45 border border-gray-800">
            <IoTriangleSharp className="text-black -rotate-[16deg]" size={12} />
          </span>
          <span className="font-bold text-sm">BACK</span>
        </Link>

        <p className="text-xs text-gray-500">
          If A.I. estimate is wrong, select the correct one.
        </p>

        <Link
          href="/"
          className="flex items-center space-x-3 group hover:scale-110 transition-transform duration-300"
        >
          <span className="font-bold text-sm">HOME</span>
          <span className="inline-flex items-center justify-center w-8 h-8 -rotate-45 border border-gray-800">
            <IoTriangleSharp className="text-black rotate-[10deg]" size={12} />
          </span>
        </Link>
      </footer>
    </div>
  );
}




