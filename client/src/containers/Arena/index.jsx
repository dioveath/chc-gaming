import { useNavigate, useParams } from "react-router-dom";
import { useGetArenaQuery } from "./arenaApiSlice";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";

import BounceLoader from "react-spinners/BounceLoader";
import coverDefault from "../../assets/images/fifa_league_poster.png";
import logoDefault from "../../assets/images/logo_profile.png";
import { AiFillCamera } from "react-icons/ai";
import Tab, { TabItem } from "../../components/Tab";
import HomePanel from "./Panels/Home";
import AboutPanel from "./Panels/About";
import NewsPanel from "./Panels/News";
import TournamentsPanel from "./Panels/Tournaments";
import LeaderboardsPanel from "./Panels/Leaderboards";

export default function ArenaPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, error, isLoading, isFetching } = useGetArenaQuery(params?.id, {
    skip: !params?.id,
  });

  const link = params["*"];
  const isOwner = !!link?.split("/")[0];
  const panel = params.panel ?? "home";

  const computeLink = link?.split("/");
  computeLink.pop();
  const baseLink = computeLink.join("/");

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <BounceLoader color="red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <BounceLoader color="red" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {panel === "home" && (
        <>
          {isLoading && <Skeleton height={200} />}
          <div>
            {!isFetching && (
              <div className="relative">
                {isOwner && (
                  <button className="absolute top-0 right-0 bg-slate-700 text-white flex items-center gap-3 p-2 rounded-md m-2">
                    <AiFillCamera className="flex " /> Upload Cover
                  </button>
                )}
                <img
                  src={coverDefault}
                  alt={data.name + " Cover Photo"}
                  className="w-full h-[450px] object-cover overflow-clip"
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="px-2 md:px-4 lg:px-20 xl:px-52 max-w-[1920px] mt-2">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 ">
          <div className="flex items-center gap-2">
            <div className="w-20 h-20 rounded-full overflow-clip bg-gradient-to-b from-transparent to-black">
              {!isFetching && (
                <div className="relative">
                  {isOwner && (
                    <button className="absolute bottom-0 right-0 bg-slate-700/70 text-white items-center p-2 rounded-full m-1">
                      <AiFillCamera />
                    </button>
                  )}
                  <img
                    src={logoDefault}
                    alt={data.name + " Logo"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-white text-2xl font-bold"> {data?.name} </p>
              <p className="text-white text-xs"> @{data?.handle} </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button> Join Arena </Button>
            <Button type="outlined"> Subscribe </Button>
          </div>
        </div>

        <Tab
          initTab={panel}
          onChange={(newTab) => navigate(`/${baseLink}/${newTab}`)}
        >
          <TabItem name="Home" element={<HomePanel />} />
          <TabItem name="News" element={<NewsPanel />} />
          <TabItem name="Tournaments" element={<TournamentsPanel />} />
          <TabItem name="Leaderboards" element={<LeaderboardsPanel />} />
          <TabItem name="About" element={<AboutPanel />} />
        </Tab>
      </div>
    </div>
  );
}
