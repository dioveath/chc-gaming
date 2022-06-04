import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useRequestPhoneVerifyMutation,
  useVerifyPhoneVerifyMutation,
} from "../../../redux/UserApi";
import BounceLoader from "react-spinners/BounceLoader";

import { FlexContainer, WrapContainer } from "../../../components/base";
import { Text, BoldText } from "../../../components/Text";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useModal,
} from "../../../components/Modal";

import { Input, Select } from "../../../components/Form";
import Button from "../../../components/Button";
import { Marginer } from "../../../components/Marginer";

import { RiMailCloseFill, RiMailCheckFill } from "react-icons/ri";
import { MdOutlineMobileOff, MdOutlineMobileFriendly } from "react-icons/md";
import { BsYoutube, BsInstagram, BsFacebook } from "react-icons/bs";

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
  // width: ${(props) => (props.active ? "80px" : "50px")};
  // height: ${(props) => (props.active ? "80px" : "50px")};
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

const LinkText = styled.a`
  ${tw`
text-blue-500
`}
`;

const SocialMedias = [
  {
    social_media: "youtube",
    icon: <BsYoutube className="text-red-600 text-xl lg:text-3xl" />,
  },
  {
    social_media: "instagram",
    icon: <BsInstagram className="text-pink-600 text-xl lg:text-3xl" />,
  },
  {
    social_media: "facebook",
    icon: <BsFacebook className="text-blue-600 text-xl lg:text-3xl" />,
  },
];

const SocialMedia = ({ icon, url, handle }) => {
  return (
    <FlexContainer align="flex-end" gap="0.2rem">
      {icon}
      <LinkText key={url} target="_blank" href={url || "#"}>
        @{handle || "__________"}
      </LinkText>
    </FlexContainer>
  );
};

export default function Settings() {
  const auth = useSelector((state) => state.auth);
  const { data: user, error, isLoading } = useGetUserQuery(auth.userId);

  console.log(user);

  const filePickerRef = useRef();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateUser] = useUpdateUserMutation();
  const [requestPhoneVerify] = useRequestPhoneVerifyMutation();
  const [verifyPhoneVerify] = useVerifyPhoneVerifyMutation();
  const [isPhoneVerifyRequested, setPhoneVerifyRequested] = useState(false);

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
  const verificationCode = useRef();

  const socialMedia = useRef();
  const socialProfileUrl = useRef();
  const socialHandle = useRef();

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

  const profileCancelHandler = (_e) => {
    setNewProfileImage(null);
  };

  const updateBasicProfileHandler = (_e) => {
    toast.promise(
      updateUser({
        id: auth.userId,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        address: address.current.value,
      }).unwrap(),
      {
        pending: "Updating profile...",
        success: "Profile updated!",
        error: "Error, Couldn't update profile!",
      }
    );
  };

  const updateAdvancedProfileHandler = (e) => {
    if (password.current.value !== confirmPassword.current.value) {
      toast.error("Password & Confirm password don't match!");
      return;
    }

    toast.promise(
      updateUser({
        id: auth.userId,
        password: password.current.value,
      }).unwrap(),
      {
        pending: "Updating password...",
        success: "Password updated!",
        error: "Error, Couldn't update password!",
      }
    );
  };

  const requestVerifyHandler = (e) => {
    if (!isPhoneVerifyRequested) {
      toast.promise(requestPhoneVerify().unwrap(), {
        pending: "Requesting verification",
        success: {
          render: (_data) => {
            setPhoneVerifyRequested(true);
            return `Verification code sent to: ${user.phone_number}`;
          },
        },
        error: "Couldn't submit the request",
      });

      return;
    }
  };

  const verifyCodeHandler = (e) => {
    if (!verificationCode.current.value) {
      toast.error("Enter Verification code!");
      return;
    }

    toast.promise(verifyPhoneVerify(verificationCode.current.value), {
      pending: "Verifying phone",
      success: "Verification Successful.",
      error: "Verification failed!",
    });
  };

  const { isOpen, onClose, onOpen } = useModal();

  const addSocialProfileHandler = (e) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(socialProfileUrl.current.value)) {
      toast.error("Please enter valid url!");
      return;
    }

    let socialLink = {
      social_media: socialMedia.current.value,
      profile_url: socialProfileUrl.current.value,
      social_handle: socialHandle.current.value,
    };


    // check whether the social_media is already added
    const index = user?.social_links.findIndex((link) => {
      return link.social_media === socialLink.social_media;
    });

    let allLinks = [ ...(user?.social_links || []) ];

    if (index !== -1) {
      allLinks.splice(index, 1);
    } 

    allLinks = [...(allLinks), socialLink];

    toast.promise(
      updateUser({ id: user.id, social_links: allLinks }).unwrap(),
      {
        pending: "Adding Link...",
        success: "Add Success",
        error: "Add Error",
      }
    );
    onClose();
  };

  return (
    <Container>
      <FlexContainer w="100%" justify="flex-start">
        <Text fontSize="1.5rem" fontWeight="700">
          Settings
        </Text>
      </FlexContainer>

      <FlexContainer w="100%" justify="center">
        <ProfileContainer
          src={newProfileImage || user.profile_link}
          active={true}
        ></ProfileContainer>
      </FlexContainer>

      <FlexContainer
        className="py-2"
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
          {newProfileImage ? "Re-Select" : "Update Profile Picture"}
        </Button>
        {newProfileImage && (
          <>
            <Button className="p-1 px-2 w-48" onClick={updateProfileImage}>
              Save
            </Button>
            <Button
              className="p-1 px-2 w-48"
              type="outlined"
              onClick={profileCancelHandler}
            >
              Cancel
            </Button>
          </>
        )}

        <FileInput
          type="file"
          onChange={onProfileImageChange}
          ref={filePickerRef}
          accept="image/png, image/gif, image/jpeg"
        />
      </FlexContainer>

      <WrapContainer
        w="100%"
        justify="center"
        align="center"
        gap="1rem"
        className="bg-black py-4 my-4"
      >
        {SocialMedias.map((s) => {
          const socialLink = user?.social_links.find(
            (link) => link.social_media === s.social_media
          );
          return (
            <SocialMedia
              icon={s.icon}
              url={socialLink?.profile_url}
              handle={socialLink?.social_handle}
            />
          );
        })}
      </WrapContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <Text className="font-bold"> Add Social Links </Text>
        </ModalHeader>
        <ModalBody>
          <Select ref={socialMedia}>
            <option value="youtube"> Youtube </option>
            <option value="instagram"> Instagram </option>
            <option value="facebook"> Facebook </option>
          </Select>
          <Input
            type="text"
            placeholder="Profile URL"
            ref={socialProfileUrl}
          ></Input>
          <Input
            type="text"
            placeholder="Profile Handle | @charichagaming, gamingYT"
            ref={socialHandle}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button w="100%" onClick={addSocialProfileHandler}>
            Add Link
          </Button>
          <Button w="100%" type="outlined" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <FlexContainer justify="flex-end">
        <Button onClick={onOpen}> Add Social Link </Button>
      </FlexContainer>

      <FlexContainer
        direction="col"
        w="100%"
        justify="center"
        align="center"
        gap="0.5rem"
        className="my-4"
      >
        <FlexContainer
          w="100%"
          justify="flex-start"
          align="center"
          gap="0.2rem"
        >
          {user.email_verified && (
            <RiMailCheckFill className="text-lg text-green-600" />
          )}
          {!user.email_verified && (
            <RiMailCloseFill className="text-lg text-red-500" />
          )}
          <Text className="text-sm"> {user.email} </Text>
        </FlexContainer>

        <FlexContainer
          w="100%"
          justify="flex-start"
          align="center"
          gap="0.2rem"
        >
          {user.phone_verified && (
            <MdOutlineMobileFriendly className="text-lg text-green-500 " />
          )}
          {!user.phone_verified && (
            <MdOutlineMobileOff className="text-lg text-red-500" />
          )}

          <Text className="text-sm"> {user.phone_number} </Text>
        </FlexContainer>
      </FlexContainer>

      <BoldText> Basic Settings </BoldText>
      <Input
        type="text"
        placeholder="First Name"
        ref={firstName}
        defaultValue={user.first_name}
      />
      <Input
        type="text"
        placeholder="Last Name"
        ref={lastName}
        defaultValue={user.last_name}
      />
      <Input
        type="text"
        placeholder="Gaming Name"
        ref={gamingName}
        value={user.gaming_name}
        readOnly
      />
      <Input
        type="email"
        placeholder="Email"
        ref={email}
        value={user.email}
        readOnly
      />
      <Input
        type="number"
        placeholder="Phone Number"
        ref={phoneNumber}
        value={user.phone_number}
        readOnly
      />
      <Input
        type="address"
        placeholder="Address"
        ref={address}
        defaultValue={user.address}
      />
      <Input
        type="date"
        placeholder="Date of Birth"
        ref={dob}
        value={user.dob.split("T")[0]}
        readOnly
      />

      <Button onClick={updateBasicProfileHandler}> Update Profile </Button>

      <Marginer vertical="4rem" />

      <BoldText> Advance Settings </BoldText>
      <Input
        type="password"
        placeholder="Current Password"
        ref={currentPassword}
      />
      <Input type="password" placeholder="Password" ref={password} />
      <Input
        type="password"
        placeholder="Confirm Password"
        ref={confirmPassword}
      />

      <Button onClick={updateAdvancedProfileHandler}> Update Password </Button>

      {isLoading && (
        <LoadingContainer>
          <BounceLoader color="red" />
        </LoadingContainer>
      )}

      {!user.phone_verified && (
        <>
          <Marginer vertical="1rem" />
          <BoldText> Verification </BoldText>
          <Text className="text-xs mt-2 font-semibold">
            You haven't verified your phone yet!
          </Text>
          <Marginer vertical="0.5rem" />
          <Input
            type="number"
            placeholder="Verification Code"
            ref={verificationCode}
          ></Input>
          {!isPhoneVerifyRequested && (
            <Button onClick={requestVerifyHandler}> Verify Phone </Button>
          )}
          {isPhoneVerifyRequested && (
            <Button onClick={verifyCodeHandler}>
              {" "}
              Submit Verification Code{" "}
            </Button>
          )}

          <Marginer vertical="1rem" />
        </>
      )}

      <Marginer vertical="8rem" />
    </Container>
  );
}
