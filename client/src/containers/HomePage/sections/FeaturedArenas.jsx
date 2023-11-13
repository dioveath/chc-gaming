import React from "react";
import ArenaCard from "../../../components/Arena/ArenaCard";
import { useGetArenasQuery } from "../../Arena/arenaApiSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../Arena/Panels/NotFound";

export default function FeaturedArenas() {
  const { data, isLoading, error } = useGetArenasQuery();
  const arenas = data?.arenas?.arenas;

  return (
    <>
      <h2 className="text-white font-bold text-xl mb-4">Featured Arenas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 justify-items-center p-2">
        {isLoading && [1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="w-32 h-32">
              <Skeleton className="w-full h-full" circle={true} />
            </div>
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
        {!isLoading && arenas && arenas.map((arena) => <ArenaCard key={arena.id} arena={arena} />)}
      </div>
      { error && <NotFound/>}      
    </>
  );
}
