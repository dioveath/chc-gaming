import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/UserApi";

import Navbar from "../../components/Navbar";
import ArenaBar from "../../components/ArenaBar";
import RightSideBar from "../../components/RightSideBar";
import LeftSideBar from "./LeftSideBar";
import Dashboard from "./Dashboard";
import FriendsPage from "./Friends";
import ClanPage from "./Clan";
import ExplorePage from "./Explore";
import TournamentsPage from "./Tournaments";
import SettingsPage from "./Settings";
import Logout from "../../components/AccountBox/Logout";

import { FlexContainer } from "../../components/base";
import { Text } from "../../components/Text";

import BounceLoader from "react-spinners/BounceLoader";
import { MdOutlineError } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FcLandscape } from "react-icons/fc";
import { GiCastle, GiCheckboxTree } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import HomePage from "../HomePage";
import { useLocation } from "react-router-dom";

const PageContainer = styled.div`
  background: radial-gradient(#1d0207, #0d0000);
  ${tw`
flex
w-screen
h-screen
justify-center
overflow-x-hidden
`}
`;

const MenuItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    content: <Dashboard />,
  },
  {
    name: "Following",
    icon: <IoIosPeople />,
    content: <FriendsPage />,
  },
  {
    name: "Tourneys",
    icon: <GiCheckboxTree />,
    content: <TournamentsPage />,
  },
  {
    name: "Your Clan",
    icon: <GiCastle />,
    content: <ClanPage />,
  },
  {
    name: "Explore",
    icon: <FcLandscape />,
    content: <ExplorePage />,
  },
  {
    name: "Settings",
    icon: <IoSettings />,
    content: <SettingsPage />,
  },
  {
    name: "Log out",
    icon: <RiLogoutCircleLine />,
    content: <Logout />,
  },
];

const ContentContainer = styled.div`
  ${tw`
max-w-2xl
w-full
h-full
px-2
`}
`;

export default function DashboardPage() {
  const { dashboard } = useSelector((state) => state.userDashboard);
  const { userId } = useSelector((state) => state.auth);
  const { isLoading, error } = useGetUserQuery(userId);

  // get current path
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const contentWidth = openRightSidebar ? "w-[calc((100%-4rem)*8/10)]" : "w-full";

  const renderContent = MenuItems.find((menu) => menu.name === dashboard.activeMenu).content;

  if (error)
    return (
      <FlexContainer bg={"radial-gradient(#1D0207, #0D0000)"} w="100vw" h="100vh" justify="center" align="center">
        <MdOutlineError size="4rem" color="white" />
        <Text fontSize="1.4rem" fontWeight="600" color="white">
          Server Error | 500
        </Text>
      </FlexContainer>
    );

  if (isLoading)
    return (
      <FlexContainer bg={"radial-gradient(#1D0207, #0D0000)"} w="100vw" h="100vh" justify="center" align="center">
        <BounceLoader color="red" />
      </FlexContainer>
    );

  return (
    <main className="h-screen">
      <Navbar page={currentPage}/>

      <div className="flex flex-row h-[calc((100%-56px))]">
        <ArenaBar />
        <div className={`${contentWidth} h-full overflow-auto flex justify-center`}>
          <HomePage />
        </div>
        {/* <aside className="w-[calc((100%-4rem)*2/10)]  bg-pink-300 flex justify-center items-center">
        </aside> */}
      </div>
    </main>
  );
}
