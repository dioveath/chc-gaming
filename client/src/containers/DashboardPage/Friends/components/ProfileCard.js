import styled from "styled-components";
import tw from "twin.macro";

import { Text } from "../../../../components/Text";
import { FlexContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

const ProfileImage = styled.img`
  ${tw`
w-32
h-32
rounded-full
object-cover
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
justify-center
pt-4
`}
`;

export default function ProfileCard() {
  return (
    <ProfileCardContainer direction="col">
      <ProfileContainer>
        <ProfileImage src="/assets/images/altair.jpg" />
      </ProfileContainer>
      <FlexContainer w="100%" pad="1rem" direction="col" gap="1rem">
        <FlexContainer direction="col">
n          <Text fontSize="1rem" fontWeight="600">
            @altair
          </Text>
          <Text fontSize="0.6rem" fontWeight="400">
            Immortal
          </Text>
        </FlexContainer>

        <FlexContainer w="100%" direction="col" gap="0.4rem">
          <Button w="100%"> Add Friend </Button>
          <Button type="outlined" w="100%">
             Remove
          </Button>
        </FlexContainer>
      </FlexContainer>
    </ProfileCardContainer>
  );
}
