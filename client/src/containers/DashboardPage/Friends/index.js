import styled from 'styled-components';
import tw from 'twin.macro';

import { Text } from '../../../components/Text';
import { FlexContainer, WrapContainer } from '../../../components/base';
import { Marginer } from '../../../components/Marginer';

import ProfileCard from './components/ProfileCard.js';

const Container = styled.div`
${tw`
w-full
`}
`;

const CardsContainer = styled(WrapContainer)`
${tw`
w-full
items-center
justify-center
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
      <Marginer vertical='1.2rem'/>
      <CardsContainer gap='1rem' >
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>
        <ProfileCard/>      
      </CardsContainer>
      
    </Container>
  );
}
