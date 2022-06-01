import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

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
import { IconButton } from "../../../components/Button";
import { Text } from "../../../components/Text";

import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../components/Responsive";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiEditCircleFill } from "react-icons/ri";
import { MdFileDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";

import { useUpdateUserProfileMutation } from '../../../redux/UserApi';

const FileInput = styled.input`
  ${tw`
hidden
`}
`;

export default function LeftSideBar({ menuItems }) {
  const { data, error } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const { dashboard } = useSelector((state) => state.userDashboard);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [open, setOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [updateUserProfile, { error: updateProfileError }] = useUpdateUserProfileMutation();

  const filePickerRef = useRef();
  const [newProfileImage, setNewProfileImage] = useState(null);

  const onProfileImageChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      setNewProfileImage(readerEvent.target.result);
    };

    toast.info("New Profile Image Picked!");
  };

  const removeProfileImage = () => {
    setNewProfileImage(null);
    filePickerRef.current.value = "";
  };

  const updateProfileImage = async (_e) => {
    if (newProfileImage) {
      let formData = new FormData();
      formData.append('photo', filePickerRef.current.files[0]);
      formData.append('test', "test");

      toast.promise(updateUserProfile({ formData}).unwrap(), {
        pending: "Updating profile picture",
        success: {
          render: ({data}) => "Profile changed successfully!"
        },
        error: {
          render: ({ data }) => {
            return "Couldn't update the profile picture!";
          }
        }
      });
    }
  };

  return (
    <LeftBarContainer active={open}>
      <FlexContainer
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
            src={newProfileImage || data.profile_link}
            active={open}
          ></ProfileContainer>
          {open && (
            <FlexContainer
              className="absolute -right-20 -top-14"
              gap="1rem"
              justify="center"
              items="center"
            >
              <IconButton
                className="p-1 px-2"
                gap="0.4rem"
                icon={<RiEditCircleFill size="30" color="white" />}
                onClick={() => {
                  filePickerRef.current.click();
                }}
              >
                Edit
              </IconButton>
              {newProfileImage && (
                <IconButton
                  className="p-1 px-2"
                  icon={<MdFileDownloadDone size="30" color="green" />}
                  onClick={updateProfileImage}
                >
                  {" "}
                  Save{" "}
                </IconButton>
              )}

              <FileInput
                type="file"
                onChange={onProfileImageChange}
                ref={filePickerRef}
                accept="image/png, image/gif, image/jpeg"
              />
            </FlexContainer>
          )}
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
            <BoldText> {0} </BoldText>
            <NormalText> Clips </NormalText>
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
              }}
            />
          );
        })}
      </FlexContainer>
    </LeftBarContainer>
  );
}
