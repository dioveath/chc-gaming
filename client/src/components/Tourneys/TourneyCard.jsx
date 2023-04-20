import React from "react";

export default function TourneyCard() {
  return (
    <div className="flex flex-col gap-2 min-w-[250px] w-96 transition-all p-4 group">
      <img className="w-full rounded-md group-hover:scale-105 transition-all cursor-pointer" src="/assets/images/celebration.jpg" alt="Tournament Cover" />
      <div className="flex gap-2">
        <img className="w-12 h-12 object-cover rounded-full overflow-clip bg-slate-700" src="/assets/images/chc_gaming_logo.png" alt="Arena logo" />
        <div className="text-slate-300 text-xs flex flex-col gap-[1px]">
          <p> Tomorrow, 18:00 </p>
          <p className="font-bold text-white text-sm cursor-pointer">Charicha Tourney</p>
          <p> Asia • 1v1 • NRs. 10,000 • 32 Slots </p>
          <p className="bg-slate-700 rounded-full text-xs w-fit px-2">Members only</p>
        </div>
      </div>
    </div>
  );
}
