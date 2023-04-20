import React from "react";

export default function ArenaCard() {
  return (
    <div className="flex flex-col gap-2 w-32 items-center transition-all">
      <img className="w-full h-full object-cover rounded-full overflow-clip bg-slate-900/90 hover:scale-105 cursor-pointer transition-all" src="/assets/images/chc_gaming_logo.png" alt="Arena logo" />
      <p className="font-bold text-xs text-white text-center cursor-pointer">Charicha Gaming </p>
      <p className="text-slate-300 text-xs w-fit px-2"> 23k Members</p>
    </div>
  );
}
