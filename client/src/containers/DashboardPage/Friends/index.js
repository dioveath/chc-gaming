import styled from 'styled-components';
import tw from 'twin.macro';

import { Text } from '../../../components/Text';
import { FlexContainer } from '../../../components/base';
import Button from '../../../components/Button';

import ProfileCard from './components/ProfileCard.js';

const Container = styled.div`
${tw`
w-full
`}
`;

const ProfileImage = styled.img`
${tw`
w-64
h-48
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

`}
`;

export default function FriendsPage(){
  return (
    <Container>
      <FlexContainer
        w='100%'
        justify='flex-start'>
        <Text fontSize='1.2rem'
              fontWeight='700'> Friend Requests </Text>
      </FlexContainer>
      <FlexContainer gap='1rem'>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>      
      </FlexContainer>
      
    </Container>
  );
}
