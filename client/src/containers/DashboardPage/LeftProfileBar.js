import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';

import {
  LeftBarContainer,
  ProfileContainer,
  NormalText,
  BoldText,
  ProfileStatsContainer,
} from "./DashboardElements.js";

import MenuItem from "../../components/LeftNavbar/MenuItem.js";
import { setActiveMenu } from "../../redux/UserDashboardSlice.js";
import { FlexContainer } from "../../components/base";
import { IconButton } from '../../components/Button';
import { Text } from "../../components/Text";

import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/Responsive";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiEditCircleFill } from 'react-icons/ri';
import { MdFileDownloadDone } from 'react-icons/md';

import config from '../../config/config';
import { storage, ref, uploadString, getDownloadURL } from '../../lib/firebase';
import { updateUser } from '../../redux/UserSlice';

const ProfileImageContainer = styled.div`
${tw`
relative
`}
`;

const FileInput = styled.input`
${tw`
hidden
`}
`;

export default function LeftProfileBar({ menuItems }) {
  const { data, isPending, error } = useSelector((state) => state.user);
  const auth = useSelector(state => state.auth);
  const { dashboard } = useSelector((state) => state.userDashboard);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [open, setOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const history = useHistory();

  const filePickerRef = useRef();
  const [newProfileImage, setNewProfileImage] = useState(null);

  const onProfileImageChange = (e) => {
    const reader = new FileReader();
    if(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      setNewProfileImage(readerEvent.target.result);
    };

  };

  const removeProfileImage = (e) => {
    setNewProfileImage(null);
    filePickerRef.current.value = "";
  };

  const updateProfileImage = async (e) => {
    console.log("Uploading profile image!");
    if(newProfileImage) {
      try {

      const profileRef = ref(storage, `users/${data.id}/images/profile_image`);
      const uploadResult = await uploadString(profileRef, newProfileImage, 'data_url');
        
        removeProfileImage();        
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      const options = {
        method: 'POST',
        url: `${config.serverUrl}/api/v1/users/${auth.userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },                
        data: {
          profile_link: downloadUrl
        }
      };

        const response = await axios.request(options);
        dispatch(updateUser(response.data.updatedUser));

      } catch(e){
        console.log(e.message);
      }
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

      <FlexContainer align="center"
                     justify="center"
                     gap="1rem"
                     pad="1rem 0rem">
	<FlexContainer direction='col'
                       className="relative">
          <ProfileContainer
            src={ newProfileImage || data.profile_link }
            active={open}>
          </ProfileContainer>
          { open && (
            <FlexContainer className="absolute right-0">
              { newProfileImage &&
                <IconButton className="p-1"
                            icon={<MdFileDownloadDone size='30'color='green'/>}
                            onClick={updateProfileImage}/>}

              <IconButton className="p-1"
                          icon={<RiEditCircleFill size='30' color='royalblue'/>}
                          onClick={() => {
                            filePickerRef.current.click();
                          }}/>
	      <FileInput type="file"
                         onChange={onProfileImageChange}
                         ref={filePickerRef}
                         accept="image/png, image/gif, image/jpeg"/>
            </FlexContainer>)}
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
            <BoldText> { 0 } </BoldText>
            <NormalText> Clips </NormalText>
          </FlexContainer>
          <FlexContainer direction="col" justify="center" align="center">
            <BoldText> { data.followers.length }</BoldText>
            <NormalText> Followers </NormalText>
          </FlexContainer>
          <FlexContainer direction="col" justify="center" align="center">
            <BoldText> { data.following.length } </BoldText>
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
                if(item.name === "Log out") {
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
