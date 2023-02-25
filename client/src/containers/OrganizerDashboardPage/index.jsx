import styled from "styled-components";
import tw from "twin.macro";

import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "./LeftSideBar";
import { MenuItems } from "./MenuItems";
import { useNavigate, useParams } from "react-router-dom";

import { useGetArenaQuery } from "../Arena/arenaApiSlice";
import BounceLoader from "react-spinners/BounceLoader";
import { useEffect } from "react";
import { setArena } from "../../redux/OrganizerDashboardSlice";

const PageContainer = styled.div`
  background: radial-gradient(#1d0207, #0d0000);
  ${tw`
flex
w-screen
h-screen
overflow-x-hidden
gap-4
`}
`;

const ContentContainer = styled.div`
  ${tw`
w-full
h-full
px-2
flex
justify-center
`}
`;

export default function OrganizerDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { dashboard, arena } = useSelector((state) => state.organizer);
  const { userId } = useSelector((state) => state.auth);
  const renderContent = MenuItems.find(
    (menu) => menu.name === dashboard.activeMenu
  );

  const { data, error, isLoading, isFetching } = useGetArenaQuery(params.id, {
    skip: !params?.id,
  });

  useEffect(() => {    
    if(!data) return;
    if(userId !== data.owner) return;
    dispatch(setArena(data));
  }, [data, dispatch, userId]);  

  if (!params?.id) {
    navigate('/dashboard');
    return <p> Redirecting... </p>;
  }

  return (
    <PageContainer>
      <LeftSideBar />
      { isLoading && <BounceLoader></BounceLoader> }
      { arena && <ContentContainer>{renderContent?.content}</ContentContainer> }
    </PageContainer>
  );
}