import React from "react";
import { GoPerson } from "react-icons/go";
import { MdVideocam } from "react-icons/md";

export default function AboutPanel() {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-between">
      <div className="grow flex flex-col gap-4 mt-2 min-w-[700px]">
        <div className="bg-woodred h-96 rounded-md flex justify-center items-center">
          <div className="flex flex-col items-center">
            <MdVideocam className="text-slate-500 text-3xl" />
            <button className="text-white text-xs bg-cornellred rounded-full px-2 py-1">
              {" "}
              Add Video{" "}
            </button>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Members</p>
          <p className="text-sm text-white"> 10 Members </p>
        </div>

        <div className="max-w-[700px]">
          <p className="font-semibold text-white">Description</p>
          <p className="text-sm text-white">
            Get ready for the ultimate e-Sports experience with Charicha Gaming!
            This is where the action never stops and the competition never ends.
            Our platform is packed with endless opportunities for you to show
            off your skills and compete with the best players and organizers
            worldwide. We're supporting all the best eSports titles PUBG Mobile,
            and FIFA. And with the backing of Microsoft for Startups, you know
            you're in good hands. So, what are you waiting for? Join the
            Charicha Gaming community and let's raise the stakes together!
          </p>
          <br />
          <p className="text-sm text-white">
            Charicha Gaming is a platform for eSports players & organizers
            backed up by Microsoft for Startups. We're the platform for you to
            participate in breathtaking & endless Tournaments and Leagues
            organized intricately by organizers around the globe. We support
            every popular e-Sports title there is. We aim to welcome and grow
            with everyone in this little gaming community around the world.
          </p>
        </div>

        <div>
          <p className="font-bold text-white text-2xl mb-4"> Members </p>
          <div className="flex gap-2">
            <div className="w-20 h-20 bg-slate-800 rounded-full overflow-clip flex justify-center items-center">
              <GoPerson className="text-slate-400 text-4xl" />
            </div>
            <div className="w-20 h-20 bg-slate-800 rounded-full overflow-clip flex justify-center items-center">
              <GoPerson className="text-slate-400 text-4xl" />
            </div>
            <div className="w-20 h-20 bg-slate-800 rounded-full overflow-clip flex justify-center items-center">
              <GoPerson className="text-slate-400 text-4xl" />
            </div>
            <div className="w-20 h-20 bg-slate-800 rounded-full overflow-clip flex justify-center items-center">
              <GoPerson className="text-slate-400 text-4xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="basis-1/3">
        <p className="font-bold text-white text-2xl mb-4"> Admin </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20 bg-slate-800 rounded-full flex justify-center items-center">
              <GoPerson className="text-slate-400 text-4xl" />
              <div className="w-3 h-3 absolute bottom-0 right-0 m-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-white text-sm">
              {" "}
              dioveath#5929{" "}
              <span className="text-xs text-white font-semibold px-2 py-1 bg-sky-600 rounded-full">
                Admin
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
