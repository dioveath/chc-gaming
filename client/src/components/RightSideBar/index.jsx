import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function RightSideBar({ open = true, setOpen }) {
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={`${open ? "absolute lg:block w-60" : "absolute lg:block w-4"} top-0 right-0 pt-[56px] h-full bg-secondary transition-all group`}>
      <div className="relative">
        <div className="absolute top-2 -left-4 bg-primary rounded-full p-2 active:scale-105 hover:bg-cornellred cursor-pointer" onClick={toggleOpen}>
          { !open && <BiArrowBack size="1rem" color="white"/> }
          { open && <BiArrowBack size="1rem" color="white" transform="rotate(180)"/>}
        </div>
        <div className={`${open ? "scale-100" : "scale-0"}`}>
          <div className="flex flex-col items-center justify-start p-4">
            <h6 className="font-semibold text-white"> Your Activities </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
