import Link from "next/link";
import { IoTriangleSharp } from "react-icons/io5";

export default function ResultPage() {
  return (
      <Link
        href="/"
        className="group absolute left-14 bottom-28 flex items-center z-20"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rotate-45 border-1 border-gray-800 mr-2  transition-transform duration-300 group-hover:scale-110">
          <IoTriangleSharp className="text-black rotate-340" size={14} />
        </span>
        <div className="text-sm text-black font-bold ml-6 ">BACK</div>
      </Link>
  );
}
