import styled from "styled-components";
import tw from "twin.macro";

import { useSelector } from "react-redux";
import LeftSideBar from "./LeftSideBar";
import Dashboard from "./Dashboard";
import FriendsPage from "./Friends";
import ClanPage from "./Clan";

import { FlexContainer } from "../../components/base";

import { Text } from "../../components/Text";

import BounceLoader from "react-spinners/BounceLoader";
import { MdOutlineError } from "react-icons/md";
import { IoIosPeople } from 'react-icons/io';
import { FcLandscape } from "react-icons/fc";
import { GiCastle } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const PageContainer = styled.div`
  background: radial-gradient(#1d0207, #0d0000);
  padding-left: 60px;
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
    name: "Your Clan",
    icon: <GiCastle />,
    content: <ClanPage />,
  },
  {
    name: "Explore",
    icon: <FcLandscape />,
    content: <Dashboard />,
  },
  {
    name: "Log out",
    icon: <RiLogoutCircleLine />,
    content: <></>
  },
];

export default function DashboardPage() {
  const { isPending, isError } = useSelector((state) => state.user);
  const { dashboard } = useSelector((state) => state.userDashboard);

  const renderContent = MenuItems.find(
    (menu) => menu.name === dashboard.activeMenu
  ).content;

  if (isError)
    return (
      <FlexContainer
        bg={"radial-gradient(#1D0207, #0D0000)"}
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
      >
        <MdOutlineError size="4rem" color="white" />
        <Text fontSize="1.4rem" fontWeight="600" color="white">
          Server Error | 500
        </Text>
      </FlexContainer>
    );

  if (isPending)
    return (
      <FlexContainer
        bg={"radial-gradient(#1D0207, #0D0000)"}
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
      >
        <BounceLoader color="red" />
      </FlexContainer>
    );

  return (
    <>
      <PageContainer>
        <LeftSideBar menuItems={MenuItems} />
        <FlexContainer justify="center" pad="0.5rem" gap="1rem">
          {renderContent}
        </FlexContainer>
      </PageContainer>
    </>
  );
}
