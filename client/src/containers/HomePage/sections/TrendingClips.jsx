import React from "react";
import ClipViewCard from "../../../components/Clips/ClipViewCard";
import { useGetClipsQuery } from "../../../redux/ClipApi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../Arena/Panels/NotFound";

export default function TrendingClips() {
  const { data, isLoading, error } = useGetClipsQuery({});
  const clips = data?.clips?.clips;

  return (
    <>
      <h2 className="text-white font-bold text-xl mb-4">Trending Clips</h2>
      <div className="flex items-center gap-4 overflow-x-scroll p-4">
        <SkeletonTheme color="#131313" highlightColor="#151515" baseColor="#131313">
          {isLoading &&
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-96 min-w-[250px] h-52 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
        </SkeletonTheme>
        {/* {!isLoading && clips && clips.map((clip) => <ClipViewCard key={clip._id} clip={clip} />)} */}
        {!isLoading && clips && [1, 2].map((clip) => <ClipViewCard key={clip._id} clip={clip} />)}
      </div>
      {error && <NotFound />}
    </>
  );
}
