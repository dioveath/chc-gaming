import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  LeftBarContainer,
  ProfileContainer,
  ProfileStatsContainer,
  SidebarState,
  Navbar,
} from "./StyledElements.js";

import MenuItem from "../../../components/LeftNavbar/MenuItem.js";
import { setActiveMenu } from "../../../redux/UserDashboardSlice.js";
import { FlexContainer } from "../../../components/base";
import { Text, NormalText, BoldText } from "../../../components/Text";
import { Marginer } from '../../../components/Marginer';

import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../components/Responsive";
import { FaHamburger, FaTimes } from "react-icons/fa";
import Logo from "../../../assets/images/chc_gaming_logo.png";
import { GiHamburgerMenu } from 'react-icons/gi';

import { useGetUserQuery } from "../../../redux/UserApi";
import { useGetClipsQuery } from "../../../redux/ClipApi";

const useClickOutside = (handler) => {
  const domNodeRef = useRef();

  useEffect(() => {
    const mouseHandler = (event) => {
      if (!domNodeRef.current.contains(event.target)) handler();
    };

    window.addEventListener("mousedown", mouseHandler);
    return () => window.removeEventListener("mousedown", mouseHandler);
  }, [handler]);

  return domNodeRef;
};

const Container = styled.div`
${tw`
fixed
left-0
top-0
z-20
`}
`;

const NavSwitchContainer = styled(FlexContainer)`
  ${tw`
absolute
z-40
top-2
left-0
rounded-tl-none
rounded-bl-none
rounded-tr
rounded-br
shadow-2xl
cursor-pointer
transition-all
`}
`;

const NavSwitcher = ({ state, children, ...props }) => {
  let bgColor = "";
  let width = "w-16 px-4 py-2";
  switch (state) {
    case SidebarState.DESKTOP:
      break;
    case SidebarState.TABLET:
      break;
    case SidebarState.MOBILE:
      break;
  }
  return (
    <NavSwitchContainer className={`${bgColor} ${width}`} {...props}>
      { state === SidebarState.MOBILE && <GiHamburgerMenu color='white' className='w-6 h-6'/> }
      { state === SidebarState.TABLET && <img alt="" src={Logo} className={`w-8 h-8`}/> }
    </NavSwitchContainer>
  );
};


export default function LeftSideBar({ menuItems }) {
  const auth = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(auth.userId);
  const { data: clipsData } = useGetClipsQuery({ author: auth.userId });

  const clips = clipsData?.clips?.clips || [];
  const totalLikes = clips.reduce(
    (prevTotal, currentClip) => prevTotal + currentClip.likes.length,
    0
  );

  const { dashboard } = useSelector((state) => state.userDashboard);
  const isDesktop = useMediaQuery({ minWidth: SCREENS.xl });
  const isMobile = useMediaQuery({ minWidth: SCREENS.sm });
  const [sidebarState, setSidebarState] = useState(
    isMobile
      ? SidebarState.MOBILE
      : isDesktop
      ? SidebarState.DESKTOP
      : SidebarState.TABLET
  );
  const [revNavCycle, setRevNavCycle] = useState(false); //back & forth cycling of sidebarState
  const dispatch = useDispatch();
  const history = useHistory();

  const navNode = useClickOutside(() => {
    // toggleSidebarState();
  });

  const toggleSidebarState = () => {
    if (sidebarState >= 2) {
      setRevNavCycle(
        true,
        setSidebarState(Math.max(0, Math.min(2, sidebarState - 1)))
      );
    } else if (sidebarState <= 0) {
      setRevNavCycle(
        false,
        setSidebarState(Math.max(0, Math.min(2, sidebarState + 1)))
      );
    } else {
      setSidebarState(
        Math.max(0, Math.min(2, sidebarState + (revNavCycle ? -1 : 1)))
      );
    }
  };

  return (
    <>
    <Navbar/>
    <Container>
      
      <NavSwitcher
        state={sidebarState}
        justify="center"
        onClick={() => {
          toggleSidebarState();
        }}
      >
      </NavSwitcher>

      <LeftBarContainer state={sidebarState} ref={navNode}>
        <FlexContainer
          justify={
            sidebarState === SidebarState.DESKTOP ? "flex-end" : "center"
          }
          onClick={() => {
            if (isDesktop) return;
            toggleSidebarState();
          }}
          pad={sidebarState === SidebarState.DESKTOP ? "2rem" : "1rem"}
        >
          {sidebarState === SidebarState.DESKTOP && (
            <>
              <FlexContainer justify="center" w="100%">
                <img alt="" src={Logo} className="w-20 h-20" />
              </FlexContainer>
              <FaTimes
                size="2rem"
                color="white"
                className={isDesktop && "invisible"}
              />
            </>
          )}
        </FlexContainer>

        <FlexContainer
          align="center"
          justify="center"
          gap="1rem"
          pad="1rem 0rem"
          className="mt-4"
        >
          <FlexContainer direction="col" className="relative">
            <ProfileContainer
              src={data.profile_link}
              active={sidebarState === SidebarState.DESKTOP}
            ></ProfileContainer>
          </FlexContainer>
          {sidebarState === SidebarState.DESKTOP && (
            <FlexContainer direction="col">
              <BoldText> {data.first_name + " " + data.last_name} </BoldText>
              <Text fontSize="0.7rem" fontWeight="400">
                @{data.gaming_name}
              </Text>
              <Text fontSize="0.8rem" fontWeight="500">
                {"Immortal"}
              </Text>
            </FlexContainer>
          )}
        </FlexContainer>

        {sidebarState === SidebarState.DESKTOP && (
          <ProfileStatsContainer>
            <FlexContainer direction="col" justify="center" align="center">
              <BoldText> {totalLikes} </BoldText>
              <NormalText> Likes </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" justify="center" align="center">
              <BoldText> {data.followers.length}</BoldText>
              <NormalText> Followers </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" justify="center" align="center">
              <BoldText> {data.following.length} </BoldText>
              <NormalText> Following </NormalText>
            </FlexContainer>
          </ProfileStatsContainer>
        )}

        <FlexContainer direction="col" pad="1rem 0.4rem" gap="0.5rem">
          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.name}
                open={sidebarState === SidebarState.DESKTOP}
                active={dashboard.activeMenu === item.name}
                icon={item.icon}
                name={item.name}
                onClick={() => {
                  if (item.name === "Log out") {
                    history.push("/auth/logout");
                    return;
                  }
                  dispatch(setActiveMenu(item.name));

                  let currentState = sidebarState;
                  setSidebarState(++currentState % 3);
                }}
              />
            );
          })}
        </FlexContainer>
        <Marginer vertical='10rem'/>
      </LeftBarContainer>
    </Container>
    </>
  );
}
