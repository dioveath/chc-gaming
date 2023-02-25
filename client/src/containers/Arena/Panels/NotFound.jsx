import React from "react";
import { BsExclamationLg } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="w-full border-2 border-slate-800 border-dashed rounded-md p-4 flex gap-2 justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-cornellred flex justify-center items-center">
          <BsExclamationLg className="text-white" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-white font-semibold">
            Service not available right now.
          </p>
          <p className="text-white text-sm">Please try again later!</p>
        </div>
      </div>
    </div>
  );
}
