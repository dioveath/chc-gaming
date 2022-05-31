import { useEffect } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { Text } from "../../../../components/Text";
import { FlexContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

import { useUpdateUserMutation, useGetUserQuery } from "../../../../redux/UserApi";
import { toast } from "react-toastify";

const ProfileImage = styled.img`
  ${tw`
w-32
h-32
rounded-full
overflow-hidden
object-cover
shadow-xl
border-2 border-purple-800
transition-all
`}
`;

const ProfileCardContainer = styled(FlexContainer)`
  ${tw`
w-56
bg-black
rounded-md
shadow-md
overflow-hidden
`}
`;

const ProfileContainer = styled(FlexContainer)`
  ${tw`
w-full
object-cover
justify-center
pt-4
`}
`;

export default function ProfileCard({ user: propUser }) {
  const { data: currentUser } = useSelector((state) => state.user);
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUserQuery(propUser.id);
  const user = data?.user || propUser;

  const followed = !(currentUser.following.findIndex((e) => e === user.id) === -1);

  const followHandler = () => {
    let followingCopy = [...currentUser.following];
    const index = followingCopy.findIndex((e) => e === user.id);
    if (index === -1) followingCopy.push(user.id);
    else followingCopy.splice(index, 1);

    toast.promise(updateUser({ id: currentUser.id, following: followingCopy }), {
      loading:
        followingCopy.length > currentUser.following.length
          ? "Following.."
          : "Unfollowing..",
      success:
        followingCopy.length > currentUser.following.length
          ? "Followed"
          : "Unfollowed",
      error: `Couldn't follow ${user.gaming_name}!`,
    });
  };

  return (
    <ProfileCardContainer direction="col">
      <ProfileContainer>
        <ProfileImage src={user?.profile_link || "/assets/images/altair.jpg"} />
      </ProfileContainer>
      <FlexContainer w="100%" pad="1rem" direction="col" gap="1rem">
        <FlexContainer direction="col">
          <Text fontSize="1rem" fontWeight="600">
            @{user?.gaming_name || "altair"}
          </Text>
          <Text fontSize="0.6rem" fontWeight="400">
            Immortal
          </Text>
        </FlexContainer>

        <FlexContainer w="100%" direction="col" gap="0.4rem">
          <Button w="100%" onClick={followHandler}> 
            { followed ? "Unfollow" : "Follow"}
          </Button>
          <Button type="outlined" w="100%">
            Block
          </Button>
        </FlexContainer>
      </FlexContainer>
    </ProfileCardContainer>
  );
}
