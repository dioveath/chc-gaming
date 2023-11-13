import React from "react";
import { useGetArenasQuery } from "../../Arena/arenaApiSlice";
import TourneyCard from "../../../components/Tourneys/TourneyCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TourneySection() {
  const { data, isLoading, error } = useGetArenasQuery();
  // let tourneys = data?.arenas?.arenas;

  return (
    <>
      <h2 className="text-white font-bold text-xl mb-4">Trending Tourneys</h2>
      <div className="flex items-center gap-4 overflow-x-scroll p-4">
        <SkeletonTheme color="#131313" highlightColor="#151515" baseColor="#131313">
          { isLoading &&
            [1, 2, 3].map((i) => (
              <div key={i} className="w-96 min-w-[250px] h-52 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
        </SkeletonTheme>

        {data &&
          [1, 2].map((tourney) => (
            <TourneyCard/>
          ))}

      </div>
    </>
  );
}
