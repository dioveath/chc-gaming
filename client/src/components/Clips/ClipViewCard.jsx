import React, { useRef } from "react";

export default function ClipViewCard() {
  const videoRef = useRef(null);

  const onMouseOver = () => {
    console.log("Mouse over");
    videoRef.current.play();
  };

  const onMouseLeave = () => {
    console.log("Mouse leave");
    videoRef.current.pause();
  };

  return (
    <div className="min-w-[250px] w-96  rounded-md overflow-clip" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <video fluid={false} width={"100%"} height={320} muted={true} disablePictureInPicture ref={videoRef} className="object-cover hover:scale-105 hover:z-20 hover:shadow-xl transition-all cursor-pointer">
        <source src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} />
      </video>
      <div className="flex flex-wrap w-full p-2 items-center gap-2 bg-black">
        <div className="w-16 h-16 rounded-full bg-gray-500"></div>
        <div className="flex-1">
          <div className="w-full flex text-sm text-white gap-1">
            <p className="font-semibold"> uJackal5 </p>
            <p className=""> clipped </p>
            <p className=""> dancing on the moonlight. </p>
          </div>
          <p className="text-slate-300 text-xs"> 1.2 Likes • 100 comments • 32 Share </p>
        </div>
      </div>
    </div>
  );
}
