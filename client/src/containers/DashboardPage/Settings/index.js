import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} from "../../../redux/UserApi";
import BounceLoader from "react-spinners/BounceLoader";

import { FlexContainer } from "../../../components/base";
import { Text, BoldText } from "../../../components/Text";

import { Input } from "../../../components/Form";
import Button, { IconButton } from "../../../components/Button";
import { Marginer } from '../../../components/Marginer';

import { toast } from "react-toastify";

const Container = styled.div`
  ${tw`

`}
`;

const LoadingContainer = styled.div`
  ${tw`
w-full
h-screen
flex
justify-center
items-center
`}
`;

export const ProfileContainer = styled.img`
// width: ${props => props.active ? '80px' : '50px'};
// height: ${props => props.active ? '80px' : '50px'};
${tw`
w-32
h-32
rounded-full
overflow-hidden
object-cover
shadow-md
border-2 border-purple-800
transition-all
`}

`;

const FileInput = styled.input`
  ${tw`
hidden
`}
`;

export default function Settings() {
  const auth = useSelector((state) => state.auth);
  const { data: user, error, isLoading } = useGetUserQuery(auth.userId);

  const filePickerRef = useRef();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateUser] = useUpdateUserMutation();

  const firstName = useRef();
  const lastName = useRef();
  const gamingName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const dob = useRef();
  const currentPassword = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const updateProfileImage = async (_e) => {
    if (newProfileImage) {
      let formData = new FormData();
      formData.append("photo", filePickerRef.current.files[0]);
      formData.append("test", "test");

      toast.promise(updateUserProfile({ formData }).unwrap(), {
        pending: "Updating profile picture",
        success: {
          render: ({ data }) => "Profile changed successfully!",
        },
        error: {
          render: ({ data }) => {
            return "Couldn't update the profile picture!";
          },
        },
      });
    }
  };

  const onProfileImageChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      setNewProfileImage(readerEvent.target.result);
    };

    toast.info("New Profile Image Picked!");
  };

  const updateBasicProfileHandler = (e) => {
    toast.promise(updateUser({
      id: auth.userId,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      address: address.current.value
    }).unwrap(), {
      pending: "Updating profile...",
      success: "Profile updated!",
      error: "Error, Couldn't update profile!"
    });
  };

  const updateAdvancedProfileHandler = (e) => {
    if(password.current.value !== confirmPassword.current.value) {
      toast.error("Password & Confirm password don't match!");
      return;
    }

    toast.promise(updateUser({
      id: auth.userId,
      password: password.current.value
    }).unwrap(), {
      pending: "Updating password...",
      success: "Password updated!",
      error: "Error, Couldn't update password!"
    });    
  };
  

  return (
    <Container>
      <FlexContainer w="100%" justify="flex-start">
        <Text fontSize="1.5rem" fontWeight="700">
          Settings
        </Text>
      </FlexContainer>

      <FlexContainer w="100%" justify='center'>
      <ProfileContainer
        src={newProfileImage || user.profile_link}
        active={true}
      ></ProfileContainer>              
      </FlexContainer>

      <FlexContainer
        className='py-2'
        gap="1rem"
        justify="center"
        items="center"
      >
        <Button
          className="p-1 px-2 w-48"
          gap="0.4rem"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          Change Profile Picture
        </Button>
        {newProfileImage && (
          <Button
            className="p-1 px-2 w-48"
            onClick={updateProfileImage}
          >
            Save
          </Button>
        )}

        <FileInput
          type="file"
          onChange={onProfileImageChange}
          ref={filePickerRef}
          accept="image/png, image/gif, image/jpeg"
        />
      </FlexContainer>

      <BoldText> Basic Settings </BoldText>      
      <Input type="text" placeholder="First Name" ref={firstName} defaultValue={user.first_name}/>
      <Input type="text" placeholder="Last Name" ref={lastName} defaultValue={user.last_name}/>
      <Input type="text" placeholder="Gaming Name" ref={gamingName} value={user.gaming_name} readOnly/>
      <Input type="email" placeholder="Email" ref={email} value={user.email} readOnly/>
      <Input type="number" placeholder="Phone Number" ref={phoneNumber} value={user.phone_number}readOnly/>
      <Input type="address" placeholder="Address" ref={address} defaultValue={user.address}/>
      <Input type="date" placeholder="Date of Birth" ref={dob} value={user.dob.split('T')[0]} readOnly/>
      
      <Button onClick={updateBasicProfileHandler}> Update Profile </Button>

      <Marginer vertical='4rem'/>

      <BoldText> Advance Settings </BoldText>
      <Input type="password" placeholder="Current Password" ref={currentPassword} />      
      <Input type="password" placeholder="Password" ref={password} />
      <Input type="password" placeholder="Confirm Password" ref={confirmPassword}/>

      <Button onClick={updateAdvancedProfileHandler}> Update Password </Button>


      {isLoading && (
        <LoadingContainer>
          <BounceLoader color="red" />
        </LoadingContainer>
      )}

      <Marginer vertical='8rem'/>      
    </Container>
  );
}
