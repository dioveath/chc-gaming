
import styled from 'styled-components';
import tw from 'twin.macro';

import { useParams } from 'react-router-dom';

import {
  FlexContainer
} from '../../components/base';
import {
  Text 
} from '../../components/Text';

const Container = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
w-screen
h-screen
`}
`;

export default function TourneyDashboardPage(){
  const { tourneyId } = useParams();
  console.log(tourneyId);

  return (
    <Container>
      <FlexContainer direction='col'>
        <Text> Oveview </Text>
        <Text> Settings </Text>
        <Text> Structure </Text>
        <Text> Registrations </Text>
        <Text> Participants </Text>
        <Text> Placements </Text>
        <Text> Matches </Text>
        <Text> Final Standings </Text>
        <Text> Share </Text>
      </FlexContainer>
    </Container>
  );
}
