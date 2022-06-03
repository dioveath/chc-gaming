import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  LeftBarContainer,
  ProfileContainer,
  NormalText,
  BoldText,
  ProfileStatsContainer,
} from "./StyledElements.js";

import MenuItem from "../../../components/LeftNavbar/MenuItem.js";
import { setActiveMenu } from "../../../redux/UserDashboardSlice.js";
import { FlexContainer } from "../../../components/base";
import { Text } from "../../../components/Text";

import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../components/Responsive";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { useGetUserQuery } from '../../../redux/UserApi';
import { useGetClipsQuery } from '../../../redux/ClipApi';


const useClickOutside = (handler) => {
  const domNodeRef = useRef();

  useEffect(() => {
    const mouseHandler = (event) => {
      if(!domNodeRef.current.contains(event.target))
        handler();
    };

    window.addEventListener('mousedown', mouseHandler);
    return () => window.removeEventListener('mousedown', mouseHandler);
  }, [handler]);

  return domNodeRef;
};


export default function LeftSideBar({ menuItems }) {
  const auth = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(auth.userId);
  const { data: clipsData } = useGetClipsQuery({ author: auth.userId });

  const clips = clipsData?.clips?.clips || [];
  const totalLikes = clips.reduce((prevTotal, currentClip) => prevTotal + currentClip.likes.length, 0);

  const { dashboard } = useSelector((state) => state.userDashboard);
  const isDesktop = useMediaQuery({ maxWidth: SCREENS.xl });
  const [open, setOpen] = useState(!isDesktop);
  const dispatch = useDispatch();
  const history = useHistory();

  const navNode = useClickOutside(() => {
    setOpen(!isDesktop);
  });

  return (
    <LeftBarContainer active={open} ref={navNode}>
      <FlexContainer
        className={!isDesktop && 'invisible'}
        justify={open ? "flex-end" : "center"}
        onClick={() => {
          setOpen(!open);
        }}
        pad={open ? "2rem" : "1rem"}
      >
        {open ? (
          <FaTimes size="2rem" color="white" />
        ) : (
          <GiHamburgerMenu size="2rem" color="white" />
        )}
      </FlexContainer>

      <FlexContainer align="center" justify="center" gap="1rem" pad="1rem 0rem">
        <FlexContainer direction="col" className="relative">
          <ProfileContainer
            src={data.profile_link}
            active={open}
          ></ProfileContainer>
        </FlexContainer>
        {open && (
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

      {open && (
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
              open={open}
              active={dashboard.activeMenu === item.name}
              icon={item.icon}
              name={item.name}
              onClick={() => {
                if (item.name === "Log out") {
                  history.push("/auth/logout");
                  return;
                }
                dispatch(setActiveMenu(item.name));
                setOpen(!isDesktop);
              }}
            />
          );
        })}
      </FlexContainer>
    </LeftBarContainer>
  );
}
